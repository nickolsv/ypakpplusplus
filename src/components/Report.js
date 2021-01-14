import React from "react";
import {Link} from 'react-router-dom';
import './Report.css';

function ReportLink(){
    return(
        <div classsName ="report-link">
            <Link to='/report'>
                Αναφορά Παραβίασης
            </Link>
        </div>
    )
}

function ReportPage(){
    return(
        <div>
            <h1>Αναφορά Κινδύνου/Παραβίασης Νόμου</h1>
            <form>
                <label for="first-name">Όνομα :</label><br/>
                <input type="text" id="first-name" name="first-name"/><br/>
                <label for="last name"> Επίθετο :</label><br/>
                <input type="text" id="last-name" name="last-name"/><br/>
                <label for="address">Διεύθυνση :</label><br/>
                <input type="text" id="address" name="address"/><br/>
                <label for="area">Περιοχή</label><br/>
                <input type="text" id="area" name="area"/><br/>
                <label for="comments">Σχόλια :</label><br/>
                <input type="text" id="comments" name="comments" className="sxolia"/><br/>
                <button type="submit">Υποβολή</button>
            </form>
        </div>
    );
}


export{
    ReportLink,
    ReportPage
}