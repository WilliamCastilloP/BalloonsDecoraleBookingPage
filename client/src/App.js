import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import Navbar from "./components/Navbar";
import GlobalStyles from "./components/GlobalStyles";

function App(props) {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Navbar />
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
        <Route exact path="/booking">
          booking
        </Route>
        <Route exact path="/signin">
          Sign In page
        </Route>
        <Route exact path="/confirmation">
          confirmation
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
