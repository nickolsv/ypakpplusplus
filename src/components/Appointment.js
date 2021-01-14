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

        var date = {
        year: 2020,
        month: 10,
        day: 1
        }

        return(
            <div>
                <div className="appointment-container" >
                    <Calendar type={"single-select"} dateSelector={this.dateSelector} />
                    { (this.state.selectedDate === null) ? null : <AppointmentTimePicker appointmentData={appointmentData} selectedTime={this.state.selectedTime} date={date} timeSelector={this.timeSelector} /> }
                </div>
            { (this.state.selectedTime === null) ? null : <div className="appointment-button">Αποστολή</div>}
            </div>
        )
    }
}

export default Appointment;