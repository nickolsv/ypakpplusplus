import React, { Component } from 'react';

class Login extends Component {

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

    render() {

        // /login as default endpoint, unless specified otherwise
        var endPoint = this.props.endPoint ? this.props.endPoint : "/login";

        // There are two possible ways of authentication: The user has to either provide their afm number or
        // their email and phone number. A full name is also required in both cases.
        var inputArray = []
        inputArray.push(<input id="fname-input" type="text" placeholder="Όνομα" required />)
        inputArray.push(<input id="lname-input" type="text" placeholder="Επώνυμο" required />)

        if( this.props.loginType === "1")   
            inputArray.push(<input id="afm-input" type="text" placeholder="ΑΦΜ" required pattern="[0-9]{10}" maxLength="10" minLength="10" />)
        else
        {
            inputArray.push(<input id="email-input" type="email" placeholder="E-Mail" required  />)
            inputArray.push(<input id="telephone-input" type="tel" placeholder="Τηλέφωνο" required />)
        }

        inputArray.push(<input type="submit"/>)

        return(
            <div>
                <div>
                    <form action={endPoint} method="post">
                        {inputArray}
                    </form>
                </div>
                <div>
                    <p>
                        Εναλλακτικά, 
                        <a href="/" >Συνδεθείτε Εδώ</a> 
                    </p>
                </div>
            </div>
        );
    }
}

export default Login;