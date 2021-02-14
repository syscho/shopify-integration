import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderNav from "../components/navbar";
import { ShopContext } from "../shop-api-int";
import Popup from "./popup/popup";
function Layer(props) {
  return <Container>{props.children}</Container>;
}
export default function Home() {
  const [isopen, setIsopen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [images, setImages] = useState([]);
  const [itemId, setItemId] = useState("");
  const { fetchAllProducts, products } = useContext(ShopContext);
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);
  const handleData = (title, description, price, images, itemId) => {
    setTitle(title);
    setDescription(description);
    setPrice(price);
    setImages(images);
    setIsopen(true);
    setItemId(itemId);
  };
  console.log(itemId);
  if (!products) return <p>Loading...</p>;

  return (
    <>
      <HeaderNav />
      <Layer>
        <Row style={{ marginTop: "40px" }}>
          {products.map((product) => (
            <Col key={product.id}>
              <Card style={{ width: "100%", alignContent: "center" }}>
                <Card.Img
                  variant="top"
                  src={product.images[0].src}
                  style={{ width: "auto", height: "20rem" }}
                  onClick={(e) =>
                    handleData(
                      product.title,
                      product.description,
                      product.variants[0].price,
                      product.images
                    )
                  }
                />
                <Card.Body>
                  <Card.Title>
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </Card.Title>{" "}
                  <Card.Subtitle className="mb-2 text-muted">
                    {product.variants[0].price}
                  </Card.Subtitle>
                  <Card.Text style={{ textAlign: "justify", fontSize: "1rem" }}>
                    {product.description}
                  </Card.Text>
                  <Row>
                    <Col md={4}>
                      <Button
                        variant="info"
                        onClick={(e) =>
                          handleData(
                            product.title,
                            product.description,
                            product.variants[0].price,
                            product.images,
                            product.id
                          )
                        }
                        style={{ right: "0px" }}
                      >
                        Details
                      </Button>
                    </Col>
                    <Col md={{ offset: 3 }}>
                      <Link to={`/product/${product.id}`}>
                        <Button style={{ right: "0px" }} variant="success">
                          Add to Cart
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                  <Popup
                    isopen={isopen}
                    onClose={(e) => setIsopen(false)}
                    onRequestClose
                    item={title}
                    description={description}
                    price={price}
                    images={images}
                    itemId={itemId}
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Layer>
    </>
  );
}
