import './App.css';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import {Banner, BannerLink} from './components/Banner';
import Appointment from "./components/Appointment";
import Login from "./components/Login";
import { ReportPage} from './components/Report';
import { ChoicesPage} from './components/Epiloges';
import {Contact, Terms, About} from './components/FooterLinks';
import Register from "./components/Register";
import Anastoli from "./components/Anastoli";
import Workschedule from "./components/Workschedule";
import Calendar from './components/Calendar';
import Profilepage from './components/Profilepage';
import CovidPage from './components/CovidPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Route exact={true} path="/">
          <Banner />
        </Route>

        <div className="content">

          <Route exact={true} path="/anastoli">
            {sessionStorage.getItem("afm") 
              ? ( (sessionStorage.getItem("role") === "1") ? <Anastoli /> : <Redirect to="/"/> )
              : <Login loginType="1" redirPage="/anastoli" />}
          </Route>

          <Route exact={true} path="/workschedule">
            {sessionStorage.getItem("afm") 
                ? ( sessionStorage.getItem("role") === "1" ? <Workschedule /> : <Redirect to="/"/> )
                : <Login loginType="1" redirPage="/workschedule" />}
          </Route>

          <Route exact={true} path="/register" render={() => sessionStorage.getItem("afm") ? <Redirect to="/"/> : <Register /> }/>
          <Route exact={true} path="/login" render={() => sessionStorage.getItem("afm") ? <Redirect to="/"/> : <Login loginType="1" redirPage="/" /> }/>
          <Route exact={true} path="/calendar" render={() => !sessionStorage.getItem("afm") ? <Redirect to="/"/> : <Calendar type="none" afm={sessionStorage.getItem("afm")} displaySchedule={true} dateSelector={() => {}} /> }/>
          <Route exact={true} path="/profilepage" render={() => !sessionStorage.getItem("afm") ? <Redirect to="/"/> : <Profilepage /> }/>

          <Route exact={true} path="/appointment" component={Appointment} />
          <Route exact={true} path="/covid19info" component={BannerLink} />
          <Route exact={true} path="/contact" component={Contact} />
          <Route exact={true} path="/report" component={ReportPage}/>
          <Route exact={true} path="/choices" component={ChoicesPage}/>
          <Route exact={true} path="/covidpage" component={CovidPage}/>
          <Route exact={true} path="/terms" component={Terms}/>
          <Route exact={true} path="/about" component={About}/>

        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
