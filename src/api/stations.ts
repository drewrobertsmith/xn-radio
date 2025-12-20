import { Station } from "../types/types";

const xnLogo = require("../../assets/images/splash-icon.png");

export const XN: Station = {
  id: "XNRD",
  name: "Xn Radio",
  callLetters: "XNRD",
  appLogo: xnLogo,
  stream:
    "https://playerservices.streamtheworld.com/api/livestream-redirect/XNRD.mp3",
  fallbackstream:
    "https://playerservices.streamtheworld.com/api/livestream-redirect/XNRD.mp3",
};
