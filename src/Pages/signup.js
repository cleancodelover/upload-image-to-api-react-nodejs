import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PublicHeader from "../components/public-header";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (firstName && lastName && username && password) {
      const data = new FormData();
      data.append("firstName", firstName);
      data.append("lastName", lastName);
      data.append("username", username);
      data.append("password", password);

      axios
        .post("http://localhost:4700/create-user", data)
        .then((res) => {
          alert(res.result);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("All fields are required");
    }
  };

  return (
    <>
      <PublicHeader />
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control"
                placeholder="First name"
              />
            </div>

            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                className="form-control"
                placeholder="Last name"
              />
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input
                id="username"
                value={username}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                id="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Sign Up
            </button>
            <p className="forgot-password text-right">
              Already registered <a href="#">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
