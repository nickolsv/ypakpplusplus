import React, { Component } from 'react';
import './EmployeeSelector.css'

class EmployeeSelector extends Component {


    state = {
        suggestions : null,
        selecteduser : null
    }

    selectEmployee = (element) => {
        var newState = Object.assign({},this.state);
                            
        newState.selecteduser = {
            firstname: element.firstname,
            lastname: element.lastname,
            afm: element.afm,
            isAnastoli: element.isAnastoli
        };
        this.setState(newState);
    }

    showSuggestions = () => {
        var val= document.getElementById("employee-search").value;

        if( val !== "" )
            fetch("http://localhost:3001/api/get-employees/" + sessionStorage.getItem("afm") + "/" + val)
            .then( (response) => response.json() )
            .then(
                (result) => {
                    var newState = Object.assign({},this.state);
                            
                    newState.suggestions = result;
                    newState.selecteduser = null;
                    this.setState(newState)
                }
            );
        else
        {
            var newState = Object.assign({},this.state);
                            
            newState.suggestions = null;
            newState.selecteduser = null;
            this.setState(newState);
        }

    }

    render() 
    {
        var suggestionElem = [];
        if(this.state.suggestions !== null )
            this.state.suggestions.forEach(element => {
                var elemClass = "suggestion-element"
                if( this.state.selecteduser && this.state.selecteduser.afm === element.afm)
                    elemClass = "suggestion-element suggestion-selected"
                suggestionElem.push(<div onClick={ () => {this.selectEmployee(element)}} 
                                         id={`employee-${element.afm}`} 
                                         className={elemClass}>
                                         <div className="suggestion-field">{element.firstname}</div>
                                         <div className="suggestion-field">{element.lastname}</div>
                                         <div className="suggestion-field right">{element.afm}</div>
                                         {element.isAnastoli ? <div className="suggestion-field right">( Σε Αναστολή )</div> : null}
                                    </div>);
            });

        return(
            <div className="employee-selector">
                <div className="suggestion-container">
                    <label htmlFor="employee-search">Αναζήτηση Εργαζομένου</label>
                    <input className="suggestion-input" onChange={this.showSuggestions} type="text" id="employee-search">
                    </input>
                    {  this.state.suggestions && this.state.suggestions.length === 0 ? <p>Κανένα Αποτέλεσμα</p> : suggestionElem }
                </div>
                {this.state.selecteduser ? <button onClick={() => this.props.employeeSelect(this.state.selecteduser)}>Επιλογή</button> : null }
            </div>

        )
    }
}

export default EmployeeSelector;