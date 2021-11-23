import React from 'react';

export function EmployeesByMonth(props) {
    const { users, handlerButtonClick, monthsNumber } = props;

    const handleButtonClickActive = (id, event) => {
        handlerButtonClick(
            {
                ...users,
                [id]: {
                    ...users[id],
                    isActive: event.target.id === 'active',
                },
            }
        )
    }
    
    const filteredUsers = Object.keys(users).filter(user => {
        if (users[user].isActive && new Date(users[user].dob).getMonth() === monthsNumber - 2) {
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
            return (<div id="filteredUsersBirthday">
                <div className={users[employeer].isActive && 'isActive'}>
                    {users[employeer].lastName} {users[employeer].firstName} -
                    {new Date(users[employeer].dob).toDateString()}
                </div>
            </div>)
        })
    } else {
        return <div>No employees</div>
    }

}








