import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const Loader = ({ height = "450px", width = "450px" }) => {
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
  );
};

export default Loader;
