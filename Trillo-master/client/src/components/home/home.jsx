import React from "react";
import { Route } from "react-router-dom";

import NavBar from "../nav/nav_bar";
import HomeContent from "./home-content";

import "./home.css";

function Home() {
  return (
    <div className="home">
      <NavBar />
      {/* <HomeContent /> */}
      <Route path="/" component={HomeContent} />
    </div>
  );
}
// home content has access to this.props.history.push now because we added a router
export default Home;
