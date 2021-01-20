import React from "react";
import './Banner.css';
import {Link} from 'react-router-dom';

function Banner(){
    return(        
        <div>
            <img className="banner-image" src="images/Doctors.png" alt="Doctors"/>
            <div className="learn-more">
                <Link to='/covid19info' className="learn-more-link">
                    Μάθετε Περισσότερα
                </Link>
            </div>
            <div className="information">
                <p>Όλες οι πληροφoρίες που πρέπει να γνωρίζετε</p>
                <p>σχετικά με τον covid-19 και το μέρος που εργάζεστε.</p>
            </div>
        </div>
    )
}

function BannerLink(){
    return(
        <div>
            <div className="breadcrumb">
                <Link to = "/" className="not-selected">Θέματα</Link>
                <p className="arrow">&gt;&gt;</p>
                <Link to = "/covid19" className="not-selected">covid-19</Link>
                <p className="arrow">&gt;&gt;</p>
                <p className="selected">Αντιμετώπιση του covid-19 στον εργασιακό χώρο</p>
            </div>
            <img className="covid-image" src="images/guide.jpg" alt="Covid guide"/>
        </div>
    )

}

export{
    Banner,
    BannerLink
}