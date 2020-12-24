import React from "react";
import './Footer.css';

function Footer() {
    return(
        <nav className="footer" >
            <div className="footeritem">
                <p>Επικοινωνία</p>
            </div>
            <div className="footeritem">
                <p>Όροι Χρήσης</p>
            </div>
            <div className="footeritem">
                <p>About</p>
            </div>
            <div>
                <img className = "flag" src="images/GreekFlag.svg" alt="Greek flag" />
                <img className = "flag" src="images/EnglishFlag.png" alt=" English flag" />
            </div>
        </nav>
    );
}

export default Footer;