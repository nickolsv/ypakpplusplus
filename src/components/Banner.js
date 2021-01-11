import React from "react";
import './Banner.css';
import {Link} from 'react-router-dom';

function Banner(){
    return(

        <div className = "more-button">
            <Link to='/covid19info'>
                <h3> Μάθετε Περισσότερα </h3>
            </Link>
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