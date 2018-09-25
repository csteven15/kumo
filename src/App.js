import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/home';
import Menu from './components/menu';
import Gallery from './components/gallery';
import Contact from './components/contact';
import Footer from './components/footer';
import Login from './components/login';

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
      <Router>
        <div className="App">
          <Navigation />
          <div style={styles.content}>
            <Route path="/" exact component={Home} />
            <Route path="/menu" exact component={Menu} />
            <Route path="/gallery" exact component={Gallery} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/admin" exact component={Login} />
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
