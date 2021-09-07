import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Addproduct } from "./Addproduct";
import { EditProduct } from "./EditProduct";
import Product from "./Product";
import "./styles.css";
export default function App() {
  return (
    <Router>
      <AppBar position="sticky">
        <Toolbar>
          <Link to="/">Home</Link>

          <Link to="/Addproduct">Add Product Here</Link>
        </Toolbar>
      </AppBar>
      <div>
        <Switch>
          <Route path="/Addproduct" component={Addproduct} exact={true} />
          <Route exact path="/EditProduct/:id">
            <EditProduct />
          </Route>
          <Route exact path="/">
            <Product />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
