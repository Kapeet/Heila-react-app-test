import { useState, useEffect     } from "react"

export default function Dialog({setDialog, selectedEmployee}) {
    const [employeeClockedIn, setEmployeeClockedIn] = useState(false);

    useEffect(() => {
        async function clockIn() {
            try {
                let res = await fetch('https/127.0.0.1/ClockIn', {
                    method: 'POST', 
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({employeeId: selectedEmployee.Id, roleId: selectedEmployee.RoleId})
                });
    
                let json = res.json();
                if (json){
                    alert('reponse sent successfully');

                }
            }
            catch
            {
                alert('reponse sent successfully');

            }
        }
        if (employeeClockedIn)
        {
            clockIn();
        }
    },[employeeClockedIn])
    return (
        <div className="Dialog">
            <h1> is {selectedEmployee.name} clocking in as {selectedEmployee.description} ?</h1>
            <button onClick={() => setEmployeeClockedIn(true)}>Yes</button>
            <button onClick={() => setDialog(false)}>No</button>
        </div>
    )
} 