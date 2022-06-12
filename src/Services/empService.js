import axios from "axios";
import { toast } from "react-toastify";

// export const fetEmployeeData = () => {
//   fetch("http://localhost:5005/api/emp")
//     .then((res) => res.json())
//     .then((json) => {
//       this.setState({
//         items: json,
//         DataisLoaded: true,
//       });
//     });
// }; OR

export async function getEmployees() {
  try {
    const resPromise = await fetch("http://localhost:5005/api/emp");
    const employees = await resPromise.json();
    return employees;
  } catch (e) {
    console.log("error in getEmployees function::", e);
    toast.error("Unable to fetch employees. Error occured.");
    return [];
  }
}

export async function addEmployee(fname, lname, gender) {
  let isAdded = false;
  const response = await axios.post("http://localhost:5005/api/emp", {
    fname,
    lname,
    gender,
  });
  console.log("response", response);
  const emp = response.data;
  if (emp && emp.id) {
    isAdded = true;
    toast.success("Employee added successfully");
  } else {
    isAdded = false;
    toast.error("Unable to add employee. Please try again.");
  }
  return isAdded;
}

export async function deleteEmployee(id) {
  let isDeleted = false;
  const response = await axios.delete("http://localhost:5005/api/emp/" + id);
  console.log("response", response);
  toast.success("Employee deleted successfully");
  return isDeleted;
}

export async function updateEmployee(id, fname, lname, gender) {
  let isUpdated = false;
  const response = await axios.put("http://localhost:5005/api/emp", {
    id,
    fname,
    lname,
    gender,
  });
  console.log("updateEmployee response::", response);
  const emp = response.data;
  if (emp && emp.id) {
    isUpdated = true;
    toast.success("Employee updated successfully");
  } else {
    isUpdated = false;
    toast.error("Unable to update employee. Please try again.");
  }
  return isUpdated;
}
