import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
        <div className="container">
          <Link to={"/"} className="navbar-brand text-white">
            <i className="fa fa-mobile text-warning">
              User <span className="text-warning">Contact Manager</span>
            </i>
          </Link>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
