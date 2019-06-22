import React from "react";
import { Image } from "semantic-ui-react";
import logo from "../images/reel-politik-logo-small.svg";

const ReelSpinner = () => (
  <Image
    src={logo}
    style={{ animation: "spin 1.5s linear infinite", height: "3em" }}
  />
);

export default ReelSpinner;
