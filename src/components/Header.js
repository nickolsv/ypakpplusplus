import {Link} from 'react-router-dom';
import Profile from './Profile';
import Navbar from './Navbar';
import './Header.css';

function Header() {
    return(
        <div className="header-container"> 
            <div className="header">
                <Link to="/">
                    <img className="header-logo header-item header-left" src="./images/logo2.png" alt="Website Logo"></img>
                </Link>
                <Profile isLoggedIn={sessionStorage.getItem("afm")}/>
            </div>
            <Navbar />
        </div>

        
    );
}

export default Header;