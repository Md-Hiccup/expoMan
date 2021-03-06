import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import Particles from "../auth/Particles";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      // <div className="landing">
        // {/* <Particles /> */}
        // <div className="dark-overlay landing-inner text-light">
          <div className="container text-light mb-5">
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
        // </div>
      // </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
