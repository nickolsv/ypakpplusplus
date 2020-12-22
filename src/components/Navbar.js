import React from 'react';
import './Navbar.css';
import './Navdropdown';
import Navdropdown from './Navdropdown';

class Navbar extends React.Component {

    state = {
        dropDownVisible: false,
        visibleID: 1
    }

    dropDownDrop(clickedID)
    {
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
        var optionArray = [this.state.visibleID];
        return(
            <div>
                <nav className="navbar">
                    <div className="navitem" onClick={() => this.dropDownDrop(1) }>
                        <p>ΘΕΜΑΤΑ</p>
                    </div>
                    <div className="navitem" onClick={() => this.dropDownDrop(2) }>
                        <p>ΥΠΗΡΕΣΙΕΣ</p>
                    </div>
                    <div className="navitem" onClick={() => this.dropDownDrop(3) }>
                        <p>ΕΠΙΚΟΙΝΩΝΙΑ</p>
                    </div>
                </nav>

            { this.state.dropDownVisible ? <Navdropdown options={optionArray}/> : null }
            </div>
        );
    }
}

export default Navbar;