import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Profile.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
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
                                <Link to='/calendar' className="link2">
                                    <li className="link"> Το Ημερολόγιό μου</li>
                                </Link>
                                <Link to='/' className="link2">
                                    <li className="link">Αποσύνδεση</li>
                                </Link>
                            </ul>
                        </nav>);
        return (
            <div className="profile" onClick={ () => this.dropdownDrop()}>
                <FontAwesomeIcon icon={faUserCircle} className="user"/>
                {this.state.dropdownVisible ? profile : null}
            </div>
        );
    }
}

export default Profile;