import { Nav, Navbar, Container } from "react-bootstrap";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { ShopContext } from "../shop-api-int";
import { useParams } from "react-router-dom";

export default function HeaderNav() {
  const { openCart } = useContext(ShopContext);
  
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ zIndex: "1", backgroundColor: "#4C9DD2" }}
      >
        {" "}
        <Container>
          <Navbar.Brand href="/" style={{ fontSize: "30px", color: "white" }}>
            Shop-Test
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
          </Navbar.Collapse>
          <Nav.Link onClick={(e) => openCart()}>
            <span style={{ color: "white", fontSize: "20px" }}>
              Cart <FaShoppingCart size={20} />
            </span>
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  );
}
