import React from "react";
import "./index.css";
import Products from "./index";
import ReactDOM from "react-dom";
export default function Popup({ isopen, onClose, description, price, images, itemId, item }) {
  if (!isopen) return null;
  if (isopen) {
    
    return ReactDOM.createPortal(
      <>
        <div className={"modal-wrapper"}>
          <div onClick={onClose} className={"modal-backdrop"} />
          <div className={"modal-box"}>
            <Products titulo={item} description={description} price={price} images={images} itemid={itemId}/>
          </div>
        </div>
      </>,
      document.getElementById("modal-root")
    );
  }
}
