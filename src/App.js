import './App.css';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import {Banner, BannerLink} from './components/Banner';
import Appointment from "./components/Appointment";
import Login from "./components/Login";
import {ReportLink, ReportPage} from './components/Report';
import {ChoicesLink, ChoicesPage} from './components/Epiloges';
import {Contact, Terms, About} from './components/FooterLinks';
import Register from "./components/Register";
import Anastoli from "./components/Anastoli";
import Workschedule from "./components/Workschedule";

function App() {

  // TODO: In /test route: add roleid in  sessionstorage & query whether the user role is employer instead of just checking for afm != null
  return (
    <div className="App">
      <Router>
        <Header />

        <Route exact={true} path="/">
          <Home />
          <Banner />
        </Route>

        <Route exact={true} path="/anastoli">
          {sessionStorage.getItem("afm") 
            ? ( (sessionStorage.getItem("role") === "1") ? <Anastoli /> : <Redirect to="/"/> )
            : <Login loginType="1" redirPage="/anastoli" />}
        </Route>

        <Route exact={true} path="/workschedule">
          {sessionStorage.getItem("afm") 
              ? ( sessionStorage.getItem("role") === "1" ? <Workschedule /> : <Redirect to="/"/> )
              : <Login loginType="1" redirPage="/anastoli" />}
        </Route>

        <Route exact={true} path="/register" render={() => sessionStorage.getItem("afm") ? <Redirect to="/"/> : <Register /> }/>
        <Route exact={true} path="/login" render={() => sessionStorage.getItem("afm") ? <Redirect to="/"/> : <Login loginType="1" redirPage="/" /> }/>

        <Route exact={true} path="/appointment" component={Appointment} />
        <Route exact={true} path="/covid19info" component={BannerLink} />
        <Route exact={true} path="/contact" component={Contact} />
        <Route exact={true} path="/report" component={ReportPage}/>
        <Route exact={true} path="/choices" component={ChoicesPage}/>
        <Route exact={true} path="/terms" component={Terms}/>
        <Route exact={true} path="/about" component={About}/>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
