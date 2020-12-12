import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  useEffect(() => {
    axiosWithAuth()
      .get("api/colors")
      .then((res) => {
        console.log("success res at BubblePage: ", res.data);
        setColorList(res.data);
      })
      .catch((err) => console.log("error at BubblePage", err.message));
  }, []);
  // set that data to the colorList state property

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
