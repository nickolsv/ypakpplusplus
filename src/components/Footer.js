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
        </nav>
    );
}

export default Footer;