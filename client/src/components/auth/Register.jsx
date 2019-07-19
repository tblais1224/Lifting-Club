import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from 'prop-types'


//instead of passing props in, destructure the props to get only setAlert
const Register = ({ setAlert, register, isAuthenticated }) => {
  //react hook
  //formData will be the same as state = { formData: "" }
  //setformdata will be the this.setState({formData: values})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    //same as set state, create new copy of formData and update name field with corrosponding value
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      //pass message and alertType
      setAlert("Passwords do not match", "danger");
    } else {
      const newUser = {
        name,
        email,
        password,
        password2
      };
      register(newUser)
    }
  };


  //redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            autoComplete="name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            autoComplete="email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={e => onChange(e)}
            value={password}
            minLength="6"
            autoComplete="new-password"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            onChange={e => onChange(e)}
            value={password2}
            minLength="6"
            autoComplete="new-password"
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
//first param in connect is any state you want to pass, then it takes in any actions
export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
