import React from "react";
import { Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { addEmployee, updateEmployee } from "../Services/empService";
import { useState } from "react";

const empRegSchema = Yup.object().shape({
  fname: Yup.string().min(2, "Too Short!").max(20, "Too Long!").required("Required").nullable(true),
  lname: Yup.string().min(2, "Too Short!").max(20, "Too Long!").required("Required").nullable(true),
  gender: Yup.string().required("Required").nullable(true),
});

function EmpForm({ handleUpdateList, emp, handleResetEmpForm }) {
  const [initialValues, setInitialValues] = useState({
    id: 0,
    dob: null,
    fname: "",
    gender: "",
    joining_date: null,
    lname: "",
    salary: null,
  });

  useEffect(() => {
    if (emp && emp.id) {
      setInitialValues({
        id: emp.id,
        dob: emp.dob,
        fname: emp.fname,
        gender: emp.gender,
        joining_date: emp.joining_date,
        lname: emp.lname,
        salary: emp.salary,
      });
    } else {
      setInitialValues({
        id: 0,
        dob: null,
        fname: "",
        gender: "",
        joining_date: null,
        lname: "",
        salary: null,
      });
    }
  }, [emp]);

  return (
    <>
      <h3>{initialValues && initialValues.id > 0 ? "Edit Employee" : "Add Employee"}</h3>
      <hr />
      <Formik
        initialValues={initialValues}
        validationSchema={empRegSchema}
        enableReinitialize
        onSubmit={(empData, { resetForm }) => {
          console.log("empData::", empData);
          const addUpdateEmp = async () => {
            if (initialValues && initialValues.id) {
              const isEmpUpdated = await updateEmployee(empData.id, empData.fname, empData.lname, empData.gender);
              if (isEmpUpdated == true) {
                handleUpdateList();
                handleResetEmpForm();
              }
            } else {
              const isEmpAdded = await addEmployee(empData.fname, empData.lname, empData.gender);
              if (isEmpAdded == true) {
                handleUpdateList();
                handleResetEmpForm();
              }
            }
          };
          addUpdateEmp();
        }}
      >
        {({ errors, touched, setFieldValue, resetForm }) => (
          <Form>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <Field name="fname" className="form-control" placeholder="First name" />
              <small className="text-danger fw-bold">{errors.fname && touched.fname ? "" + errors.fname : null}</small>
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <Field name="lname" className="form-control" placeholder="Last name" />
              <small className="text-danger fw-bold">{errors.lname && touched.lname ? "" + errors.lname : null}</small>
            </div>

            <div className="mb-3">
              <label>Gender</label>
              <div className="form-check">
                <Field type="radio" name="gender" className="form-check-input" value="male" />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Male
                </label>
              </div>
              <div className="form-check">
                <Field type="radio" name="gender" className="form-check-input" value="female" />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Female
                </label>
              </div>
              <small className="text-danger fw-bold">{errors.gender ? <div>{errors.gender}</div> : null}</small>
            </div>

            <Button variant={initialValues && initialValues.id > 0 ? "warning" : "primary"} type="submit" className="mt-3">
              {initialValues && initialValues.id > 0 ? "Update Employee" : "Add Employee"}
            </Button>
            <Button
              variant="secondary mt-3 ms-3"
              onClick={() => {
                handleResetEmpForm();
              }}
            >
              Reset
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default EmpForm;
