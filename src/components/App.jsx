import React, { Component } from 'react';
import AddAppointments from '../components/AddAppointments';
import SearchAppointments from '../components/SearchAppointments';
import ListAppointments from '../components/ListAppointments';
import '../css/App.css';
import { v4 as uuidv4 } from 'uuid';
import { without, findIndex } from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {
      myAppointments: [],
      //lastIndex: 0,
      formDisplay: false,
      editAppointment: false,
      orderBy: 'ownerName',
      orderDir: 'desc',
      queryText: '',
    };

    this.changeOrder = this.changeOrder.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  componentDidMount() {
    fetch('https://manux.ar/reactcalendar/data.json')
      .then((response) => response.json())
      .then((result) => {
        const apts = result.map((item) => {
          //item.aptId = this.state.lastIndex;
          //this.setState({ lastIndex: this.state.lastIndex + 1 });
          item.aptId = uuidv4();
          return item;
        });
        this.setState({
          myAppointments: apts,
        });
      });
  }

  addAppointment(apt) {
    let tempApts = this.state.myAppointments;
    //apt.aptId = this.state.lastIndex;
    apt.aptId = uuidv4();
    tempApts.unshift(apt);
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1,
      editAppointment: false,
    });
  }

  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir,
    });
  }

  delAppointment = (elem) => {
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, elem);
    this.setState({
      myAppointments: tempApts,
    });
  };

  toggleForm = () => {
    this.setState({ formDisplay: !this.state.formDisplay });
  };

  editToggle = () => {
    this.setState({ editAppointment: !this.state.editAppointment });
  };

  searchApts = (value) => {
    this.setState({ queryText: value });
  };

  updateInfo(name, value, id) {
    let tempApts = this.state.myAppointments;
    let aptIndex = findIndex(this.state.myAppointments, {
      aptId: id,
    });
    tempApts[aptIndex][name] = value;
    this.setState({
      myAppointments: tempApts,
    });
  }

  render() {
    let order;
    let filteredApts = this.state.myAppointments;
    if (this.state.orderDir === 'asc') {
      order = 1;
    } else {
      order = -1;
    }

    filteredApts = filteredApts
      .sort((a, b) => {
        if (
          a[this.state.orderBy].toLowerCase() <
          b[this.state.orderBy].toLowerCase()
        ) {
          return -1 * order;
        } else {
          return 1 * order;
        }
      })
      .filter((eachItem) => {
        return (
          eachItem['petName']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['ownerName']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['aptNotes']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase())
        );
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
                    searchApts={this.searchApts}
                    changeOrder={this.changeOrder}
                  />
                  <ListAppointments
                    appointments={filteredApts}
                    delAppointment={this.delAppointment.bind(this)}
                    editAppointment={this.state.editAppointment}
                    updateInfo={this.updateInfo}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
