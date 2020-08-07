import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";

function Loading(props) {
  return (
    <div className="loading">
      <ReactLoading
        type={"spokes"}
        color={"#ffc0cb"}
        height={500}
        width={250}
      />
    </div>
  );
}
export default Loading;
