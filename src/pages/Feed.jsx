import React from "react";
import Nav from "../components/Nav";
import Main from "../components/Main";
import Aside from "./../components/Aside";

const Feed = () => {
  return (
    <div className="bg-black text-white min-h-[100vh] overflow-y-hidden">
      <div className="grid grid-cols-5">
        <Nav />

        <Main />

        {/* <Aside /> */}
      </div>
    </div>
  );
};

export default Feed;
