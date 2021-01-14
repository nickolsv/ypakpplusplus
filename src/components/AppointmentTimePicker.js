import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AppointmentTimePicker.css'

class Time {
    constructor(hour, minute) {
        this.hour = hour;
        this.minute = minute;
    }

    addTime(hours, minutes) {
        // Adds hours and minutes to current time

        var finalMinute = minutes + this.minute
        var finalHour = hours + this.hour + Math.floor(finalMinute/60);

        finalMinute = finalMinute % 60;
        finalHour = finalHour % 24

        this.minute = finalMinute;
        this.hour = finalHour;
    }

    minsBetween(anotherTime) {
        // Return minutes between this time and anotherTime
        // positive if anotherTime is after this one, otherwise negative

        return anotherTime.hour*60 + anotherTime.minute - this.hour*60 - this.minute;
    }
    
}

function AppointmentTimeSlot(props) {

    var elementClass = "timeslot-unavailable";

    if( props.isAvailable )
        elementClass = "timeslot-available";

    if( props.isSelected )
        elementClass = "timeslot-selected";

    var time = new Time(props.appointmentStartHour, props.appointmentStartMinute);

    // If timeslot is available, call the selector function onclick so that the picker can update its state
    // (hour and minute are 0 padded )
    return(
        <li onClick={() => props.isAvailable ? props.timeSelector(time) : null } className={elementClass} >
            {("00" + props.appointmentStartHour).slice(-2)}
            :
            {("00" + props.appointmentStartMinute).slice(-2)}
        </li>
    );
}

AppointmentTimeSlot.propTypes = {
    isAvailable: PropTypes.bool,
    isSelected: PropTypes.bool,
    appointmentStartHour: PropTypes.number,
    appointmentStartMinute: PropTypes.number,
    timeSlotArray: PropTypes.func,
};


class AppointmentTimePicker extends Component {

        state = {
            unavailableTimeArray : [],
            selectedTime: null,
        }

        componentDidMount()
        {
            // Request unavailable timeslots for current date
            // and save them in state
            var requesturl = "http://localhost:3001/api/appointment/" + this.props.date.year + "-" + this.props.date.month + "-" + this.props.date.day;

            fetch(requesturl)
                .then( res => res.json())
                .then(
                    (result) => {
                        var newState = Object.assign({},this.state);
                        
                        result.forEach(element => {
                            var time = new Time(element.hour, element.minute);
                            newState.unavailableTimeArray.push(time);
                            this.setState(newState)
                        });
                    }
                )
        }

        // Function to be passed as prop to AppointmentTimeSlot, so that it can update AppointmentTimePicker's state
        // with the selected time slot
        timeSelector = (selectedTime) => {
            var newState = Object.assign({},this.state);

            newState.selectedTime = selectedTime;

            this.setState(newState);
        }

        render()
        {
            var timeSlotArray = [];
            var aptmentData = this.props.appointmentData;
            var currTime = new Time(aptmentData.startHour, aptmentData.startMin);
            var endTime = new Time(aptmentData.endHour, aptmentData.endMin);
            var interval = new Time(aptmentData.intervalHour, aptmentData.intervalMin);
            var key=0;

            // Generate the timeslots between starting time and ending time
            // The interval between the timeslots is also passed in the appointmentData prop
            while( currTime.minsBetween(endTime) >= 0 )
            {
                var isAvailable = true;
                var isSelected = false;
                
                // Also if current timeslot is unavailable, mark it as such
                if( this.state.unavailableTimeArray !== [] )
                    this.state.unavailableTimeArray.forEach(element => {
                        if( currTime.minsBetween(element) === 0)
                            isAvailable = false;
                        
                    });

                // If the current timeslot is selected, mark it as selected
                if(this.state.selectedTime !== null && currTime.minsBetween(this.state.selectedTime) === 0)
                    isSelected = true;

                // Push to the array of elements and move on to the next timeslot
                timeSlotArray.push(<AppointmentTimeSlot key={key} appointmentStartHour={currTime.hour} appointmentStartMinute={currTime.minute} isAvailable={isAvailable} isSelected={isSelected} timeSelector={this.timeSelector} />);
                currTime.addTime(interval.hour, interval.minute);
                key+=1;
            }
        

            return(
                <div>
                    {timeSlotArray}
                </div>
            );
        
            
        }
}

AppointmentTimePicker.propTypes = {
    date: PropTypes.shape({
        year: PropTypes.number,
        month: PropTypes.number,
        day: PropTypes.number,
    }),
    appointmentData : PropTypes.shape({
        startHour: PropTypes.number,
        startMin: PropTypes.number,
        endHour: PropTypes.number,
        endMin: PropTypes.number,
        intervalHour: PropTypes.number,
        intervalMin: PropTypes.number,
    }),
}

export default AppointmentTimePicker;