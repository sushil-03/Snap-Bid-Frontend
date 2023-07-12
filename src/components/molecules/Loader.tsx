import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const Loader = ({}) => {
  return (
    <div className="inset-0 z-50 mt-32 ">
      <Player
        autoplay
        loop
        src="https://assets10.lottiefiles.com/packages/lf20_usiohiuz.json"
        // style={{ height: height, width: width, scale: 4 }}
        className="w-1/2 h-1/2 "
      >
        <Controls
          visible={false}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player>
    </div>
  );
};

export default Loader;
