import React, { Component } from 'react';
import { Employees } from './Employees';
import { EmployeesByMonth } from './EmployeesByMonth';

export default class App extends Component {
  alphavit = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  state = {
    error: null,
    isLoaded: false,
    users: {},
  };

  parseResult(result) {
    return result.reduce((acc, item) => {
      return {
        ...acc,
        [item.id]: { ...item },
      }
    }, {});
  }

  componentDidMount() {
    const savedUsers = localStorage.getItem('users');

    if (savedUsers) {
      const savedParsedUsers = JSON.parse(savedUsers);
      this.setState({
        isLoaded: true,
        users: savedParsedUsers,
      });
    } else {
      fetch("https://yalantis-react-school-api.yalantis.com/api/task0/users")
        .then(res => res.json())
        .then(
          (result) => {
            const parsed = this.parseResult(result);
            this.setState({
              isLoaded: true,
              users: parsed,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  }

  handleButtonClick = (users) => {
    const newUsersState = {
      ...this.state.users,
      ...users,
    }
    this.setState(
      {
        users: newUsersState,
      }
    )
    localStorage.setItem('users', JSON.stringify(newUsersState))
  }

  handleButtonActiveAllClick = (event) => {
    const users = Object.keys(this.state.users).reduce((acc, item) => {
      return {
        ...acc,
        [item]: {
          ...this.state.users[item],
          isActive: true,
        }
      }
    }, {})
    this.setState({users})
  }


  handleButtonNoActiveAllClick = (event) => {
    const users = Object.keys(this.state.users).reduce((acc, item) => {
      return {
        ...acc,
        [item]: {
          ...this.state.users[item],
          isActive: false,
        }
      }
    }, {})
    this.setState({ users })
  }


  render() {
    const { error, isLoaded, users } = this.state;
    const currentMonth = new Date().getMonth();
    const sortedMonths = [...this.months.slice(currentMonth), ...this.months.slice(0, currentMonth)];

    if (error) {
      return <div>Ошибка: {error.message}</div>
    }
    else if (!isLoaded) {
      return <div>Загрузка...</div>
    }
    else {
      return (
        <>
          <div id="headers">
            <h1 id="headerEmployees">Employees</h1>
            <h1 id="headerEmployeesBirthday">Employees birthday</h1>
            <div id="buttons">
              <button onClick={this.handleButtonActiveAllClick} className="button" id="active">Active</button>
              <button onClick={this.handleButtonNoActiveAllClick} className="button" id="noactive">No active</button>
            </div>
          </div>
          <div id="wrapper">
            <div id="employeers">
              {/* <span><h1>Employees</h1></span> */}
              {this.alphavit.map(char => {
                return (
                  <div key={char} id="charEmployeers">
                    <div id="header">{char}</div>
                    <div id="listEmployeers">
                      <Employees
                        char={char}
                        handlerButtonClick={this.handleButtonClick}
                        users={users} />
                    </div>
                  </div>
                )
              })}
            </div>
            <div id="employeersBirthday"><h2>Months</h2>
              {sortedMonths.map((month, index) => {
                return (
                  <div key={month} id="monthEmployeers">
                    <div id="headerMonths">{month}
                      <div id="listEmployeersBirthday">
                        <EmployeesByMonth
                          beforeCurrentMonth={index - (sortedMonths.length - currentMonth)}
                          afterCurrentMonth={currentMonth + index}
                          month={month}
                          monthsNumber={index}
                          users={users} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      );
    }
  }
}

 // buttonClickActive = (users) => {
  //   const usersactive = {
  //     ...this.state.users,
  //     ...users,
  //   }
  //   this.setState({
  //     users: usersactive,
  //   })
  // }