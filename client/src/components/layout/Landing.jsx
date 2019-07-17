import React from "react";
import {Link} from "react-router-dom"

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Lifting Club</h1>
          <p className="lead">
            View or create your own workouts, diets and fitness plans, all while sharing
            feedback and getting help from other fitness enthusiasts.
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
