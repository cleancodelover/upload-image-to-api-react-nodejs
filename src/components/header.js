import Login from "../Pages/login";
import SignUp from "../Pages/signup";
import Dashboard from "../Pages/dashboard";
import "../index.css";
// import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const PublicHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={"/sign-in"}>
          Video to Facebook
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-3">
              <Link className="btn btn-sm btn-primary" to={"/sign-in"}>
                Logout
              </Link>
            </li>
            <li className="nav-item mr-3">
              <Link className="btn btn-sm btn-primary" to={"/dashboard"}>
                Videos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-sm btn-primary" to={"/upload"}>
                Upload video to Facebook
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PublicHeader;
