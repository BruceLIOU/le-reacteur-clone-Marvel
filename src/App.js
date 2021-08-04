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
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faCaretLeft,
  faCaretRight,
  faTimesCircle,
  faSearch,
  faPlusCircle,
  faCheckCircle
);

const App = () => {
  // Backend URL
  const apiUrl = "https://clone-vinted-backend.herokuapp.com";
  const [hash, setHash] = useState(Cookies.get("hash") || null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const currentUser = (hash) => {
    if (hash) {
      // LogIn => create a cookie
      Cookies.set("hash", hash, {
        expires: 365, // expires : 1 year
        sameSite: "none",
        secure: true,
      });
      setHash(hash);
    } else {
      // LogOut => remove the cookie
      Cookies.remove("hash");
      setHash(null);
    }
  };
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
