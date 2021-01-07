import React, { Component } from 'react';
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


class Date {
    
    constructor(day, month, year) {
        this.day = day;
        this.month = month;
        this.year = year;
    }

    daysBetween(anotherDate) {
        // Return days between this date and anotherDate
        // positive if anotherDate is after this one, otherwise negative

        var daysSinceEpoch1 = getDaysSinceEpoch(this.month, this.year);
        var daysSinceEpoch2 = getDaysSinceEpoch(anotherDate.month, anotherDate.year);

        return ( daysSinceEpoch2 + anotherDate.day - 1) - (daysSinceEpoch1 + this.day - 1)
    }

}

function getDaysOfMonth(month,year){
    // Calculate number of days in each month
    var days = 31;
    if([4,6,9,11].indexOf(month) !== -1)
        days = 30
    else if( month === 2)
        if( !isLeapYear(year) )
            days = 28
        else
            days = 29

    return days;
}

function isLeapYear(year) {
    // Returns whether year is a leap year
    return !((year % 4 !== 0) || (year % 100 === 0 && year % 400 !== 0 ));
}

function getDaysSinceEpoch(month,year) {
    // Get number of days from 1/1/1970 to 1/month/year
    var days = 0;
    var fullYears = year - 1970;
    
    days += fullYears*365 + Math.floor((fullYears+1) / 4) - Math.floor((fullYears+69) / 100) + Math.floor(Math.abs(fullYears+369) / 400);
    for (let index = 0; index < month - 1; index++) {
        days += getDaysOfMonth(index+1,year)
        
    }

    return days;
}


// TODO: CalendarDay classes for Days Off/Working/Remote -- CalendarType-dependent


function CalendarDay() {
    return(
        <td className={this.props.class} onClick={() => this.props.onDateSelect(this.props.dayNumber) }>
            {this.props.dayNumber}
        </td>
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
            if( (currDay + dayOfWeek) % 7 === 0 )
            {
                result.push(<tr>{currElem}</tr>) 
                currElem = [];
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
            
            currElem.push(<CalendarDay class={calDayClass} dayNumber={currDay+1} onDateSelect={this.dateSelector}/>);
            currDay+=1
        }
    
        // Pad the end of the last row with calendar days
        if( currElem !== []){
            while(currElem.length < 7)
                currElem.push(<CalendarDay />);
            result.push(<tr>{currElem}</tr>) 
        }
    
        return(
            <table>
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
        // TODO:
        // On Component mount, request calendar schedule from backend
        // if calendarType prop is schedule
        // then update state accordingly
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
        }
        else if( this.props.type === "single-select")
        {
            // Single Selection


            // A single selection is treated as a range of
            // length 1
            newState.selectStart = selectedDate;
            newState.selectEnd = selectedDate;
        }
        this.setState(newState);
    }


    render() {

        var selectProps = {
            selectStart: this.state.selectStart,
            selectEnd: this.state.selectEnd,
        };

        return(
            <div>
                <div> {monthsList[this.state.month]} {this.state.year}</div>
                <CalendarMonth year={this.state.year} month={this.state.month} onDateSelect={this.dateSelector} selectProps={selectProps}/>
                <span onClick={() => this.monthChange(-1)}>&lt;</span>
                <span onClick={() => this.monthChange(1)}>&gt;</span>
                
            </div>
        )
    }
}

export default Calendar;