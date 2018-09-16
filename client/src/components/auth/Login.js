import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landign-inner">
          <div className="form">
            <div className="card">
              <div className="card-body">
                <div className="login">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="display-8 text-center">Log In</h3>
                        <p className="text-center">
                          Sign in to your ExpoMan account
                        </p>
                        <form action="dashboard.html">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control form-control"
                              placeholder="Email Address"
                              name="email"
                              value={this.state.email}
                              onChange={this.onChange}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control form-control"
                              placeholder="Password"
                              name="password"
                              value={this.state.password}
                              onChange={this.onChange}
                            />
                          </div>
                          <input
                            type="submit"
                            className="btn btn-info btn-block mt-4"
                          />
                        </form>
                        <p
                          className="text-center"
                          style={{ marginTop: "2rem" }}
                        >
                          New to ExpoMan ?<Link to="/register"> Sign up now</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
