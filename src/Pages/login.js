import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import PublicHeader from "../components/public-header";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password && username) {
      // const data = new FormData();
      // data.append("password", password);
      // data.append("username", username);

      const data = {
        password: password,
        username: username,
      };

      axios
        .post("http://localhost:4700/login", data)
        .then((res) => {
          console.log(res.data.token);
          if (res.data.success > 0) {
            setPassword("");
            setUsername("");
            history.push("/dashboard");
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => alert(err));
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
            <h3>Sign In</h3>
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
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>

      <div id="container">
        <video id="video" playsinline autoplay muted></video>
        <video id="recorder" playsinline autoplay muted></video>

        <button onclick="return triumphantWebRTC.startVideo(); ">
          Start Camera
        </button>
        <button onclick="return triumphantWebRTC.startRecording(); ">
          Record
        </button>
        <button onclick="return triumphantWebRTC.stopRecording(); ">
          Stop
        </button>
        <button onclick="return triumphantWebRTC.playVideo('recorder'); ">
          Play
        </button>
        <button onclick="return triumphantWebRTC.downloadVideo(); ">
          Download
        </button>
        <button onclick="return triumphantWebRTC.startStreamingToFacebook({ access_token: 'hjhuhuhiuhfuhef' }); ">
          Stream to Facebook
        </button>
      </div>
    </>
  );
};

export default Login;
