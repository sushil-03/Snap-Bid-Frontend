import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const Loader = ({ height = "500px", width = "500px" }) => {
  return (
    <div className="mt-32">
      <Player
        autoplay
        loop
        src="https://assets10.lottiefiles.com/packages/lf20_usiohiuz.json"
        style={{ height: height, width: width, scale: 4 }}
      >
        <Controls
          visible={false}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player>
    </div>
    // <div className="flex justify-center">

    //   <span className="circle animate-loader"></span>
    //   <span className="circle animate-loader animation-delay-200"></span>
    //   <span className="circle animate-loader animation-delay-400"></span>
    // </div>
  );
};

export default Loader;
