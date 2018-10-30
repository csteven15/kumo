import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from 'react-router';
import Home from './components/home';
import Menu from './components/menu';
import Gallery from './components/gallery';
import Contact from './components/contact';
import AdminPage from './components/AdminPage';
import Footer from './components/footer';

const styles = {
  container: {
    overflow: 'visible'
  },
  content: {
    marginTop: 60
  }
};

document.body.style.backgroundColor = "#ffffff";
document.body.style.overflowX = "hidden";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <div style={styles.content}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/menu" exact component={Menu} />
              <Route path="/gallery" exact component={() => <div style={{width: "80%", margin: "auto"}}><Gallery title={true} style={{width: "80%"}} /></div>} />
              <Route path="/contact" exact component={Contact} />
              <Route path="/admin" exact component={AdminPage} />
              <Route exact component={Home} />
            </Switch>
          </div>
          <Footer />

        </div>
      </Router>
    );
  }
}

export default App;
