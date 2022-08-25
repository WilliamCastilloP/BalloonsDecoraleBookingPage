import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import SignInPage from "./pages/SignInPage";
import BookingPage from "./pages/BookingPage";
import UpdatePage from "./pages/UpdatePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EventsPage from "./pages/EventsPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import UserBookedDecoration from "./pages/UserBookedDecoration";
import GlobalStyles from "./components/GlobalStyles";
import styled from "styled-components";
import "../src/calendar.css";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import Auth0ContextProvider from "./context/AuthenticationContext";
import ProtectedRoute from "./auth/protected-route";

function App(props) {
  return (
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <Auth0ContextProvider>
          <GlobalStyles />
          <Navbar />
          <Wrapper>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/gallery">
                <GalleryPage />
              </Route>
              <Route exact path="/about">
                {/* TODO AboutPage */}
              </Route>
              <ProtectedRoute
                exact
                path="/booking/:imageId"
                component={BookingPage}
              />
              <Route exact path="/signin">
                <SignInPage />
              </Route>
              <ProtectedRoute
                exact
                path="/confirmation"
                component={ConfirmationPage}
              />
              <ProtectedRoute exact path="/all-events" component={EventsPage} />
              <ProtectedRoute
                exact
                path="/events/:eventId"
                component={UpdatePage}
              />
              <ProtectedRoute
                exact
                path="/booked-decoration"
                component={UserBookedDecoration}
              />
            </Switch>
          </Wrapper>
          <Footer />
        </Auth0ContextProvider>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  align-content: space-between;
  min-height: 78vh;
`;

export default App;
