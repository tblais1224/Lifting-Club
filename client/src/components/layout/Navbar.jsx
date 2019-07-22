import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

//pulls out isAuth and loading from auth prop
const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/workouts">Workouts</Link>
      </li>
      <li>
        <Link to="/diets">Diets</Link>
      </li>
      <li>
        <Link to="/plans">Plans</Link>
      </li>
      <li>
        <Link to="/members">Members</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"/>{' '}
          <span className="hide-sm">Dashboard</span></Link>
      </li>
      <li>
        <a href="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/workouts">Workouts</Link>
      </li>
      <li>
        <Link to="/diets">Diets</Link>
      </li>
      <li>
        <Link to="/plans">Plans</Link>
      </li>
      <li>
        <Link to="/members">Members</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <img
            className="nav-icon"
            src={require("../../img/liftingClubLogo.jpg")}
            alt="logo not found"
          />{" "}
          LiftingClub
        </Link>
      </h1>
      {/* if loading is false, perform the action. (similar ternary) */}
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
