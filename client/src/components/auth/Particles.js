import React from "react";
import Particles from "react-particles-js";

const particleOpt = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    shape: {
      type: "polygon"
    },
    size: {
      value: 2
    },
    move: {
      speed: 10,
      out_mode: "bounce"
    }
  },
  interactivity: {
    onhover: {
      enable: true
    }
  }
};

export default () => {
  return <Particles params={particleOpt} />;
};
