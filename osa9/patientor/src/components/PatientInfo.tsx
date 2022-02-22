import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

import { useStateValue } from '../state';
import { apiBaseUrl } from '../constants';
import AddEntryForm from './AddEntryForm';
import {
  Diagnosis,
  Entry,
  Gender,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from '../types';

const PatientInfo = () => {
  const [diagnoses, setDiagnoses] = React.useState<Diagnosis[]>([]);
  const { id } = useParams<{ id: string }>();
  const [
    {
      patients: { [id]: patient },
    },
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
      <AddEntryForm
        onSubmit={() => console.log('submit')}
        onCancel={() => console.log('cancel')}
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
