import React from "react";
import {Link} from "react-router-dom"

const Navbar = () => {
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
    </nav>
  );
};

export default Navbar;
