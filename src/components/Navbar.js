import React, { Component } from 'react';

import './Navbar.css';
import './Navdropdown';
import Navdropdown from './Navdropdown';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFolder, faToolbox, faPhone} from '@fortawesome/free-solid-svg-icons';

class Navbar extends Component {

    state = {
        dropDownVisible: false,         // Bool - Whether a navbar element is expanded
        visibleID: 1                    // ID of expanded navbar element (if any)
    }

    closeDrop = () => {
        var newState = Object.assign({},this.state);
        newState.dropDownVisible = false;
        newState.visibleID = 1;
        this.setState(newState);
    }

    dropDownDrop(clickedID)
    {
        // Expands/hides the clicked navigation bar item
        var newState = Object.assign({},this.state);

        if( this.state.dropDownVisible )
        {
            if( this.state.visibleID === clickedID )    newState.dropDownVisible = false;
            newState.visibleID = clickedID;
        }
        else
        {
            newState.dropDownVisible = true;
            newState.visibleID = clickedID;
        }

        this.setState(newState);
    }

    render()
    {
        var dropdownLinks = [[
                                {   title: null, 
                                    links: [
                                        {title: "Μίσθωση", href: ""}, 
                                        {title: "Άδειες Εργαζομένων", href: ""}]
                                },
                                {   title: null, 
                                    links: [
                                        {title: "Ασφαλιση", href: ""}, 
                                        {title: "Συμβάσεις Εργασίας", href: ""}]
                                },
                                {   title: null, 
                                    links: [
                                        {title: "Νομοθεσία", href: ""}, 
                                        {title: "Ευκαιρίες Κατάρτισης", href: ""}]
                                },
                                {   title: null, 
                                    links: [
                                        {title: "Covid-19", href: "/choices"}]
                                }
                            ],
                            [
                                {   title: "Για Εργαζόμενους", 
                                    links: [ 
                                        {title: "Αρχείο Εργασιακής Κατάστασης", href: "/calendar"}]
                                },
                                {   title: "Για Εργοδότες", 
                                    links: [
                                        {title: "Δήλωση / Άρση Αναστολής Εργασίας", href: "/anastoli"}, 
                                        {title: "Δήλωση Αδειών / Τηλεργασίας Εργαζομένων", href: "/workschedule"}]
                                },
                                {   title: "Κοινές", 
                                    links: [
                                        {title: "Κλείστε Ένα Ραντεβού", href: "/appointment"}, 
                                        {title: "Αναφορά Κινδύνων / Παραβίασης Νόμων", href: "/report"}]
                                },
                            ],
                            [
                                {   title: "Title3", 
                                    links: [
                                        {title: "TitleTest5", href: "/ttest5"}, 
                                        {title: "TitleTest6", href: "/ttest6"}, 
                                        {title: "TitleTest7", href: "/ttest7"}]
                                },
                            ],
                        ]
                        
        
        // The value of visibleID stored in the component's state corresponds to the index of the dropdownlinks array
        // whose contents will be displayed. visibleID is changed through the dropDownDrop function
        var optionArray = dropdownLinks[this.state.visibleID];
        return(
            <div className="navbar-container">
                <nav className="navbar">
                    <div className="navitem" onClick={ () => this.dropDownDrop(0) }>
                        <FontAwesomeIcon icon={faFolder} className="icon"/>
                        <p className="text">ΘΕΜΑΤΑ</p>
                        { this.state.dropDownVisible && this.state.visibleID === 0 ? <Navdropdown closeDrop={this.closeDrop} options={optionArray}/> : null }

                    </div>
                    <div className="navitem" onClick={ () => this.dropDownDrop(1) }>
                        <FontAwesomeIcon icon={faToolbox} className="icon"/>
                        <p className="text">ΥΠΗΡΕΣΙΕΣ</p>
                        { this.state.dropDownVisible && this.state.visibleID === 1 ? <Navdropdown closeDrop={this.closeDrop} options={optionArray}/> : null }
                    </div>
                    <div className="navitem" onClick={ () => this.dropDownDrop(2) }>
                        <FontAwesomeIcon icon={faPhone} className="icon"/>
                        <p className="text">ΕΠΙΚΟΙΝΩΝΙΑ</p>
                        { this.state.dropDownVisible && this.state.visibleID === 2 ? <Navdropdown closeDrop={this.closeDrop} options={optionArray}/> : null }
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;