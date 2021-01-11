import React from "react";
import './Footer.css';
import {Link} from 'react-router-dom';

function Footer() {
    return(
        <nav>
            <h3> Footer</h3>
            <ul className="footer-links">
                <Link to='/contact'>
                    <li> Επικοινωνία</li>
                </Link>
                <Link to='/about'>
                    <li>About</li>
                </Link>
                <Link to='/terms'>
                    <li>Όροι Χρήσης</li>
                </Link>
            </ul>
            <div>
                <img className = "flag" src="images/GreekFlag.svg" alt="Greek flag" />
                <img className = "flag" src="images/EnglishFlag.png" alt=" English flag" />
            </div>
        </nav>
    );
}

export default Footer;