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
import Comic from "./containers/Comic";
import Favorites from "./containers/Favorites";

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

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 365,
        sameSite: "none",
        secure: true,
      }); // authentifier le user quand on en a besoin
      setUserToken(token); // changer un state, donc provoquer un rafraichissement et donc modifier l'affichage dans Header
    } else {
      Cookies.remove("userToken"); // suppression du Cookie 'userToken'
      setUserToken(null);
    }
  };

  return (
    <div className="container">
      <Router>
        <Header
          userToken={userToken}
          setUserToken={setUserToken}
          setValue={setValue}
          apiUrl={apiUrl}
          setUser={setUser}
        />
        <Switch>
          <Route exact path="/comics">
            <Comics value={value} apiUrl={apiUrl} />
          </Route>
          <Route exact path="/comic/:id">
            <Comic value={value} apiUrl={apiUrl} />
          </Route>
          <Route exact path="/characters">
            <Characters value={value} apiUrl={apiUrl} />
          </Route>
          <Route exact path="/favorites">
            <Favorites setUser={setUser} apiUrl={apiUrl} />
          </Route>
          <Route exact path="/">
            <Home value={value} setData={setValue} apiUrl={apiUrl} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
