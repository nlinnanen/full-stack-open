import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import {
  Diagnosis,
  EntryWithoutId,
  OccupationalHealthcareEntry,
} from '../types';

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */

interface OccupationalFormValues
  extends Omit<OccupationalHealthcareEntry, 'id' | 'sickLeave'> {
  sickLeaveStart: string;
  sickLeaveEnd: string;
}
interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
  diagnoses: Diagnosis[];
}

export const OccupationalHealthcareForm = ({
  onSubmit,
  onCancel,
  diagnoses,
}: Props) => {
  const isDate = (date: string): boolean =>
    /\d\d\d\d-([1-9]|1[0-2])-([1-9]|[12]\d|3[01])/.test(date);

  const handleSubmit = (values: OccupationalFormValues) => {
    const newEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
      description: values.description,
      date: values.date,
      specialist: values.specialist,
      type: 'OccupationalHealthcare',
      employerName: values.employerName,
      sickLeave:
        values.sickLeaveStart && values.sickLeaveEnd
          ? {
              startDate: values.sickLeaveStart,
              endDate: values.sickLeaveEnd,
            }
          : undefined,
    };

    onSubmit(newEntry);
  };

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        type: 'OccupationalHealthcare',
        employerName: '',
        sickLeaveStart: '',
        sickLeaveEnd: '',
      }}
      onSubmit={handleSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date || !isDate(values.date)) {
          errors.date = requiredError + ' and needs to be a correct date';
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.sickLeaveStart && !isDate(values.sickLeaveStart)) {
          errors.sickLeaveStart = 'Date must be of correct format';
        }
        if (values.sickLeaveEnd && !isDate(values.sickLeaveEnd)) {
          errors.sickLeaveEnd = 'Date must be of correct format';
        }
        if (!values.sickLeaveEnd !== !values.sickLeaveStart) {
          errors.sickLeaveStart =
            'Both values for sickleave are required if one is given';
          errors.sickLeaveEnd =
            'Both values for sickleave are required if one is given';
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sickleave start date"
              placeholder="YYYY-MM-DD"
              name="sickLeaveStart"
              component={TextField}
            />
            <Field
              label="Sickleave end date"
              placeholder="YYYY-MM-DD"
              name="sickLeaveEnd"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OccupationalHealthcareForm;
