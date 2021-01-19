import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Profile.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';

class Profile extends Component{

    state = {
        dropdownVisible:false
    }

    dropdownDrop()
    {
        var newState = Object.assign({},this.state);
        if(this.state.dropdownVisible)
            newState.dropdownVisible = false;
        else
            newState.dropdownVisible = true;
        this.setState(newState);
    }

    logout()
    {
        sessionStorage.clear();
        window.location = "/";
    }

    render()
    {
        var isLoggedIn = this.props.isLoggedIn;
        var profile = ( <nav>
            <ul className="profile-links">
                <Link to='/login' className="link">
                    <li> Σύνδεση</li>
                </Link>
                <Link to='/register' className="link">
                    <li> Εγγραφή</li>
                </Link>
            </ul>
        </nav>)

        if( isLoggedIn)
            profile =(  <nav>
                            <ul className="profile-links">
                                <Link to='/calendar' className="link">
                                    <li> Το Ημερολόγιό μου</li>
                                </Link>
                                <Link onClick={() => this.logout()} to='/' className="link">
                                    <li>Αποσύνδεση</li>
                                </Link>
                            </ul>
                        </nav>);

        return (
            <div className="profile" onClick={ () => this.dropdownDrop()}>
                {sessionStorage.getItem("afm") ? <p className="user-name">{sessionStorage.fname + " " + sessionStorage.lname}</p> : null }
                <FontAwesomeIcon icon={faUserCircle} className="user"/>
                {this.state.dropdownVisible ? profile : null}
            </div>
        );
    }
}

export default Profile;