import React, { Component } from 'react';
import EmployeeSelector from './EmployeeSelector';
import {serverAddress} from '../imports/global';
import './Anastoli.css'


class Anastoli extends Component {

    state = {
        employeeData : null,
        stage: 0,
    }

    employeeSelect = (employeeData) => {
        var newState = Object.assign({},this.state);
                            
        newState.employeeData = employeeData;
        newState.stage = 1;
        this.setState(newState);
    }

    updateStatus = () => {
        var afm = this.state.employeeData.afm;
        if(afm)
            fetch(serverAddress + "/api/anastoliToggle/" + afm, {
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

    reset = () => {
        var newState = Object.assign({},this.state);
        newState.employeeData = null;
        newState.stage = 0;
        this.setState(newState);   
    }


    render()
    {
        var message = ""
        if( this.state.employeeData)
            if( !this.state.employeeData.isAnastoli )
                message = "Ο/η Εργαζόμενος/η " + this.state.employeeData.firstname + " " + this.state.employeeData.lastname + " εργάζεται. Θα θέλατε να τον/την θέσετε σε αναστολή;"
            else
                message = "Ο/η Εργαζόμενος/η " + this.state.employeeData.firstname + " " + this.state.employeeData.lastname + " βρίσκεται σε αναστολή. Θα θέλατε να την άρετε;"

        var renderElem;
        if( this.state.stage === 0 )
            renderElem = (<EmployeeSelector employeeSelect={this.employeeSelect} />)
        else if( this.state.stage === 1)
            renderElem = (<div> 
                            <p>{message}</p>
                            <div className="anastoli-button-container">
                                <button onClick={this.reset}>Ακύρωση</button>
                                <button onClick={this.updateStatus}>Eπιβεβαίωση</button>
                            </div>
                        </div>)
        else if( this.state.stage === 2)
            renderElem = (<div className="anastoli-container">
                            <p>Η αλλαγη πραγματοποιήθηκε με επιτυχία</p>
                            <button onClick={this.reset}>Επανάληψη</button> 
                        </div>)
        else
            renderElem = (<div>
                            <p>Υπάρχει κάποιο πρόβλημα με την υπηρεσία. Παρακαλώ προσπαθήστε αργότερα.</p>
                            <button onClick={this.reset}>Επανάληψη</button> 
                        </div>)

        return(
            <div className="anastoli-container">
                <h2> Δήλωση/Άρση Αναστολής Εργασίας</h2>
                {renderElem}
            </div>
        )
    }
}

export default Anastoli;