import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props) => {
  const { children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (localStorage.getItem("token")) {
          return children;
        } else {
          return <Redirect to={{ pathname: "/", state: { from: location } }} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
