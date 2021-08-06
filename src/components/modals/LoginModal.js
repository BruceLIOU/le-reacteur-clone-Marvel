// import packages
import axios from "axios";
import { useState } from "react";

// import FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginModal = ({ hideLoginModal, setHideLoginModal, setUser, apiUrl }) => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(`${apiUrl}/user/login`, {
        email: inputEmail,
        password: inputPassword,
      });
      setUser(response.data.token);
      setHideLoginModal(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="modal-container"
      style={{ display: hideLoginModal ? "none" : "block" }}
    >
      <section className="login-section">
        <div
          onClick={() => {
            setHideLoginModal(true);
          }}
        >
          <FontAwesomeIcon icon="times-circle" />
        </div>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(event) => {
              setInputEmail(event.target.value);
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => {
              setInputPassword(event.target.value);
            }}
          />
          <button
            className="btn red-btn"
            type="submit"
            onClick={() => setHideLoginModal(true)}
          >
            SIGN IN
          </button>
        </form>
      </section>
    </div>
  );
};

export default LoginModal;
