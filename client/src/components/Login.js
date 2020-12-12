import React, { useState } from "react";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCredentials({
      username: "",
      password: "",
    });
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form>
        <input
          name="username"
          placeholder="Enter username"
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
    </div>
  );
};

export default Login;
