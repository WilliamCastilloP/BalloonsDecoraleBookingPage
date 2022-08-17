import { createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthenticationContext = createContext(null);

// Let's create a Authentication context to make all variables accesibles through the app
const Auth0ContextProvider = ({ children }) => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();

  //This is the Admin credential that will authorise certain pages
  const admin = process.env.REACT_APP_ADMIN_SUB;
  let isAdmin = false;
  // check if the user is indeed the admin and then we set it IsAdmin to true
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
