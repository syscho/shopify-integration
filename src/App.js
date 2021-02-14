import ShopStoreProvider from "./shop-api-int";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./routes/home";
import Product from "./routes/product";
import Cart from "./components/cart";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
;
const engine = new Styletron();
function App() {
  return (
    <ShopStoreProvider>
      {" "}
      <StyletronProvider value={engine} >
        <Router>
          {" "}
          <Cart />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/product/:id" component={Product} />
          </Switch>
        </Router>{" "}
      </StyletronProvider>
    </ShopStoreProvider>
  );
}

export default App;
