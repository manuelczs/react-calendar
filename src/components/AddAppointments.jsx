import React, { Component } from 'react';
import { FaPlus, FaEdit } from 'react-icons/fa';

class AddAppointments extends Component {
  constructor() {
    super();
    this.state = {
      petName: '',
      ownerName: '',
      aptDate: '',
      aptTime: '',
      aptNotes: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    let tempApt = {
      petName: this.state.petName,
      ownerName: this.state.ownerName,
      aptDate: this.state.aptDate + ' ' + this.state.aptTime,
      aptNotes: this.state.aptNotes,
    };

    this.props.addAppointment(tempApt);
    this.setState({
      petName: '',
      ownerName: '',
      aptDate: '',
      aptTime: '',
      aptNotes: '',
    });
    this.props.toggleForm();
  }

  handleChange({ target }) {
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div
        className={
          'card textcenter mt-3 ' +
          (this.props.formDisplay ? '' : 'add-appointment')
        }
      >
        <div>
          <div
            className="apt-addheading card-header bg-dark text-white"
            onClick={this.props.toggleForm}
          >
            <FaPlus /> Agregar entrada
          </div>

          {this.props.appointments.length !== 0 && (
            <div
              className="apt-addheading card-header bg-dark text-white"
              onClick={this.props.editToggle}
            >
              <FaEdit /> Editar
            </div>
          )}
        </div>

        <div className="card-body">
          <form id="aptForm" noValidate onSubmit={this.handleAdd}>
            <div className="form-group form-row">
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  name="petName"
                  placeholder="Nombre del animal"
                  value={this.state.petName}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  name="ownerName"
                  placeholder="Propietario"
                  value={this.state.ownerName}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <div className="col-md-6">
                <input
                  type="date"
                  className="form-control"
                  name="aptDate"
                  id="aptDate"
                  value={this.state.aptDate}
                  onChange={this.handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="time"
                  className="form-control"
                  name="aptTime"
                  id="aptTime"
                  value={this.state.aptTime}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <div className="col-md-12">
                <textarea
                  className="form-control"
                  rows="4"
                  cols="50"
                  name="aptNotes"
                  id="aptNotes"
                  placeholder="Notas"
                  value={this.state.aptNotes}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row mb-0">
              <div className="offset-md-2 col-md-10">
                <button
                  type="submit"
                  className="btn btn-primary d-block ml-auto"
                >
                  Agregar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddAppointments;
