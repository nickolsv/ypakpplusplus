import React, { Component } from 'react';
import EmployeeSelector from './EmployeeSelector';
import Calendar from './Calendar';


// TODO: Display existing schedule on calendar
// TODO: Display confirmation message before sending form

class Workschedule extends Component {

    state = {
        employeeData : null,
        startDate: null,
        endDate: null,
        scheduleType: 0,
        stage : 0,
    }

    employeeSelect = (employeeData) => {
        var newState = Object.assign({},this.state);
                            
        newState.employeeData = employeeData;
        newState.stage = 1;
        this.setState(newState);
    }

    dateSelector = (start, end) => {
        var newState = Object.assign({},this.state);
                            
        newState.startDate = start;
        newState.endDate = end;
        if( end === null )
            newState.endDate = start;
        this.setState(newState);    
    }

    dateConfirm = () => {
        var newState = Object.assign({},this.state);
                            
        newState.stage = 2;
        this.setState(newState);
    }

    reset = () => {
        var newState = Object.assign({},this.state);
        newState.employeeData = null;
        newState.startDate = null;
        newState.endDate = null;
        newState.stage = 0;
        newState.scheduleType = 0;
        this.setState(newState);   
    }

    updateStatus = () => {
        var afm = this.state.employeeData.afm;
        var startDate = this.state.startDate;
        var endDate = this.state.endDate;
        var scheduleType = this.state.scheduleType;

        if(afm)
            fetch("http://localhost:3001/api/updateWorkschedule/" 
                  + afm + "/"
                  + startDate.year + "-" + startDate.month + "-" + startDate.day + "/"
                  + endDate.year + "-" + endDate.month + "-" + endDate.day + "/"
                  + scheduleType, {
                method: "POST",
            })
            .then( (result) => {
                if( result.status === 200 )
                {
                    var newState = Object.assign({},this.state);
                    newState.stage = 2
                    this.setState(newState); 
                }
            })
            .catch((error) => {
                var newState = Object.assign({},this.state);
                newState.stage = -1
                this.setState(newState);     
            });
    }

 
    render()
    {
        var renderElem;
        if( this.state.stage === 0 )
            renderElem = (<EmployeeSelector employeeSelect={this.employeeSelect} />)
        else if( this.state.stage === 1 )
            renderElem = (<div>
                    <select name="role" id="role-select">
                        <option value="0" selected>Εργασία</option>
                        <option value="1">Τηλεργασία</option>
                        <option value="1">Άδεια </option>
                    </select>
                <Calendar type="range-select" dateSelector={this.dateSelector} />
                { this.state.startDate ? <button onClick={this.dateConfirm}> Επιλογή </button> : null}
                <button onClick={this.reset}>Επιστροφή</button>
            </div>)
        else if( this.state.stage === 2)
            renderElem = (<div> 
                <p>Lul</p> 
                <button onClick={this.reset}>Ακύρωση</button>
                <button onClick={this.updateStatus}>Eπιβεβαίωση</button> 
            </div>)
        else if( this.state.stage === 3)
        renderElem = (<div>
                        <p>Η δήλωση πραγματοποιήθηκε με επιτυχία</p>
                        <button onClick={this.reset}>Επανάληψη</button> 
                    </div>)
        else
        renderElem = (<div>
                        <p>Υπάρχει κάποιο πρόβλημα με την υπηρεσία. Παρακαλώ προσπαθήστε αργότερα.</p>
                        <button onClick={this.reset}>Επανάληψη</button> 
                    </div>)

    
        return(
            <>
                {renderElem}
            </>
        )
    }
}

export default Workschedule;