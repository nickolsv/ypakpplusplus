import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Navbar />

        <Route exact={true} path="/">
          <Home />
        </Route>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
