import React, { useEffect } from "react";
import { Fragment } from "react";
import { ReactNode } from "react";
import Navbar from "../molecules/Navbar";
import Footer from "../molecules/Footer";
import { ThemeProvider, createTheme } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

import { useSelectedUser } from "@/hooks/state/useAppState";
import Cookies from "universal-cookie";

const MainContainer = ({ children }: { children: ReactNode }) => {
  const cookie = new Cookies();
  const [_, setUser] = useSelectedUser();

  useEffect(() => {
    const response = cookie.get("authorization");
    if (response) {
      setUser({
        name: response.user.firstname,
        _id: response.user._id,
        token: response.token,
        avatar: response.user.avatar,
        address: response.user.address,
        selectedAddress: response.user.selectedAddress,
      });
    }
  }, []);
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
        <div className="relative w-full pb-8 mx-auto overflow-hidden bg-[#f6f6f6]">
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />
        <Toaster position="bottom-center" reverseOrder={false} />

        {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        /> */}
      </ThemeProvider>
    </Fragment>
  );
};

export default MainContainer;
