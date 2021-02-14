import React from "react";

export default function DetailsThumb({ images, tab, myRef }) {
  console.log(images);
  return (
    <div className="thumb" ref={myRef}>
      {images.map((img, index) => (
        <img
          src={img.src}
          alt=""
          key={index}
          onClick={() => tab(index)}
        />
      ))}
    </div>
  );
}
