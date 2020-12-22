import React from 'react';
import './Navbar.css';

class Navbar extends React.Component {

    render()
    {
        return(
            <nav className="navbar">
                <div className="navitem">
                    <p>ΘΕΜΑΤΑ</p>
                </div>
                <div className="navitem">
                    <p>ΥΠΗΡΕΣΙΕΣ</p>
                </div>
                <div className="navitem">
                    <p>ΕΠΙΚΟΙΝΩΝΙΑ</p>
                </div>
            </nav>
        );
    }
}

export default Navbar