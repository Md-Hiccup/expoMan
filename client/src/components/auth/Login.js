import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(user);

    axios
      .post("/api/users/login", user)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;

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
                        <form onSubmit={this.onSubmit}>
                          <div className="form-group">
                            <input
                              type="email"
                              className={classnames(
                                "form-control form-control-lg",
                                {
                                  "is-invalid": errors.email
                                }
                              )}
                              placeholder="Email Address"
                              name="email"
                              value={this.state.email}
                              onChange={this.onChange}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              className={classnames(
                                "form-control form-control-lg",
                                {
                                  "is-invalid": errors.password
                                }
                              )}
                              placeholder="Password"
                              name="password"
                              value={this.state.password}
                              onChange={this.onChange}
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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
                          New to ExpoMan ?
                          <Link to="/register"> Sign up now</Link>
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
