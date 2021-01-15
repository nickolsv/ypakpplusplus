import React, { Component } from 'react';

import AppointmentTimePicker from "./AppointmentTimePicker.js";
import Calendar from "./Calendar.js";
import './Appointment.css';

class Appointment extends Component {
    
    state = {
        selectedDate : null,
        selectedTime : null,
    }

    timeSelector = (selectedTime) => {
        var newState = Object.assign({},this.state);

        newState.selectedTime = selectedTime;

        this.setState(newState);
    }

    dateSelector = (selectedDate) => {
        var newState = Object.assign({},this.state);

        newState.selectedDate = selectedDate;
        newState.selectedTime = null;
        this.setState(newState);
    }

    render(){
        var appointmentData = {
            startHour: 8,
            startMin: 0,
            endHour: 16,
            endMin: 30,
            intervalHour: 0,
            intervalMin: 30,
        }

        return(
            <div>
                <div className="appointment-container" >
                    <Calendar type={"single-select"} dateSelector={this.dateSelector} />
                    { (this.state.selectedDate === null) ? null : <AppointmentTimePicker appointmentData={appointmentData} selectedTime={this.state.selectedTime} date={this.state.selectedDate} timeSelector={this.timeSelector} /> }
                </div>
            { (this.state.selectedTime === null) ? null : <div className="appointment-button">Αποστολή</div>}
            </div>
        )
    }
}

export default Appointment;