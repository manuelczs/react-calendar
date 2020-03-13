import React, { Component } from 'react';
import AddAppointments from '../components/AddAppointments';
import SearchAppointments from '../components/SearchAppointments';
import ListAppointments from '../components/ListAppointments';
import '../css/App.css';
import { without } from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {
      myAppointments: [],
      lastIndex: 0,
      formDisplay: false,
      editAppointment: false,
      orderBy: 'petName',
      orderDir: 'asc'
    };
  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 })
          return item;
        })
        this.setState({
          myAppointments: apts
        })
      })
  }

  addAppointment(apt) {
    let tempApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex +1,
      editAppointment: false
    })
  }

  delAppointment = (elem) => {
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, elem)
    this.setState({
      myAppointments: tempApts
    })
  }

  toggleForm = () => {
    this.setState({ formDisplay: !this.state.formDisplay })
  }

  editToggle = () => {
    this.setState({ editAppointment: !this.state.editAppointment })
  }

  render() {
    let order;
    let filteredApts = this.state.myAppointments;
    if(this.state.orderDir === 'asc') {
      order = 1;
    } else {
      order = -1;
    }

    filteredApts.sort((a,b) => {
      if(a[this.state.orderBy].toLowerCase() < 
         b[this.state.orderBy].toLowerCase()
      ) {
        return -1 * order;
      } else {
        return 1 * order;
      }
    });

    return (
    <div>
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm.bind(this)}
                  addAppointment={this.addAppointment.bind(this)}
                  editToggle={this.editToggle.bind(this)}
                  appointments={this.state.myAppointments}
                />
                <SearchAppointments
                  appointments={this.state.myAppointments}
                  orderBy={this.state.orderBy}
                  orderDir={this.state.orderDir}
                />
                <ListAppointments
                  appointments={filteredApts}
                  delAppointment={this.delAppointment.bind(this)}
                  editAppointment={this.state.editAppointment}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )}
}

export default App;
