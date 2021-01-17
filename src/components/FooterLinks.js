import React from 'react';
import './FooterLinks.css';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhone, faEnvelope, faCalendar} from '@fortawesome/free-solid-svg-icons';



function Contact(){
    return(
        <div>
            <div className="breadcrumb">
                <Link to ="/" className="not-selected">
                    Αρχική Σελίδα 
                </Link>
                <p className="arrow">&gt;&gt;</p>
                <p className="selected">Επικοινωνία</p>
            </div>
            <p className="title">Επικοινωνήστε μαζί μας με τους εξής τρόπους:</p>
            <div className="combine">
                <FontAwesomeIcon icon={faPhone} className="icon"/>
                <p className="contact">Tηλεφωνικά στο:</p>
            </div>
            <p className="info">21 3151 6649</p>
            <div className="combine">
                <FontAwesomeIcon icon={faEnvelope} className="icon"/>
                <p className="contact">Με e-mail στο:</p>
            </div>
            <p className="info">ypakp@ypakp.gr</p>
            <div className="combine">
                <FontAwesomeIcon icon={faCalendar} className="icon"/>
                <div className="appointment">
                    <p className="contact">Αυτοπροσώπως, κλείνοντας πρώτα ένα </p>
                    <Link to="/appointment" className="rantevou">ραντεβού, </Link>
                    <p className="contact2">στην διεύθυνση:</p>
                </div>
            </div>
            <p className="info">Σταδίου 29, Αθήνα 105 59</p>
            <p className="working-time">'Ωρες λειτουργίας υπουργείου: 09:00πμ εώς 05:00μμ Δευτέρα εώς Παρασκευή</p>
        </div>
    );
}

function Terms(){
    return(
        <div>
            <h1>Terms of Use Page</h1>
        </div>
    );
}

function About(){
    return(
        <div>
            <h1>About Page</h1>
        </div>
    );
}

export{ 
    About,
    Terms,
    Contact
}