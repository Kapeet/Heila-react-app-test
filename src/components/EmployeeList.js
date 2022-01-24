import { useEffect, useState } from "react"

export default function EmployeeList({employees, handleConfirmationDialog}) {
    const [isShowingRoles, setIsShowingRoles] = useState(false);
    const [roles, setRoles] = useState([]);
    const [selectedId, setSelectedId] = useState(0);
    useEffect(() => {
        async function getEmployeeRoles(){
            let roles;
            try
            {
                let res = await fetch('https://127.0.0.1/GetEmployeeRoles?employeeId='+selectedId);
                roles = await res.json()
            }
            catch {
                roles = [
                    {roleId: 1, description: 'Manager'},
                    {roleId: 2, description: 'Waiter'}
                ];
            }
            setRoles(roles);
        }
        getEmployeeRoles();
    }, [isShowingRoles])

    return (
        <ul className="employeeList">
            {employees && employees.map(employee => {
                return (
                    <li key={employee.Id} className="employee"
                        onMouseEnter={() => {setIsShowingRoles(true); setSelectedId(employee.Id)}}
                        
                        >
                        <p>{employee.Id}</p>
                        <h1>{employee.name}</h1>
                        {isShowingRoles && selectedId === employee.Id && 
                        <ul className="Roles" style={{position: 'absolute'}}>
                            {roles.map(role => 
                                <li key={role.roleId} className="Role" onMouseLeave={() => setIsShowingRoles(false)} 
                                onClick={() => handleConfirmationDialog(employee, role)}>
                                    <p>{role.description}</p>
                                    <p>-----------</p>
                                </li>
                            )}
                        </ul>}
                    </li>
                )
            })}
        </ul>
    )
}