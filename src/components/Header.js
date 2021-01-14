import {Link} from 'react-router-dom';
import Profile from './Profile';

import './Header.css';

function Header() {
    return(
        <div className="header">
            <Link to="/">
                <img className="header-logo header-item header-left" src="./images/logo2.png" alt="Website Logo"></img>
            </Link>
            <Profile/>
        </div>
        
    );
}

export default Header;