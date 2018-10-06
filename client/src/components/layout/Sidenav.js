import React, { Component } from "react";
import { Link } from "react-router-dom";
class Sidenav extends Component {
  render() {
    return (
      <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <i className="fas fa-home" />
                {"   "}
                Dashboard <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <i className="fas fa-file" />
                {"   "}
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <i className="fas fa-cart-plus" />
                {"   "}
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <i className="fas fa-poll" />
                {"   "}
                Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <i className="fas fa-align-justify" />
                {"   "}
                Integrations
              </Link>
            </li>
          </ul>

          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Saved reports</span>
            {/* <a className="d-flex align-items-center text-muted" href="#"> */}
            {/* <span data-feather="plus-circle" /> */}
            {/* </a> */}
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <span data-feather="file-text" />
                Current month
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <span data-feather="file-text" />
                Last quarter
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <span data-feather="file-text" />
                Yearly
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Sidenav;
