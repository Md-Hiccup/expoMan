import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing" >
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Expense Manager</h1>
                <p className="lead">
                  {" "}
                  Looking for an expense and budget tool? Stop searching.
                  Expense Manager is simple, intuitive, stable and web app that
                  is just designed for you. Everything you need at your
                  fingertips to manage the expenditures, shopping list and
                  budgets.
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
                {/* <a href="register.html" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </a>
                <a href="login.html" className="btn btn-lg btn-light">
                  Login
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
