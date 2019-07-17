import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
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

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      const newUser = {
        name,
        email,
        password,
        password2
      };
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        //converts to js object to json string
        const body = JSON.stringify(newUser);
        const res = await axios.post("/api/users", body, config);
        console.log(res.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

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

export default Register;
