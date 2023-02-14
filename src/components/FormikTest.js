import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormikTest = () => {
  let initialValues = { firstName: '', lastName: '', email: '' };
  console.log("hi");
  let validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
  });
  return (
    <div className="formik-test-main">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <div className="mt-5">
          <Form>
            <div className="FormControl">
              <label htmlFor="firstName">First Name</label>
              <Field name="firstName" type="text" />
              <div>
                <ErrorMessage name="firstName" />{' '}
              </div>
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" type="text" />
              <div>
                <ErrorMessage name="lastName" />
              </div>
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <Field name="email" type="email" />
              <div>
                <ErrorMessage name="email" />
              </div>
            </div>

            <button type="submit">Submit</button>
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default FormikTest;
