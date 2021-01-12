import React from "react";
import './Banner.css';
import {Link} from 'react-router-dom';

function Banner(){
    return(        
        <div>
            <img className="banner-image" src="images/Doctors.png"/>
            <div class="learn-more">
                <Link to='/covid19info'>
                    Μάθετε Περισσότερα
                </Link>
            </div>
            <div class="information">
                <p>Όλες οι πληροφρίες που πρέπει να γνωρίζετε</p>
                <p>σχετικά με τον covid-19 και το μέρος που εργάζεστε.</p>
            </div>
        </div>
    )
}

function BannerLink(){
    return(
        <div>
            <h1> Covid Page</h1>
        </div>
    )

}

export{
    Banner,
    BannerLink
}