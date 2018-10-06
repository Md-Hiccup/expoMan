import React, { Component } from "react";
import Sidenav from "../layout/Sidenav";

class Dashboard extends Component {
  render() {
    return (
      <div className="conatiner-fluid">
        <div className="row mr-0">
          <Sidenav />
          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h2 className="text-light">Welcome to Dashboard</h2>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Dashboard;
