import {
  NewPatient,
  Gender,
  HealthCheckEntry,
  HealthCheckRating,
  Entry,
  BaseEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  EntryWithoutId,
} from './types';

type Fields = {
  id: unknown;
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatient => {
  const patient: NewPatient = {
    name: parseStringElement(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseStringElement(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseStringElement(occupation, 'occupation'),
    entries: [],
  };

  return patient;
};

export interface EntryFields {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: Array<unknown>;
  type: unknown;
  healthCheckRating?: unknown;
  discharge?: { date: unknown; criteria: unknown };
  employerName?: unknown;
  sickLeave?: { startDate: unknown; endDate: unknown };
}

export const toNewEntry = (entry: EntryFields): EntryWithoutId => {
  const type = parseEntryType(entry.type);

  switch (type) {
    case 'HealthCheck':
      return parseHealthCheckEntry(entry);
    case 'Hospital':
      return parseHospitalEntry(entry);

    case 'OccupationalHealthcare':
      return parseOccupationalHealthcareEntry(entry);

    default:
      throw new Error(`Incorrect or missing ${type}: ${type}`);
  }
};

const parseEntryType = (type: unknown): Entry['type'] => {
  if (!type || !isType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

const parseHealthCheckEntry = (
  entry: EntryFields
): Omit<HealthCheckEntry, 'id'> => {
  return {
    description: parseStringElement(entry.description, 'description'),
    date: parseDate(entry.date),
    specialist: parseStringElement(entry.specialist, 'specialist'),
    diagnosisCodes: entry.diagnosisCodes
      ? parseDiagnosisCodes(entry.diagnosisCodes)
      : undefined,
    type: 'HealthCheck',
    healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
  };
};

const parseHospitalEntry = (entry: EntryFields): Omit<HospitalEntry, 'id'> => {
  return {
    description: parseStringElement(entry.description, 'description'),
    date: parseDate(entry.date),
    specialist: parseStringElement(entry.specialist, 'specialist'),
    diagnosisCodes: entry.diagnosisCodes
      ? parseDiagnosisCodes(entry.diagnosisCodes)
      : undefined,
    type: 'Hospital',
    discharge: {
      date: parseDate(entry.discharge?.date),
      criteria: parseStringElement(
        entry.discharge?.criteria,
        'diagnosis criteria'
      ),
    },
  };
};

const parseOccupationalHealthcareEntry = (
  entry: EntryFields
): Omit<OccupationalHealthcareEntry, 'id'> => {
  return {
    description: parseStringElement(entry.description, 'description'),
    date: parseDate(entry.date),
    specialist: parseStringElement(entry.specialist, 'specialist'),
    diagnosisCodes: entry.diagnosisCodes
      ? parseDiagnosisCodes(entry.diagnosisCodes)
      : undefined,
    type: 'OccupationalHealthcare',
    employerName: parseStringElement(entry.employerName, 'employer name'),
    sickLeave: {
      startDate: parseDate(entry.sickLeave?.startDate),
      endDate: parseDate(entry.sickLeave?.endDate),
    },
  };
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      'Incorrect or missing health check rating: ' + healthCheckRating
    );
  }
  return healthCheckRating;
};

const parseDiagnosisCodes = (
  codes: Array<unknown>
): BaseEntry['diagnosisCodes'] => {
  return codes.map((code): string =>
    parseStringElement(code, 'diagnosis code')
  );
};

const parseStringElement = (value: unknown, name: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${name}: ` + value);
  }
  return value;
};

const parseDate = (date: unknown) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const EntryTypeValues: Entry['type'][] = [
  'HealthCheck',
  'Hospital',
  'OccupationalHealthcare',
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (param: any): param is Entry['type'] => {
  return EntryTypeValues.includes(param);
};
