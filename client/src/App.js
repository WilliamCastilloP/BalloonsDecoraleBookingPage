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
import GlobalStyles from "./components/GlobalStyles";
import styled from "styled-components";

function App(props) {
  return (
    <BrowserRouter>
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
          <Route exact path="/gallery/:imageId">
            Image details
          </Route>
          <Route exact path="/booking/:imageId">
            <BookingPage />
          </Route>
          <Route exact path="/signin">
            <SignInPage />
          </Route>
          <Route exact path="/confirmation">
            confirmation
          </Route>
          <Route exact path="/events">
            <EventsPage />
          </Route>
          <Route exact path="/events/:eventId">
            <UpdatePage />
          </Route>
        </Switch>
        <Footer />
      </Wrapper>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
`;

export default App;
