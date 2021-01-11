import React, { Component } from 'react';
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

    return(
        <li onClick={() => props.isAvailable ? props.timeSelector(time) : null } className={elementClass} >
            {("00" + props.appointmentStartHour).slice(-2)}
            :
            {("00" + props.appointmentStartMinute).slice(-2)}
        </li>
    );
}


class AppointmentTimePicker extends Component {

        state = {
            unavailableTimeArray : [],
            selectedTime: null,
        }

        // TODO: Request available times for each date from server in componentDidMount 
        // and save in state

        componentDidMount()
        {

            var newState = Object.assign({},this.state);

            var time = new Time(9,30)
            newState.unavailableTimeArray.push(time);
            time = new Time(11,0)
            newState.unavailableTimeArray.push(time);

            this.setState(newState)

        }

        timeSelector = (selectedTime) => {
            var newState = Object.assign({},this.state);

            newState.selectedTime = selectedTime;

            this.setState(newState);
        }

        render()
        {
            var timeSlotArray = [];
            var currTime = new Time(this.props.appointmentData.startHour, this.props.appointmentData.startMin);
            var endTime = new Time(this.props.appointmentData.endHour, this.props.appointmentData.endMin);
            var interval = new Time(this.props.appointmentData.intervalHour ,this.props.appointmentData.intervalMin);

            while( currTime.minsBetween(endTime) >= 0 )
            {
                var isAvailable = true;
                var isSelected = false;
                
                if( this.state.unavailableTimeArray !== [] )
                {
                    this.state.unavailableTimeArray.forEach(element => {
                        if( currTime.minsBetween(element) === 0)
                        {
                            isAvailable = false;
                        }
                    });
                }

                if(this.state.selectedTime !== null && currTime.minsBetween(this.state.selectedTime) == 0)
                    isSelected = true;

                timeSlotArray.push(<AppointmentTimeSlot appointmentStartHour={currTime.hour} appointmentStartMinute={currTime.minute} isAvailable={isAvailable} isSelected={isSelected} timeSelector={this.timeSelector} />);
                currTime.addTime(interval.hour, interval.minute);
            }
        

            return(
                <div>
                    {timeSlotArray}
                </div>
            );
        
            
        }
}

export default AppointmentTimePicker;