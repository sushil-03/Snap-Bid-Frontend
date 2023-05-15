import React from "react";
import { Fragment } from "react";
import { ReactNode, FC } from "react";
import Navbar from "../molecules/Navbar";
import Footer from "../molecules/Footer";

const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <title>Bid Connect</title>
      <div className="relative w-full pb-4 mx-auto overflow-hidden md:w-11/12 ">
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </Fragment>
  );
};

export default MainContainer;
