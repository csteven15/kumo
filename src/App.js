import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/home';
import Menu from './components/menu';
import Gallery from './components/gallery';
import Contact from './components/contact';

const styles = {
  content: {
    marginTop: 70
  }
};

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <div style={styles.content}>
            <Route path="/" exact component={Home} />
            <Route path="/menu" exact component={Menu} />
            <Route path="/gallery" exact component={Gallery} />
            <Route path="/contact" exact component={Contact} />
          </div>
          
        </div>
      </Router>
    );
  }
}

export default App;
