import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/home';
import Menu from './components/menu';
import Gallery from './components/gallery';
import Contact from './components/contact';
import Footer from './components/footer';

const styles = {
  container: {
    overflow: 'hidden'
  },
  content: {
    marginTop: 60
  }
};

class App extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Router>
          <div className="App">
            <Navigation />
            <div style={styles.content}>
              <Route path="/" exact component={Home} />
              <Route path="/menu" exact component={Menu} />
              <Route path="/gallery" exact component={Gallery} />
              <Route path="/contact" exact component={Contact} />
            </div>
            <Footer />
            
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
