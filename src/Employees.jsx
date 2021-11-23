import React from 'react';

export function Employees(props) {
    const { users, char, handlerButtonClick } = props;

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
        if (users[user].firstName.charAt(0) === char) {
            return users[user];
        }
    })

    if (filteredUsers.length) {
        return filteredUsers.map(employeer => {
            return (<div id="filteredUsers">
                <div className={users[employeer].isActive && 'isActive'}>
                    {users[employeer].firstName} {users[employeer].lastName}
                </div>
                <form>
                    <label>
                        <input
                            onClick={(event) => {
                                handleButtonClickActive(users[employeer].id, event)
                            }}
                            type="radio"
                            id="active"
                            name="input"
                            checked={users[employeer].isActive}
                        />
                        active
                    </label>

                    <label>
                        <input
                            onClick={(event) => {
                                handleButtonClickActive(users[employeer].id, event)
                            }}
                            type="radio"
                            id="noactive"
                            name="input"
                            checked={!users[employeer].isActive}
                        />
                        not active
                    </label>
                </form>
            </div>)
        })
    } else {
        return <div>No employees</div>
    }

}






