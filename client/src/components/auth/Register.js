import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
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
                <div className="register">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="display-8 text-center">Sign Up</h3>
                        <p className="text-center">
                          Create your ExpoMan account
                        </p>
                        <form action="create-profile.html">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control form-control"
                              placeholder="Name"
                              name="name"
                              value={this.state.name}
                              onChange={this.onChange}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control form-control"
                              placeholder="Email Address"
                              name="email"
                              value={this.state.email}
                              onChange={this.onChange}
                            />
                            <small className="form-text text-muted">
                              This site uses Gravatar so if you want a profile
                              image, use a Gravatar email
                            </small>
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
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control form-control"
                              placeholder="Confirm Password"
                              name="password2"
                              value={this.state.password2}
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
                          Already hava an account ?<Link to="/login"> Log in</Link>
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

export default Register;
