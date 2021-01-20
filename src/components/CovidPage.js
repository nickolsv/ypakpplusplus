import React from 'react';
import { Link } from 'react-router-dom';
import './CovidPage.css'


function CovidPage() {
    return(
        <div>
            <div className="breadcrumb">
                <Link to = "/" className="not-selected">Θέματα</Link>
                <p className="arrow">&gt;&gt;</p>
                <p className="selected">covid-19</p>
            </div>
            <div className="content">
                <div>
                    <div className="subject">
                        <div className="cov-text1">
                            <p>Όλα όσα θα πρέπει να γνωρίζετε για την αντιμετώπιση</p>
                            <p>του covid στον εργασιακό σας χώρο</p>
                            <Link to ='covid19info'>Μάθετε περισσότερα </Link> 
                        </div>
                        <img className="cov-image" src="images/workplace.png" alt="Workplace"/>
                    </div>
                    <div className="subject">
                        <div className="cov-text2">
                            <p>Οι επιλογές που έχετε σχετικά με τα εργασιακά</p>
                            <p>σας δικαιώματα την εποχή της πανδημίας</p>
                            <Link to ='/choices'>Μάθετε περισσότερα</Link>
                        </div>
                        <img className="cov-image" src="images/choices.png"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CovidPage;