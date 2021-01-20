import React, { Component } from 'react';
import {serverAddress} from '../imports/global';

class Register extends Component {

    state = {
        message: null,
    }

    componentDidMount()
    {
        var afm = document.getElementById("afm-input");
        // Setting custom validity message
        if( afm != null)
        {
            afm.oninvalid = (e) => e.target.setCustomValidity("Το ΑΦΜ πρέπει να έιναι 10 ψηφία");
            afm.oninput = (e) => e.target.setCustomValidity('');
        }
    }

    attemptRegister(endPoint)
    {
        var fname = document.getElementById("fname-input").value
        var lname = document.getElementById("lname-input").value;
        var afm = document.getElementById("afm-input").value;
        var role = document.getElementById("role-select").value;
        var email = document.getElementById("email-input").value;
        var telephone = document.getElementById("telephone-input").value;
        var companyname = document.getElementById("cname-input").value;

        if( sessionStorage.getItem("afm") === null)
            fetch(endPoint, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fname: fname, lname: lname, afm: afm, role: role, email: email, tel: telephone, companyname: companyname}),
            })
            .then( (result) => {
                var newState = Object.assign({},this.state);
                if( result.status === 401 )
                {
                    result.json().then( (res) => {
                        if( res.error === 0)
                            newState.message = "Έχετε ήδη λογαριασμο. Παρακαλώ, συνδεθείτε εδώ.";
                        else
                            newState.message = "Η εταιρία " + companyname + " έχει ήδη δηλωμένο εργοδότη. ";
                        this.setState(newState);

                    });
                }
                else 
                {
                    newState.message = "";
                    sessionStorage.setItem("fname",fname);
                    sessionStorage.setItem("lname",lname);
                    sessionStorage.setItem("afm",afm);
                    window.location = "/";
                }
                
                this.setState(newState);
            })
            .catch((error) => {
                var newState = Object.assign({},this.state);
                console.log(error);
                newState.message = "Υπάρχει κάποιο πρόβλημα με την υπηρεσία. Παρακαλώ προσπαθήστε αργότερα.";
                this.setState(newState);        
            });
        else
            window.location = "/";
    }


    render() {

        // /register as default endpoint, unless specified otherwise
        var endPoint = this.props.endPoint ? this.props.endPoint : serverAddress + "/api/register";

        var inputArray = []
        inputArray.push(<input id="fname-input" name="fname" type="text" placeholder="Όνομα" required />)
        inputArray.push(<input id="lname-input" name="lname" type="text" placeholder="Επώνυμο" required />)
        inputArray.push(<input id="afm-input" name="afm" type="text" placeholder="ΑΦΜ" required pattern="[0-9]{10}" maxLength="10" minLength="10" />)
        inputArray.push(<select name="role" id="role-select"><option value="0">Εργαζόμενος</option><option value="1">Εργοδότης</option></select>)

        inputArray.push(<input id="email-input" name="email" type="email" placeholder="E-Mail" required  />)
        inputArray.push(<input id="telephone-input" name="tel" type="tel" placeholder="Τηλέφωνο" required />)
        inputArray.push(<input id="cname-input" name="companyname" type="text" placeholder="Όνομα Επιχείρησης" required />)


        inputArray.push(<button type="submit"> Submit</button>)

        return(
            <div>
                <div>
                    <form onSubmit={(event) => {this.attemptRegister(endPoint); event.preventDefault();}}>
                        {inputArray}
                    </form>
                    <p>
                        {this.state.message}
                    </p>
                </div>
            </div>
        );
    }
}

export default Register;