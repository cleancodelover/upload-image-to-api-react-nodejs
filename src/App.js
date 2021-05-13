import logo from "./logo.svg";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./Pages/login";
import SignUp from "./Pages/signup";
import Dashboard from "./Pages/dashboard";
import Upload from "./Pages/upload";
import Video from "./Pages/video";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/sign-in" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/upload" component={Upload} />
          <Route path="/video/:id" component={Video} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
