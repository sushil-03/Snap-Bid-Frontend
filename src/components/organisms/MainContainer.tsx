import React from "react";
import { Fragment } from "react";
import { ReactNode, FC } from "react";
import Navbar from "../molecules/Navbar";
import Footer from "../molecules/Footer";
import { ThemeProvider, createTheme } from "@mui/material";

const MainContainer = ({ children }: { children: ReactNode }) => {
  const theme = createTheme({
    palette: {
      primary: {
        contrastText: "rgb(126 34 206)",
        main: "rgb(126 34 206)",
      },
      secondary: {
        main: "#edf2ff",
      },
    },
  });
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <title>Bid Connect</title>
        <div className="relative w-full pb-4 mx-auto overflow-hidden ">
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />
      </ThemeProvider>
    </Fragment>
  );
};

export default MainContainer;
