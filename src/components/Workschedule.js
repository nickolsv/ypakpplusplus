import React, { Component } from 'react';
import EmployeeSelector from './EmployeeSelector';
import Calendar from './Calendar';
import {serverAddress} from '../imports/global';
import './Workschedule.css'

var schType = {
    0: "Εργασία",
    1: "Τηλεργασία",
    2: "Άδεια",
}

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
        newState.scheduleType = document.getElementById("role-select").value;
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
            fetch(serverAddress + "/api/updateWorkschedule/" 
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
                    newState.stage = 3
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
        console.log(this.employeeData);
        var renderElem;
        if( this.state.stage === 0 )
            renderElem = (<EmployeeSelector employeeSelect={this.employeeSelect} />)
        else if( this.state.stage === 1 && this.state.employeeData !== null )
            renderElem = (<div className="workschedule-container workschedule-margin">

                <Calendar type="range-select" displaySchedule={true} dateSelector={this.dateSelector} afm={this.state.employeeData.afm}/>
                        <select name="role" id="role-select">
                                <option value="0" selected>Εργασία</option>
                                <option value="1">Τηλεργασία</option>
                                <option value="2">Άδεια </option>
                        </select>
                    <div className="workschedule-button-container2">
                        <button onClick={this.reset}>Επιστροφή</button>
                        <button disabled={this.state.startDate === null ? true : false} onClick={this.dateConfirm}>Επιλογή</button>

                    </div>
            </div>)
        else if( this.state.stage === 2)
            renderElem = (<div className="workschedule-subcontainer"> 
                <p>Πρόκειτε να θέσετε τον/την Εργαζόμενο/η {this.state.employeeData.firstname} {this.state.employeeData.lastname} σε {schType[this.state.scheduleType]} για το διάστημα {this.state.startDate.day}-{this.state.startDate.month}-{this.state.startDate.year} έως {this.state.endDate.day}-{this.state.endDate.month}-{this.state.endDate.year} </p> 
                <div className="workschedule-button-container">
                    <button onClick={this.reset}>Ακύρωση</button>
                    <button onClick={this.updateStatus}>Eπιβεβαίωση</button> 
                </div>
            </div>)
        else if( this.state.stage === 3)
        renderElem = (<div className="workschedule-container">
                        <p>Η δήλωση πραγματοποιήθηκε με επιτυχία</p>
                        <button onClick={this.reset}>Επανάληψη</button> 
                    </div>)
        else
        renderElem = (<div>
                        <p>Υπάρχει κάποιο πρόβλημα με την υπηρεσία. Παρακαλώ προσπαθήστε αργότερα.</p>
                        <button onClick={this.reset}>Επανάληψη</button> 
                    </div>)

    
        return(
            <div className="workschedule-container">
                <h2> Δήλωση Αδειών/Τηλεργασίας Εργαζομένων</h2>
                {renderElem}
            </div>
        )
    }
}

export default Workschedule;