import React, { Component } from "react";
import { deleteEmployee } from "../Services/empService";

function ActionButton({ emp, reloadEmp, handleSelectedEmp }) {
  const delEmp = async (id) => {
    await deleteEmployee(id);
    reloadEmp();
  };
  return (
    <>
      <button type="button" className="btn btn-danger" onClick={() => delEmp(emp.id)}>
        Delete
      </button>
      <button type="button" className="btn btn-warning ms-3" onClick={() => handleSelectedEmp(emp)}>
        Edit
      </button>
    </>
  );
}

export default ActionButton;
