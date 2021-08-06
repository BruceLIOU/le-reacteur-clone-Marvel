import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({ modal, setModal, setUser, apiUrl }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalLogin, setModalLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitSignup = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(`${apiUrl}/user/signup`, {
        username: username,
        email: email,
        password: password,
      });
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmitLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(`${apiUrl}/user/login`, {
        email: email,
        password: password,
      });
      setUser(response.data.token);
      setErrorMessage(false);
      setModal(false);
    } catch (error) {
      setErrorMessage(true);
      console.log(error.response);
    }
  };

  return modalLogin ? (
    <div
      className={modal === false ? "hidden" : "modal-container"}
      style={{ display: modal === false ? "none" : "block" }}
    >
      <section className="login-section">
        <div
          onClick={() => {
            setModal(false);
          }}
        >
          <FontAwesomeIcon icon="times-circle" />
        </div>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmitLogin}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          {errorMessage === true && (
            <span
              style={{
                color: "lightgrey",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            >
              Email or password is not correct
            </span>
          )}
          <input type="submit" />
        </form>
      </section>
    </div>
  ) : (
    <div
      className={modal === false ? "hidden" : "modal-container"}
      style={{ display: modal === false ? "none" : "block" }}
    >
      <section className="login-section">
        <div
          onClick={() => {
            setModal(false);
          }}
        >
          <FontAwesomeIcon icon="times-circle" />
        </div>
        <h1>REGISTER</h1>
        <form onSubmit={handleSubmitSignup}>
          <h2>CREATE YOUR ACCOUNT</h2>
          <span>
            You have an account ? Please click{" "}
            <span
              style={{ color: "red" }}
              onClick={() => {
                setModalLogin(true);
              }}
            >
              here
            </span>
          </span>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <button
            className="red-btn"
            type="submit"
            name="submit"
            /* onClick={() => setModal(false)} */
          >
            CREATE
          </button>
        </form>
      </section>
    </div>
  );
};

export default Modal;
