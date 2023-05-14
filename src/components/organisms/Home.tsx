import { useRouter } from "next/router";
import React from "react";
import { Fragment } from "react";
import Navbar from "../molecules/Navbar";
const Home = () => {
  const router = useRouter();

  return (
    <Fragment>
      <Navbar />
    </Fragment>
  );
};

export default Home;
