import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../shop-api-int";
import { Text, Div, Button, Row, Col, Container } from "atomize";
import HeaderNav from "../components/navbar";
export default function Product() {
  let { id } = useParams();
  const { fetchProductWithId, addItemToCheckout, product } = useContext(ShopContext)

  useEffect(() => {
    fetchProductWithId(id)
}, [ fetchProductWithId, id])

  if (!product.title) return <p>Loading...</p>;
  return (
    <div>
      <HeaderNav />
      <Container>
        <Row m={{ b: "2rem" }} p="2rem">
          <Col>
            <Div
              bgImg={product.images[0].src}
              shadow="3"
              bgSize="cover"
              w="100%"
              bgPos="center center"
              h="40rem"
            />
          </Col>
          <Col>
            <Text
              tag="h1"
              textColor="black500"
              textWeight="200"
              m={{ y: "2rem" }}
            >
              {product.title}
            </Text>
            <Text tag="h3" m={{ y: "2rem" }} textWeight="200">
              ${product.variants[0].price}
            </Text>
            <Text
              tag="p"
              textSize="paragraph"
              textColor="gray900"
              textWeight="200"
            >
              {product.description}
            </Text>
            <Button
              rounded="0"
              shadow="3"
              bg="black500"
              m={{ y: "2rem" }}
              onClick={() => addItemToCheckout(product.variants[0].id, 1)}
            >
              Confirm To Cart
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
