import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import SignInPage from "./pages/SignInPage";
import BookingPage from "./pages/BookingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
          <Route path="/gallery">
            <GalleryPage />
          </Route>
          <Route path="/gallery/:imageId">Image details</Route>
          <Route path="/booking/:imageId">
            <BookingPage />
          </Route>
          <Route path="/signin">
            <SignInPage />
          </Route>
          <Route path="/confirmation">confirmation</Route>
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
