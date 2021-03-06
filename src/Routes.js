import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Activate from "./auth/Activate";
import PrivateRoute from "./auth/PrivateRoute";
import Forgot from "./auth/Forgot";
import Reset from "./auth/Reset";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import NewPost from "./post/NewPost";
import Post from "./post/Post";
import ViewSinglePost from "./post/ViewSinglePost";
import EditPost from "./post/EditPost";
import FindPeople from "./user/FindPeople";
import Admin from "./admin/Admin";

//seller
import SellerRoute from "./auth/SellerRoute";
import AddProduct from "./seller/AddProduct";
import Orders from "./seller/Orders";
import UpdateProduct from "./seller/UpdateProduct";

//shop
import Shop from "./shop/Shop";
import Cart from "./shop/Cart";
import Product from "./shop/Product";
import MarketPlace from "./shop/MarketPlace";

//Massaging
import Messaging from "./chat/Chat";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <PrivateRoute path="/admin" exact component={Admin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/auth/activate/:token" exact component={Activate} />
        <PrivateRoute path="/findpeople" exact component={FindPeople} />
        <PrivateRoute path="/messaging" exact component={Messaging} />
        <PrivateRoute path="/user/:userId" exact component={Profile} />
        <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
        <PrivateRoute exact path="/post/create" component={NewPost} />
        <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
        <PrivateRoute exact path="/post/:postId" component={ViewSinglePost} />
        <Route path="/auth/password/forgot" exact component={Forgot} />
        <Route path="/auth/password/reset/:token" exact component={Reset} />
        <PrivateRoute path="/create/product" exact component={AddProduct} />
        <SellerRoute path="/admin/orders" exact component={Orders} />
        <SellerRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <Route path="/shop" exact component={Shop} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/product/:productId" exact component={Product} />
        <PrivateRoute path="/posts" exact component={Post} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
