import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import "./App.css";

import Particles from "react-particles-js";

const particleOpt = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    shape: {
      type: "polygon"
    },
    size: {
      value: 2
    },
    move: {
      speed: 10
    }
  },
  interactivity: {
    onhover: {
      enable: true
    }
  }
};

class App extends Component {
  render() {
    return (
      <Router>
        <div>
					<Navbar />
          <Route exact path="/" component={Landing} />
					<div className="container">
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
					</div>	
          <Particles params={particleOpt} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
