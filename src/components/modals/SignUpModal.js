// import packages
import axios from "axios";

import { useState } from "react";

// import FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignUpModal = ({
  apiUrl,
  hideSignUpModal,
  setHideSignUpModal,
  setUser,
}) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(`${apiUrl}/user/signup`, {
        username: inputUsername,
        email: inputEmail,
        password: inputPassword,
      });
      setUser(response.data.token);
      setSuccessMessage(true);

      setTimeout(() => {
        setHideSignUpModal(true);
      }, 3000);

      setErrorMessage(false);
    } catch (error) {
      if (error.message === "Request failed with status code 409") {
        setErrorMessage(true);
      }
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
            name="name"
            placeholder="Name"
            value={inputUsername}
            onChange={(event) => {
              setInputUsername(event.target.value);
            }}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={inputEmail}
            onChange={(event) => {
              setInputEmail(event.target.value);
            }}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={inputPassword}
            onChange={(event) => {
              setInputPassword(event.target.value);
            }}
            required
          />
          {errorMessage === true && (
            <span
              style={{
                color: "red",
                marginBottom: "10px",
              }}
            >
              An account already exist !
            </span>
          )}
          {successMessage === true && (
            <span
              style={{
                color: "green",
                marginBottom: "10px",
              }}
            >
              Congratulations !
            </span>
          )}
          <button
            className="btn red-btn"
            type="submit"
            /* onClick={() => setHideSignUpModal(true)} */
          >
            REGISTER
          </button>
        </form>
        {/*         <Link
          to="/login"
          className="link-account"
          onClick={() => {
            setHideSignUpModal(true);
            setHideLoginModal(false);
          }}
        >
          You have an account ? Login !
        </Link> */}
      </section>
    </div>
  );
};

export default SignUpModal;
