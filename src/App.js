// import CSS
import "./assets/css/App.scss";

// import Component/Package React
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import containers first
import Home from "./containers/Home";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import Favorites from "./containers/Favorites";
import Signup from "./containers/Signup";
import Login from "./containers/Login";

// Then import components
import Header from "./components/Header";
import Footer from "./components/Footer";

// import Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretLeft,
  faCaretRight,
  faTimesCircle,
  faSearch,
  faPlusCircle,
  faCheckCircle,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faCaretLeft,
  faCaretRight,
  faTimesCircle,
  faSearch,
  faPlusCircle,
  faCheckCircle,
  faHeart
);

const apiUrl = "http://localhost:3001";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Header />
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/comics">
            <Comics apiUrl={apiUrl} />
          </Route>
          <Route path="/characters">
            <Characters apiUrl={apiUrl} />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
