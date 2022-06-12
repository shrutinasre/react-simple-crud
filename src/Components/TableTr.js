import React, { Component, useEffect, useState } from "react";
import { getEmployees } from "../Services/empService";
import ActionButton from "./ActionButton";
import { toast } from "react-toastify";

function TableTr({ updateList, handleSelectedEmp }) {
  const [employeeArray, setEmployeeArray] = useState([]);

  useEffect(() => {
    loadEmps();
  }, [updateList]);

  console.log("updateList::", updateList);

  const loadEmps = async () => {
    setEmployeeArray(await getEmployees());
  };

  return (
    <>
      {employeeArray.map((emp, idx) => (
        <tr key={idx}>
          <td className="text-center">{idx + 1}</td>
          <td>{emp.fname}</td>
          <td>{emp.lname}</td>
          <td>{emp.gender}</td>
          <td className="text-center">
            <ActionButton emp={emp} reloadEmp={loadEmps} handleSelectedEmp={handleSelectedEmp} />
          </td>
        </tr>
      ))}
    </>
  );
}

export default TableTr;
