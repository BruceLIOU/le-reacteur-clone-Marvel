// import CSS
import "./assets/css/App.scss";

// import Component/Package React
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

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

/* const apiUrl = "http://localhost:3001"; */
const apiUrl = "https://clone-marvel-backend.herokuapp.com";

const App = () => {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [value, setValue] = useState("");

  const currentUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 365, // expires : 1 year
        sameSite: "none",
        secure: true,
      });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <div className="container">
      <Router>
        <Header
          userToken={userToken}
          currentUser={currentUser}
          setValue={setValue}
          apiUrl={apiUrl}
        />
        <Switch>
          <Route path="/signup">
            <Signup currentUser={currentUser} apiUrl={apiUrl} />
          </Route>
          <Route path="/login">
            <Login currentUser={currentUser} apiUrl={apiUrl} />
          </Route>
          <Route path="/comics">
            <Comics value={value} apiUrl={apiUrl} />
          </Route>
          <Route path="/characters">
            <Characters value={value} apiUrl={apiUrl} />
          </Route>
          <Route path="/favorites">
            <Favorites currentUser={currentUser} apiUrl={apiUrl} />
          </Route>
          <Route path="/">
            <Home value={value} setData={setValue} apiUrl={apiUrl} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
