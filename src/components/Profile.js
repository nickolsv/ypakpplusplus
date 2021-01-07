import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Profile.css';

class Profile extends Component{

    state = {
        dropdownVisible:false
    }

    dropdownDrop()
    {
        var newState = Object.assign({},this.state);
        if(this.state.dropdownVisible)
        {
            newState.dropdownVisible = false;
        }
        else
        {
            newState.dropdownVisible = true;
        }
        this.setState(newState);
    }

    render()
    {
        var profile =(  <nav>
                            <ul className="profile-links">
                                <Link to='/calendar'>
                                    <li> Το Ημερολόγιό μου</li>
                                </Link>
                                <Link to='/'>
                                    <li>Αποσύνδεση</li>
                                </Link>
                            </ul>
                        </nav>);
        return (
            <div className="profile" onClick={ () => this.dropdownDrop()}>
                <p>Profile icon here</p>
                {this.state.dropdownVisible ? profile : null}
            </div>
        );
    }
}

export default Profile;