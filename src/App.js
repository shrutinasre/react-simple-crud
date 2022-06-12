import React, { useEffect, useState } from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import EmpForm from "./Components/EmpForm";
import EmpList from "./Components/EmpList";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [updateList, setUpdateList] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const handleUpdateList = () => {
    setUpdateList(!updateList);
  };

  const handleSelectedEmp = (emp) => {
    setSelectedEmp(emp);
  };

  const handleResetEmpForm = () => {
    setSelectedEmp(null);
  };

  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col md={3}>
            <EmpForm handleUpdateList={handleUpdateList} emp={selectedEmp} handleResetEmpForm={handleResetEmpForm} />
          </Col>
          <Col md={9}>
            <h3>Emplyee List</h3>
            <hr />
            <EmpList updateList={updateList} handleSelectedEmp={handleSelectedEmp} />
          </Col>
        </Row>
      </Container>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
