import React, { Component } from 'react';
import { Date, getDaysSinceEpoch, getDaysOfMonth} from '../imports/DateTime.js';
import {serverAddress} from '../imports/global';
import './Calendar.css';

const weekdaysList = {
    1: "Δευτέρα",
    2: "Τρίτη",
    3: "Τετάρτη",
    4: "Πέμπτη",
    5: "Παρασκευή",
    6: "Σάββατο",
    7: "Κυριακή"
}

const monthsList = {
    1: "Ιανουάριος",
    2: "Φεβρουάριος",
    3: "Μάρτιος",
    4: "Απρίλιος",
    5: "Μάιος",
    6: "Ιούνιος",
    7: "Ιούλιος",
    8: "Αύγουστος",
    9: "Σεπτέμβριος",
    10: "Οκτώβριος",
    11: "Νοέμβριος",
    12: "Δεκέμβριος"
}


function CalendarDay(props) {
    var returnVal = (<td className={`calendar-day ${props.class}`} onClick={() => props.onDateSelect(props.dayNumber) }>
                        {props.dayNumber}
                    </td>);
    if( props.dayNumber === undefined)
        returnVal = (<td className={`calendar-day calendar-day-empty`}> </td>);
    return(
        <>
            {returnVal}
        </>
    )
}


class CalendarMonth extends Component{

    // Function passed to each CalendarDay component so that both its props (daynumber) and 
    // CalendarMonth's props (month/year) can be used as arguments in Calendar's dateSelector
    // (passed to CalendarMonth as onDateSelect prop)
    dateSelector = (selectedDay) => {
        var selectedDate = new Date(selectedDay, this.props.month, this.props.year);
        this.props.onDateSelect(selectedDate)
    }

    render() {
        // Create a Calendar table for month specified in props

        // Get current Year and Month
        var year = Number(this.props.year);
        var month = Number(this.props.month);
        var rowCount = 1;
    
        // Get number of days in month as well as
        // what day is the first day of the current month
        var days = getDaysOfMonth(month,year);
        var dayOfWeek = ( getDaysSinceEpoch(month,year) + 3) % 7;
        
        var currDay = 0;
        var currElem = [];
        var resultHead = [];
        var result = [];
    
        // Table Head Element
        for( var index = 0; index < 7; index++)
            currElem.push(<th>{weekdaysList[index+1]}</th>)
        resultHead.push(<tr>{currElem}</tr>)

        currElem = []
    
        // Pad start of calendar with empty calendar days
        for( index = 0; index < dayOfWeek; index++ )
            currElem.push(<CalendarDay />);
        
        // Fill each row with calendar days
        while(currDay < days)
        {
            // If Sunday is reached, move on to the next row
            if( currDay !== 0 && (currDay + dayOfWeek) % 7 === 0)
            {
                result.push(<tr>{currElem}</tr>) 
                currElem = [];
                rowCount+=1;
            }

            // Only the days before selectEnd and after selectStart (inclusive) 
            // should have the date-selected class
            // If there is no selectEnd date, only selectStart should be selected
            var selStart = this.props.selectProps.selectStart;
            var selEnd = this.props.selectProps.selectEnd;
            var currDate = new Date(currDay + 1, this.props.month, this.props.year);
            
            var calDayClass = "date-unselected";
            if( selStart !== null && selEnd !== null )
            {
                var isDateAfterStart = ( currDate.daysBetween(selStart) <= 0 );
                var isDateBeforeEnd  = ( currDate.daysBetween(selEnd) >= 0);

                if( isDateAfterStart && isDateBeforeEnd )
                    calDayClass = "date-selected";
            }
            else if( selStart !== null && currDate.daysBetween(selStart) === 0)
                calDayClass = "date-selected";
            
            if( this.props.displaySchedule)
            {
                if( calDayClass === "date-unselected")
                for (let index = 0; index < this.props.scheduleProps.vacationDays.length; index++) 
                    if( currDate.daysBetween(this.props.scheduleProps.vacationDays[index]) === 0 )
                        calDayClass = "date-vacation";
            
                if( calDayClass === "date-unselected")
                    for (let index = 0; index < this.props.scheduleProps.workDays.length; index++) 
                        if( currDate.daysBetween(this.props.scheduleProps.workDays[index]) === 0 )
                            calDayClass = "date-work";

                if( calDayClass === "date-unselected")
                    for (let index = 0; index < this.props.scheduleProps.remoteDays.length; index++) 
                        if( currDate.daysBetween(this.props.scheduleProps.remoteDays[index]) === 0 )
                            calDayClass = "date-remote";
            }
            
            currElem.push(<CalendarDay class={calDayClass} dayNumber={currDay+1} onDateSelect={this.dateSelector}/>);
            currDay+=1
        }
    
        // Pad the end of the last row with calendar days
        while(currElem.length < 7)
            currElem.push(<CalendarDay class={"calendar-day-empty"} onDateSelect={null}/>);
        result.push(<tr>{currElem}</tr>) 
        
        while( rowCount < 6 )
        {
            currElem = [];
            while(currElem.length < 7)
                currElem.push(<CalendarDay class={"calendar-day-empty"} onDateSelect={null}/>);
            result.push(<tr>{currElem}</tr>)
            rowCount+=1
        }
    
        return(
            <table className="calendar-table">
                <thead>
                    {resultHead}
                </thead>
                <tbody>
                    {result}
                </tbody>
            </table>
        )
    }
}

class Calendar extends Component {

    state = {
        month: 1,
        year: 2021,
        selectStart: null,
        selectEnd: null,
        workDays: [],
        vacationDays: [],
        remoteDays: []
    }

    componentDidMount(){
        if( this.props.displaySchedule)
            this.getNewWorkschedule(1,2021)
    }

    componentDidUpdate(prevProps, prevState)
    {
        if( this.props.displaySchedule && (prevState.month !== this.state.month || prevState.year !== this.state.year))
            this.getNewWorkschedule(this.state.month, this.state.year)
    }

    getNewWorkschedule(month,year)
    {
        fetch( serverAddress + "/api/getWorkschedule/" + this.props.afm + "/" + month + "-" + year)
        .then( result =>  result.json())
        .then( (res) => {
            var newState = Object.assign({},this.state);

            for (let index = 0; index < res.length; index++) {
                const element = res[index];

                var tempdate = element.date.split('-');

                var date = new Date(Number(tempdate[2]), Number(tempdate[1]), Number(tempdate[0]));
                var type = element.workdaytype


                if( type === 2 )
                    newState.vacationDays.push(date)
                else if( type === 1 )
                newState.remoteDays.push(date)
                else
                    newState.workDays.push(date)
            }
            this.setState(newState);
        })

    }

    monthChange(offset){
        // Go forward or backward |offset| months
        var newState = Object.assign({},this.state);

        newState.month += offset;

        while( newState.month < 1 )
        {
            newState.month += 12
            newState.year -=1
        }

        while( newState.month > 12 )
        {
            newState.month -= 12
            newState.year +=1
        }

        this.setState(newState)
    }

    dateSelector = (selectedDate) => {
        // Given a clicked date object (day, month, year),
        // change the current date selection (functionality depends
        // on calendar type, either change to single selected date, 
        // init/modify a date range or do nothing)

        var newState = Object.assign({},this.state);

        if( this.props.type === "range-select")
        {
            // Selecting a Range

            // If there is no starting point, set selectedDate as one,
            // If there is a starting point and selectedDate is before
            // that point, create a new range with selectedDate as the starting point
            // if it is not before that point, set selectedDate as the ending point
            // If there is both a starting and an ending point, create a new range
            // with selectedDate as the starting point
            if(newState.selectStart === null )
                newState.selectStart = selectedDate;
            else if( newState.selectEnd === null )
                if( selectedDate.daysBetween(newState.selectStart) > 0)
                    newState.selectStart = selectedDate;
                else
                    newState.selectEnd = selectedDate;
            else
            {
                newState.selectStart = selectedDate;
                newState.selectEnd = null;
            }
            this.props.dateSelector(newState.selectStart,newState.selectEnd);
        }
        else if( this.props.type === "single-select")
        {
            // Single Selection


            // A single selection is treated as a range of
            // length 1
            newState.selectStart = selectedDate;
            newState.selectEnd = selectedDate;
            this.props.dateSelector(selectedDate);
        }
        this.setState(newState);
    }


    render() {

        var selectProps = {
            selectStart: this.state.selectStart,
            selectEnd: this.state.selectEnd,
        };

        var scheduleProps = {
            workDays : this.state.workDays,
            vacationDays: this.state.vacationDays,
            remoteDays : this.state.remoteDays,
            afm: this.props.afm
        };
        

        return(
            <div className="calendar-element">
                <div className="calendar-month"> {monthsList[this.state.month]} {this.state.year}</div>
                <CalendarMonth year={this.state.year} month={this.state.month} displaySchedule={this.props.displaySchedule} onDateSelect={this.dateSelector} selectProps={selectProps} scheduleProps={scheduleProps}/>
                <div className="calendar-nav">
                    <span className="calendar-navbutton" onClick={() => this.monthChange(-1)}>&lt;</span>
                    <span className="calendar-navbutton" onClick={() => this.monthChange(1)}>&gt;</span>
                </div>
            </div>
        )
    }
}

export default Calendar;