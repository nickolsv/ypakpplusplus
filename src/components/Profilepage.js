import React, { Component } from 'react';
import {serverAddress} from  '../imports/global'

class Profilepage extends Component {
    state = {
        fname: "",
        lname: "",
        afm: null,
        companyname: "",
        email: "",
        tel: "",
        role: "",
        message: "",
    }


    componentDidMount()
    {
        fetch( serverAddress + "/api/getuserdata/" + sessionStorage.getItem("afm"))
        .then(
            (result) => result.json()
        )
        .then( (res) => {
            var newState = Object.assign({},this.state);
            newState.fname = res.firstname;
            newState.lname = res.lastname;
            newState.afm = sessionStorage.getItem("afm");
            newState.companyname = res.companyname;
            newState.email = res.email;
            newState.tel = res.tel;
            newState.role = res.roleid;

            this.setState(newState);
        })
    }

    updateData()
    {
        var mail = document.getElementById("email").value;
        var tel = document.getElementById("telephone").value;
        var role = document.getElementById("role").value;

        fetch( serverAddress + "/api/setuserdata/" + sessionStorage.getItem("afm") + "/" + mail + "/" + tel + "/" + role, {
            method: "POST"
        })
        .then(
            (result) => {
                if( result.status === 200 )
                {
                    var newState = Object.assign({},this.state);
                    newState.message = "Οι αλλαγές πραγματοποιήθηκαν με επιτυχία."
                    this.setState(newState);
                }
            })
            .catch((error) => {
                var newState = Object.assign({},this.state);
                newState.message = "Παρουσιάστηκε κάποιο σφάλμα, παρακαλώ δοκιμάστε αργότερα."
                this.setState(newState);        
            });
    }


    render()
    {
        

        return(
            <div>
                <p>{this.state.fname}</p>
                <p>{this.state.lname}</p>
                <p>{this.state.afm}</p>
                <p>{this.state.companyname}</p>
                <input type="text" id="email" defaultValue={this.state.email} />
                <input type="text" id="telephone" defaultValue={this.state.tel} />
                <select name="role" id="role">
                    <option value={0} selected={this.state.role === 0}>Εργαζόμενος</option>
                    <option value={1} selected={this.state.role === 1}>Εργοδότης</option>
                </select>
                <button onClick={() => this.updateData()}>Αποστολή Αλλαγών</button>

                <p>{this.state.message}</p>
            </div>)
    }
}

export default Profilepage;