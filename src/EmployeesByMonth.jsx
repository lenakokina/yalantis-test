import React from 'react';

export function EmployeesByMonth(props) {
    const { users, beforeCurrentMonth, afterCurrentMonth } = props;
    const filteredUsers = Object.keys(users).filter(user => {
        const userDob = new Date(users[user].dob).getMonth();

        if (users[user].isActive
            && (userDob === beforeCurrentMonth || userDob === afterCurrentMonth)) {
            return users[user];
        }
    })

    if (filteredUsers.length) {
        filteredUsers.sort((employeerA, employeerB) => {
            if (users[employeerA].lastName > users[employeerB].lastName) {
                return 1;
            }

            if (users[employeerA].lastName < users[employeerB].lastName) {
                return -1;
            }

            if (users[employeerA].lastName === users[employeerB].lastName) {
                return 0;
            }
        })

        return filteredUsers.map(employeer => {
            return (
                <div key={employeer} id="filteredUsersBirthday">
                    <div className={users[employeer].isActive && 'isActive'}>
                        {users[employeer].lastName} {users[employeer].firstName} -
                        {new Date(users[employeer].dob).toDateString()}
                    </div>
                </div>
            )
        })
    } else {
        return <div>No employees</div>
    }
}
