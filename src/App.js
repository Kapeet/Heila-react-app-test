import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import EmployeeList from './components/EmployeeList';
import Dialog from './components/Dialog';
function App() {

  const [employees, setEmployees] = useState('');
  const [roles, setRoles] = useState();
  const [dialog, setDialog] = useState(false);
  const [selectedEmployeeAndRole, setSelectedEmployeeAndRole] = useState(null);
  useEffect(() => { 
    async function getEmployees(){
      let res = fetch('https://127.0.0.1/GetEmployeeList');
      let employeeList;
      try
      {
       employeeList = await res.json();
      }
      catch
      {
        employeeList = [
          {Id: 1, name: 'test'},
          {Id: 2, name: 'test2'},
          {Id: 3, name: 'test3'},
          {Id: 4, name: 'test4'},
          {Id: 5, name: 'test5'},

        ];
      }
      setEmployees(employeeList);

    }

    getEmployees();
  },[]);

  const handleConfirmationDialog = (employee, role) => {
    setDialog(true);
    setSelectedEmployeeAndRole({...employee, ...role})
  }

  return (
    <div className="App">
      <header className="App-header">
        {dialog && <Dialog setDialog={setDialog} selectedEmployee={selectedEmployeeAndRole}/>}
        <EmployeeList employees={employees} handleConfirmationDialog={handleConfirmationDialog}/>
      </header>
    </div>
  );
}

export default App;
