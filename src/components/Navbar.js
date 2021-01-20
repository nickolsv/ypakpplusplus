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
                                        {title: "Test1", href: "/test1"}, 
                                        {title: "Test2", href: "/test2"}]
                                },
                                {   title: null, 
                                    links: [
                                        {title: "Test3", href: "/test3"}, 
                                        {title: "Test4", href: "/test4"}]
                                },
                            ],
                            [
                                {   title: "Title1", 
                                    links: [
                                        {title: "TitleTest1", href: "/ttest1"}, 
                                        {title: "TitleTest2", href: "/ttest2"}]
                                },
                                {   title: "Title2", 
                                    links: [
                                        {title: "TitleTest3", href: "/ttest3"}, 
                                        {title: "TitleTest4", href: "/ttest4"}]
                                },
                            ],
                            [
                                {   title: null, 
                                    links: [
                                        {icon: "faPhone", title: "21 3151 6649", href: ""}, 
                                        {icon: "faEnvelope", title: "ypakp@ypakp.gr", href: ""}, 
                                        {icon:"faCalendar", title: "Κλείνοντας ένα ραντεβόυ, Σταδίου 29, Αθήνα 105 59", href: "/appointement"}]
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
                        <FontAwesomeIcon icon={faFolder} className="nav-icon1"/>
                        <p className="text">ΘΕΜΑΤΑ</p>
                    </div>
                    <div className="navitem" onClick={ () => this.dropDownDrop(1) }>
                        <FontAwesomeIcon icon={faToolbox} className="nav-icon2"/>
                        <p className="text">ΥΠΗΡΕΣΙΕΣ</p>
                    </div>
                    <div className="navitem" onClick={ () => this.dropDownDrop(2) }>
                        <FontAwesomeIcon icon={faPhone} className="nav-icon3"/>
                        <p className="text">ΕΠΙΚΟΙΝΩΝΙΑ</p>
                    </div>
                </nav>

            { this.state.dropDownVisible ? <Navdropdown options={optionArray}/> : null }
            </div>
        );
    }
}

export default Navbar;