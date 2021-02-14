import React, { useContext } from "react";
import { ShopContext } from "../shop-api-int";
import { Div, SideDrawer, Text, Row, Col, Anchor, Container } from "atomize";
import { Button } from "react-bootstrap";

export default function Cart() {
  const { cartOpenStatus, closeCart, checkout } = useContext(ShopContext);
  if (checkout.lineItems) {
    return (
      <SideDrawer isOpen={cartOpenStatus} onClose={closeCart}>
        <Container d="flex" flexDir="column" h="100%">
          <Row border={{ b: "1px solid" }} p="0.7rem" borderColor="gray300">
            <p>Cart Items</p>
          </Row>
          <Row
            flexGrow="2"
            p="0.7rem"
            overflow="auto"
            flexWrap="nowrap"
            flexDir="column"
            border={{ b: "1px solid" }}
          >
            {checkout.lineItems.length < 1 ? (
              <Row>
                <Col>
                  <Text
                    tag="h1"
                    textColor="black500"
                    textSize="paragraph"
                    hoverTextColor="black700"
                    transition="0.3s"
                  >
                    Cart Is Empty
                  </Text>
                </Col>
              </Row>
            ) : (
              <>
                {checkout.lineItems &&
                  checkout.lineItems.map((item) => (
                    <Row key={item.id} p={{ t: "5px" }}>
                      <Col>
                        <Div
                          bgImg={item.variant.image.src}
                          bgSize="cover"
                          bgPos="center"
                          h="5rem"
                          w="4rem"
                        />
                      </Col>
                      <Col>
                        <p>{item.title}</p>
                        <p>Cantidad: {item.quantity}</p>
                      </Col>
                      <Col>
                        <p>{item.variant.price}</p>
                      </Col>
                    </Row>
                  ))}
              </>
            )}
          </Row>
          <Row p="0.7rem">
            {/* //this send the data to Shopify to valid the purchase */}
            <Button variant="danger" href={checkout.webUrl}>
              Checkout
            </Button>
          </Row>
        </Container>
      </SideDrawer>
    );
  }

  return null;
}
