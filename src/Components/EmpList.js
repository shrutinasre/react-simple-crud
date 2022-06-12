import React, { Component } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import TableTr from "./TableTr";
import { toast } from "react-toastify";

function EmpList({ updateList, handleSelectedEmp }) {
  const [isUpdateRequire, setIsUpdateRequire] = useState(updateList);
  useEffect(() => {
    setIsUpdateRequire(updateList);
  }, [updateList]);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <TableTr updateList={updateList} handleSelectedEmp={handleSelectedEmp} />
        </tbody>
      </Table>
    </>
  );
}

export default EmpList;
