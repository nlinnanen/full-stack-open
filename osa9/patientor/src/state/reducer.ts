import { State } from './state';
import { Entry, Patient } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'ADD_ENTRY';
      payload: {
        entry: Entry;
        patient: Patient;
      };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };

    case 'ADD_ENTRY':
      const patient = action.payload.patient;
      return {
        ...state,
        patients: {
          ...state.patients,
          [patient.id]: {
            ...patient,
            entries: [...patient.entries, action.payload.entry],
          },
        },
      };
    default:
      return state;
  }
};

export const addPatient = (newPatient: Patient): Action => {
  return { type: 'ADD_PATIENT', payload: newPatient };
};

export const addEntry = (entry: Entry, patient: Patient): Action => {
  return { type: 'ADD_ENTRY', payload: { entry, patient } };
};

export const setPatientList = (patients: Patient[]): Action => {
  return { type: 'SET_PATIENT_LIST', payload: patients };
};
