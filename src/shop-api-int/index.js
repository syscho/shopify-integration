import React, { Component } from "react";
import Client from "shopify-buy";

export const ShopContext = React.createContext();
//user Shopify credentials
const user = Client.buildClient({
  storefrontAccessToken: "e68f596d2825e1e59d829a16773ff9fe",
  domain: "cucusclothes.myshopify.com",
});
//initState info from gith  https://shopify.github.io/js-buy-sdk/
class ShopStoreProvider extends Component {
  state = {
    products: [],
    product: {},
    checkout: {},
    cartOpenStatus: false,
  };

  componentDidMount() {

    //Check if localStorage has a checkout_id saved
    if (localStorage.checkout) {
      this.fetchCheckout(localStorage.checkout);
    } else {
      this.createCheckout();
    }
    //if there is no checkout_id in localStorage then we will create a new checkout

    //else fetch the checkout from shopify
  }

  createCheckout = async () => {
    const checkout = await user.checkout.create();
    localStorage.setItem("checkout", checkout.id);
    await this.setState({ checkout: checkout });
  };

  fetchCheckout = async (checkoutId) => {
    user.checkout
      .fetch(checkoutId)
      .then((checkout) => {
        this.setState({ checkout: checkout });
      })
      .catch((err) => console.log(err));
  };

  addItemToCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
    const checkout = await user.checkout.addLineItems(
      this.state.checkout.id,
      lineItemsToAdd
    );
    this.setState({ checkout: checkout });

    this.openCart();
  };

  fetchAllProducts = async () => {
    const products = await user.product.fetchAll();
    this.setState({ products: products });
  };

  fetchProductWithId = async (id) => {
    const product = await user.product.fetch(id);
    this.setState({ product: product });

    return product;
  };

  closeCart = () => {
    this.setState({ cartOpenStatus: false });
  };
  openCart = () => {
    this.setState({ cartOpenStatus: true });
  };

  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithId: this.fetchProductWithId,
          closeCart: this.closeCart,
          openCart: this.openCart,
          addItemToCheckout: this.addItemToCheckout,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

export const ShopConsumer = ShopContext.Consumer;


export default ShopStoreProvider;
