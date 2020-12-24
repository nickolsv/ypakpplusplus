import {Link} from 'react-router-dom';

import './Header.css';

function Header() {
    return(
        <div className="header">
            <Link to="/">
                <img className="header-logo header-item header-left" src="./images/logo.jpg" alt="Website Logo"></img>
            </Link>
            <div className="header-profile header-item header-right">
                Placeholder
            </div>
        </div>
    );
}

export default Header;