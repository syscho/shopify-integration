import React, { useState } from "react";
import Popup from "./popup";

export default function ButtonShoe() {
  const [isopen, setIsopen] = useState(false);
  
  return (
    <>

      <div>
        <Popup
          isopen={isopen}
          onClose={(e) => setIsopen(false)}
          onRequestClose
        />
      </div>
    </>
  );
}
