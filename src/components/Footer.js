import React from "react";
import './Footer.css';
import {Link} from 'react-router-dom';

function Footer() {
    return(
        <nav className="footer">
            <ul className="footer-links">
                <Link to='/contact' className="link">
                    <li> Επικοινωνία</li>
                </Link>
                <Link to='/about' className="link">
                    <li>About</li>
                </Link>
                <Link to='/terms' className="link">
                    <li>Όροι Χρήσης</li>
                </Link>
            </ul>
            <div className="flags">
                <img className = "flag" src="images/GreekFlag.svg" alt="Greek flag" />
                <img className = "flag" src="images/EnglishFlag.png" alt=" English flag" />
            </div>
        </nav>
    );
}

export default Footer;