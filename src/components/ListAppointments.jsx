import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa';
import Moment from 'react-moment';

class ListAppointments extends Component {
  render() {
    return (
      <div className="appointment-list item-list mb-3">
        {this.props.appointments.map((item) => (
          <div className="pet-item col media py-3" key={item.aptId}>
            {this.props.editAppointment && (
              <div className="mr-3">
                <button
                  className="pet-delete btn btn-sm btn-danger"
                  onClick={() => this.props.delAppointment(item)}
                >
                  <FaTimes />
                </button>
              </div>
            )}

            <div className="pet-info media-body">
              <div className="pet-head d-flex">
                <span className="label-item">Animal: </span>{' '}
                <span
                  className="pet-name"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    this.props.updateInfo(
                      'petName',
                      e.target.innerText,
                      item.aptId
                    )
                  }
                >
                  {' '}
                  {item.petName}
                </span>
                <span className="apt-date ml-auto">
                  <Moment date={item.aptDate} format="DD-MM YY" />
                </span>
              </div>

              <div className="owner-name">
                <span className="label-item">Propietario: </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    this.props.updateInfo(
                      'ownerName',
                      e.target.innerText,
                      item.aptId
                    )
                  }
                >
                  {' '}
                  {item.ownerName}
                </span>
              </div>
              <br />
              <div
                className="apt-notes"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  this.props.updateInfo(
                    'aptNotes',
                    e.target.innerText,
                    item.aptId
                  )
                }
              >
                Observaciones: {item.aptNotes}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ListAppointments;
