import React, { Component } from 'react';
import './Login.css';

class Login extends Component {

    state = {
        message : "",
        messageClass : ""
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

    attemptLogin(endPoint)
    {
        var fname = document.getElementById("fname-input").value
        var lname = document.getElementById("lname-input").value;
        var afm = document.getElementById("afm-input").value;

        if( sessionStorage.getItem("afm") === null)
            fetch(endPoint, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fname: fname, lname: lname, afm: afm}),
            })
            .then( (result) => {
                var newState = Object.assign({},this.state);
                if( result.status === 401 )
                {
                    newState.message = "Λανθασμένα Στοιχεία Εισόδου, παρακαλώ προσπαθήστε ξανά.";
                    newState.messageClass = "credentials-wrong";
                    this.setState(newState);

                }
                else 
                    result.json().then( (res) => {
                        newState.message = "";
                        newState.messageClass = "";
                        sessionStorage.setItem("fname",fname);
                        sessionStorage.setItem("lname",lname);
                        sessionStorage.setItem("afm",afm);
                        sessionStorage.setItem("role",res.role);
                        window.location = this.props.redirPage;
                    } );
                
            })
            .catch((error) => {
                var newState = Object.assign({},this.state);
                newState.message = "Υπάρχει κάποιο πρόβλημα με την υπηρεσία. Παρακαλώ προσπαθήστε αργότερα.";
                this.setState(newState);        
            });
        else
            window.location = this.props.redirPage;
    }

    render() {

        // /login as default endpoint, unless specified otherwise
        var endPoint = this.props.endPoint ? this.props.endPoint : "http://localhost:3001/api/login";

        // There are two possible ways of authentication: The user has to either provide their afm number or
        // their email and phone number. A full name is also required in both cases.
        var inputArray = []
        inputArray.push(<input id="fname-input" name="fname" type="text" placeholder="Όνομα" required />)
        inputArray.push(<input id="lname-input" name="lname" type="text" placeholder="Επώνυμο" required />)

        if( this.props.loginType === "1")   
            inputArray.push(<input id="afm-input" name="afm" type="text" placeholder="ΑΦΜ" required pattern="[0-9]{10}" maxLength="10" minLength="10" />)
        else
        {
            inputArray.push(<input id="email-input" name="email" type="email" placeholder="E-Mail" required  />)
            inputArray.push(<input id="telephone-input" name="tel" type="tel" placeholder="Τηλέφωνο" required />)
        }

        inputArray.push(<button id="submit-button" type="submit">  Είσοδος </button>)

        return(
            <div>
                <div>
                    <form onSubmit={(event) => {this.attemptLogin(endPoint); event.preventDefault();}}>
                        {inputArray}
                    </form>
                </div>
                <div>
                    <p>
                        Εναλλακτικά, 
                        <a href="/" >Συνδεθείτε Εδώ</a> 
                    </p>
                </div>
                <p className={this.state.messageClass}>{this.state.message}</p>
            </div>
        );
    }
}

export default Login;