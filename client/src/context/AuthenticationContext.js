import { createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthenticationContext = createContext(null);

const Auth0ContextProvider = ({ children }) => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();
  const admin = "auth0|62f19d51c0c6c7196cf528d3";

  let isAdmin = false;
  if (user?.sub == admin) {
    isAdmin = true;
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        error,
        user,
        loginWithRedirect,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default Auth0ContextProvider;
