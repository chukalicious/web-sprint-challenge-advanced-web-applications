import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const history = useHistory();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", credentials)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.payload));
        history.push("/api/colors");
      })
      .catch((err) => {
        setError(err.message);
      });
    setCredentials({
      username: "",
      password: "",
    });
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={login}>
        <input
          name="username"
          placeholder="Enter Username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Enter Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
      {error.length > 0 ? <p>The username or password are incorrect</p> : null}
    </div>
  );
};

export default Login;
