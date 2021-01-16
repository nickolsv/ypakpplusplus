import React from 'react';
import './FooterLinks.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';



function Contact(){
    return(
        <div>
            <div className="breadcrumb">
                <Link to ="/" className="not selected">
                    Αρχική Σελίδα 
                </Link>
                <p className="arrow">>></p>
                <p className="selected">Επικοινωνία</p>
            </div>
            <p className="title">Επικοινωνήστε μαζί μας με τους εξής τρόπους:</p>
            <p className="contact">Tηλεφωνικά στο:</p>
            <p className="info">21 3151 6649</p>
            <p className="contact">Με e-mail στο:</p>
            <p className="info">ypakp@ypakp.gr</p>
            <div className="appointment">
                <p className="contact">Αυτοπροσώπως, κλείνοντας πρώτα ένα </p>
                <Link to="/appointment" className="rantevou">ραντεβού, </Link>
                <p className="contact2">στην διεύθυνση:</p>
            </div>
            <p className="info">Σταδίου 29, Αθήνα 105 59</p>
            <p className="working-time">'Ωρες λειτουργίας υπουργείου: 09:00πμ εώς 05:00μμ Δευτέρα εώς Παρασκευή</p>
            <FontAwesomeIcon icon="coffee"/>
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