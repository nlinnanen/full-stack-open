import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon, Button } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

import { addEntry, useStateValue } from '../state';
import { apiBaseUrl } from '../constants';
import {
  Diagnosis,
  Entry,
  Gender,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  EntryWithoutId,
} from '../types';
import EntryForms from './EntryForms';

const PatientInfo = () => {
  const [formSelection, setFormSelection] =
    React.useState<Entry['type']>('HealthCheck');
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const { id } = useParams<{ id: string }>();
  const [
    {
      patients: { [id]: patient },
    },
    dispatch,
  ] = useStateValue();
  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        setDiagnoses(diagnosesFromApi);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  }, []);

  const handleNewEntry = async (values: EntryWithoutId) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, patient));
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const genderIconName = new Map<Gender, SemanticICONS>();
  genderIconName.set(Gender.Female, 'venus');
  genderIconName.set(Gender.Male, 'mars');
  genderIconName.set(Gender.Other, 'venus mars');

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>
        {patient.name} <Icon name={genderIconName.get(patient.gender)} />
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3 style={{ marginTop: '1rem' }}>entries</h3>
      {patient.entries.map((e) => (
        <EntryComponent key={e.date} entry={e} diagnoses={diagnoses} />
      ))}
      <Button onClick={() => setFormSelection('Hospital')}>Hospital</Button>
      <Button onClick={() => setFormSelection('OccupationalHealthcare')}>
        OccupationalHealthcare
      </Button>
      <Button onClick={() => setFormSelection('HealthCheck')}>
        HealthCheck
      </Button>

      <EntryForms
        formType={formSelection}
        handleNewEntry={handleNewEntry}
        diagnoses={diagnoses}
      />
    </div>
  );
};

interface EntryPropType {
  entry: Entry;
  diagnoses: Diagnosis[];
}
const EntryComponent = ({ entry, diagnoses }: EntryPropType) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntryComponent entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalEntryComponent entry={entry} diagnoses={diagnoses} />;
    case 'Hospital':
      return <HospitalEntryComponent entry={entry} diagnoses={diagnoses} />;

    default:
      return assertNever(entry);
  }
};

interface HospitalEntryPropType {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}
const HospitalEntryComponent = ({
  entry,
  diagnoses,
}: HospitalEntryPropType) => {
  return (
    <div>
      <p>{entry.date + ' ' + entry.description}</p>
      <p>
        {'Discharge' + entry.discharge.date + ' ' + entry.discharge.criteria}
      </p>
      <ul>
        {entry.diagnosisCodes?.map((d) => (
          <li key={d}>{`${d} ${
            diagnoses.find((diagnosis) => diagnosis.code === d)?.name ||
            'unknown'
          }`}</li>
        ))}
      </ul>
    </div>
  );
};

interface OccupationalEntryPropType {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}
const OccupationalEntryComponent = ({
  entry,
  diagnoses,
}: OccupationalEntryPropType) => {
  return (
    <div>
      <p>{entry.date + ' ' + entry.description}</p>
      <p>
        {entry.sickLeave
          ? `Sick leave: ${entry.sickLeave?.startDate} - ${entry.sickLeave?.endDate}`
          : ''}
      </p>
      <p>{entry.employerName}</p>
      <ul>
        {entry.diagnosisCodes?.map((d) => (
          <li key={d}>{`${d} ${
            diagnoses.find((diagnosis) => diagnosis.code === d)?.name ||
            'unknown'
          }`}</li>
        ))}
      </ul>
    </div>
  );
};

interface HealthCheckEntryPropType {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}
const HealthCheckEntryComponent = ({
  entry,
  diagnoses,
}: HealthCheckEntryPropType) => {
  return (
    <div>
      <p>{entry.date + ' ' + entry.description}</p>
      <p>{`Rating: ${entry.healthCheckRating}`}</p>
      <ul>
        {entry.diagnosisCodes?.map((d) => (
          <li key={d}>{`${d} ${
            diagnoses.find((diagnosis) => diagnosis.code === d)?.name ||
            'unknown'
          }`}</li>
        ))}
      </ul>
    </div>
  );
};

export default PatientInfo;
