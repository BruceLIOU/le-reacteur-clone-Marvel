// import packages
import axios from "axios";
import { useState } from "react";

// import FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginModal = ({
  hideLoginModal,
  setHideLoginModal,
  currentUser,
  apiUrl,
}) => {
  const [values, setValues] = useState({});

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(`${apiUrl}/user/login`, {
        email: values.email,
        password: values.password,
      });
      currentUser(response.data.token);
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
            onChange={(event) => {
              const obj = { ...values };
              obj.email = event.target.value;
              setValues(obj);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => {
              const obj = { ...values };
              obj.password = event.target.value;
              setValues(obj);
            }}
          />
          <button
            className="red-btn"
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
