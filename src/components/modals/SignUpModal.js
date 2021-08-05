// import packages
import axios from "axios";

import { useState } from "react";

// import FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignUpModal = ({
  hideSignUpModal,
  setHideSignUpModal,
  currentUser,
  apiUrl,
}) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/user/signup`, {
        username: inputUsername,
        email: inputEmail,
        password: inputPassword,
      });
      currentUser(response.data.token);
      setHideSignUpModal(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="modal-container"
      style={hideSignUpModal ? { display: "none" } : { display: "block" }}
    >
      <section className="login-section">
        <div
          onClick={() => {
            setHideSignUpModal(true);
          }}
        >
          <FontAwesomeIcon icon="times-circle" />
        </div>
        <h1>CREATE YOUR ACCOUNT</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={inputUsername}
            onChange={(event) => {
              setInputUsername(event.target.value);
            }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={inputEmail}
            onChange={(event) => {
              setInputEmail(event.target.value);
            }}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={inputPassword}
            onChange={(event) => {
              setInputPassword(event.target.value);
            }}
            required
          />

          <button
            className="red-btn"
            type="submit"
            onClick={() => setHideSignUpModal(true)}
          >
            CREATE AN ACCOUNT
          </button>
        </form>
      </section>
    </div>
  );
};

export default SignUpModal;
