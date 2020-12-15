import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  console.log("colorList at BubblePage: ", colorList);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get("api/colors")
      .then((res) => {
        setColorList(res.data);
      })
      .catch((err) => console.log("error at BubblePage", err.message));
  }, []);

  const getColors = () => {
    axiosWithAuth()
      .get("api/colors")
      .then((res) => console.log("res inside getColors: ", res));
  };

  return (
    <>
      {/* <ColorList colors={colorList} updateColors={setColorList} /> */}
      <ColorList
        colors={colorList}
        setColorList={setColorList}
        updateColors={getColors}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
