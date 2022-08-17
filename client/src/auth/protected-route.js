import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

// We create a Protected Route component to replace those pages that need to be protected before login
const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <div>Loading...</div>,
    })}
    {...args}
  />
);

export default ProtectedRoute;
