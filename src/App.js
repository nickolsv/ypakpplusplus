import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import {Contact, Terms, About} from './components/FooterLinks';
import Calendar from './components/ProfileLinks';
import {Banner,BannerLink} from './components/Banner';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Navbar />

        <Route exact={true} path="/">
          <Home />
          <Banner/>
        </Route>
        
        <Route path="/contact" component={Contact}/>
        <Route path="/about" component={About}/>
        <Route path="/terms" component={Terms}/>
        <Route path="/calendar" component={Calendar}/>
        <Route path="/covid19info" component={BannerLink}/>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
