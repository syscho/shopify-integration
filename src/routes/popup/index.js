import React, { useState, useEffect } from "react";
import "./index.css";
import DetailsThumb from "./image-types";
import { Link } from "react-router-dom";
export default function Products(props) {
  const datos = {
    products: [
      {
        _id: "1",
        title: `${props.titulo}`,
        src: props.images,
        description: "Be free to check this product",
        content: `${props.description}`,
        price: props.price,
        itemid: props.itemid,
      },
    ],
    index: 0,
  };

  const myRef = React.createRef();

  const [img, setImg] = useState([0]);
  const handleTab = (index) => {
    setImg(index);
    const images = myRef.current.children;
    //console.log(images);
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };
  useEffect(() => {
    const { index } = datos;
    myRef.current.children[index].className = "active";
  }, []);

  //console.log(img);
  const { products } = datos;
  return (
    <div className="mainshoes">
      {products.map((item) => (
        <div className="details" key={item._id}>
          <div className="big-img">
            <img src={item.src[img].src} alt="" />
          </div>
          <div className="box">
            <div className="row">
              <h2>{item.title}</h2>
              <span>${item.price}</span>
            </div>
            <p className="itemdescr">{item.description}</p>
            <p>{item.content}</p>
            <DetailsThumb images={item.src} tab={handleTab} myRef={myRef} />

            <Link to={`/product/${item.itemid}`}>
              <button className="cart">Add to cart</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
