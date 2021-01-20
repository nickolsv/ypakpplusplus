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

    incrementDay() {
        this.day+=1
        if( (this.day === 32 && [1,3,5,7,8,10,12].indexOf(this.month) !== -1) ||
            (this.day === 31 && [4,6,9,11].indexOf(this.month) !== -1) ||
            (this.day === 30 && this.month === 2 && isLeapYear(this.year) ) ||
            (this.day === 29 && this.month === 2 && !isLeapYear(this.year)))
        {
            this.month +=1
            this.day = 1
        }

        if( this.month === 13)
            this.month = 1

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

module.exports = Date