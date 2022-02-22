import { Diagnosis, Entry, EntryWithoutId } from '../types';
import HealthCheckForm from './HealthcheckForm';
import React from 'react';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';
import HospitalEntryForm from './HospitalEntryForm';

interface Props {
  formType: Entry['type'];
  handleNewEntry: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
}
const EntryForms = ({ formType, handleNewEntry, diagnoses }: Props) => {
  switch (formType) {
    case 'HealthCheck':
      return (
        <HealthCheckForm
          onCancel={() => console.log('cancel')}
          onSubmit={handleNewEntry}
          diagnoses={diagnoses}
        />
      );
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareForm
          onCancel={() => console.log('cancel')}
          onSubmit={handleNewEntry}
          diagnoses={diagnoses}
        />
      );
    case 'Hospital':
      return (
        <HospitalEntryForm
          onCancel={() => console.log('cancel')}
          onSubmit={handleNewEntry}
          diagnoses={diagnoses}
        />
      );

    default:
      return null;
  }
};

export default EntryForms;
