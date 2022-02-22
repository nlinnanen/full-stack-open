import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { Diagnosis, EntryWithoutId, HospitalEntry } from '../types';

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */

interface HospitalFormValues extends Omit<HospitalEntry, 'id' | 'discharge'> {
  dischargeDate: string;
  dischargeCriteria: string;
}
interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
  diagnoses: Diagnosis[];
}

export const HospitalEntryForm = ({ onSubmit, onCancel, diagnoses }: Props) => {
  const isDate = (date: string): boolean =>
    /\d\d\d\d-([1-9]|1[0-2])-([1-9]|[12]\d|3[01])/.test(date);

  const handleSubmit = (values: HospitalFormValues) => {
    const newEntry: Omit<HospitalEntry, 'id'> = {
      description: values.description,
      date: values.date,
      specialist: values.specialist,
      type: 'Hospital',
      discharge: {
        criteria: values.dischargeCriteria,
        date: values.dischargeDate,
      },
    };

    onSubmit(newEntry);
  };

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        type: 'Hospital',
        dischargeCriteria: '',
        dischargeDate: '',
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
        if (!values.dischargeCriteria) {
          errors.dischargeCriteria = requiredError;
        }
        if (!values.dischargeDate || !isDate(values.dischargeDate)) {
          errors.dischargeDate =
            requiredError + ' and date must be of correct format';
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
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="dischargeCriteria"
              component={TextField}
            />
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
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

export default HospitalEntryForm;
