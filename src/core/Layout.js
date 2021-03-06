import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";
import DefaultProfile from "../images/avatar.jpg";
import { itemTotal } from "../shop/cartHelpers";
import ChatsBox from "../chat/ChatsBox";
import "./Navbar.css";
// import { Message } from "@primer/octicons-react";

const Layout = ({ children, match, history }) => {
  const isActive = (path) => {
    if (match.path === path) {
      return { color: "orange" };
    } else {
      return { color: "black" };
    }
  };

  const toggleAndLogoButton = () => {
    return (
      <>
        <button
          className="navbar-toggler navbar-toggler-left collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            style={{ fontSize: "25px" }}
            className="navbar-toggler-icon"
          ></span>
          <span style={{ fontSize: "32px" }} className="my-1 mx-2 close">
            X
          </span>
        </button>
        <Link
          style={{
            fontSize: "30px",
            fontFamily: "cursive",
          }}
          to="/"
          className="navbar-brand my-0 px-2 py-0 mr-auto"
        >
          <div>
            <span
              style={{
                fontFamily: "sans-serif",
              }}
              className="display-4"
            >
              S
            </span>
            utwa
          </div>
        </Link>
      </>
    );
  };
  const nav = () => (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top bg-white py-0">
      {toggleAndLogoButton()}
      <div
        // style={{ lineHeight: "40px" }}
        className="collapse navbar-collapse order-3 order-lg-2"
        id="navbarText"
      >
        <ul style={{ listStyleType: "none" }} className="navbar-nav ml-auto">
          <div
            id="sideBarHeader"
            className="navbar navbar-expand-lg nav-tabs navbar-light bg-white py-0"
          >
            {toggleAndLogoButton()}
          </div>
          <li className="nav-item">
            <Link to="/" className="nav-link" style={isActive("/")}>
              <i className="fas fa-house-user"></i> Home
            </Link>
          </li>
          {!isAuth() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="nav-link"
                  style={isActive("/signin")}
                >
                  <i className="fas fa-sign-in-alt"></i> Log In
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signup"
                  className="nav-link"
                  style={isActive("/signup")}
                >
                  <i className="fas fa-user-plus"></i> Sign Up
                </Link>
              </li>
            </Fragment>
          )}

          {isAuth() && isAuth().role === "admin" && (
            <li className="nav-item">
              <Link className="nav-link" style={isActive("/admin")} to="/admin">
                Admin
              </Link>
            </li>
          )}
          {isAuth() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive("/posts")}
                  to="/posts"
                >
                  Posts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={isActive("/shop")} to="/shop">
                  <i className="fas fa-store"></i> Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(`/findpeople`)}
                  to={`/findpeople`}
                >
                  <i className="fas fa-users"></i> Find People
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/post/create"
                  style={isActive("/post/create")}
                  className="nav-link"
                >
                  <i className="fas fa-plus"></i> Post
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(`/messaging`)}
                  to={`/messaging`}
                >
                  <i className="far fa-comment-alt"></i> Message
                </Link>
              </li>
            </Fragment>
          )}
          <li style={{ position: "relative" }} className="nav-item">
            <Link className="nav-link" style={isActive("/cart")} to="/cart">
              <i className="fas fa-shopping-cart">
                {" "}
                <small
                  style={{
                    fontSize: "14px",
                    color: "red",
                    position: "absolute",
                    top: "20px",
                    left: "15px",
                  }}
                >
                  {itemTotal()}
                </small>
              </i>{" "}
              Cart
            </Link>
          </li>
        </ul>
      </div>

      {isAuth() && (
        <div
          className="nav-item dropdown d-flex flex-row order-2 order-lg-3"
          style={{ lineHeight: "50px" }}
          aria-haspopup="true"
          aria-expanded="false"
        >
          <Link
            className="dropdown-toggle"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={isActive(`/user/${isAuth()._id}`)}
            to={`/user/${isAuth()._id}`}
          >
            {/* <div style={{ position: "relative", height: "50px" }}> */}
            <img
              style={{
                borderRadius: "50%",
                // border: "1px solid black",
              }}
              // className="float-left mr-2"
              height="40px"
              width="40px"
              onError={(i) => (i.target.src = `${DefaultProfile}`)}
              src={`${process.env.REACT_APP_API_URL}/user/photo/${
                isAuth()._id
              }`}
              alt={isAuth().name}
            />{" "}
            {/* {isAuth().name} */}
            {/* </div> */}
          </Link>

          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <Link
              className="dropdown-item pl-3 lead"
              to={`/user/${isAuth()._id}`}
            >
              <div style={{ position: "relative", height: "50px" }}>
                <img
                  style={{
                    borderRadius: "50%",
                    // border: "1px solid black",
                  }}
                  className="mr-2"
                  height="30px"
                  width="30px"
                  onError={(i) => (i.target.src = `${DefaultProfile}`)}
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${
                    isAuth()._id
                  }`}
                  alt={isAuth().name}
                />
                {"  "}
                {isAuth().name}
              </div>
            </Link>

            {/* <Link className="dropdown-item lead" to={`/user/${isAuth()._id}`}>
              <i className="far fa-eye mr-2"></i> View Profile
            </Link> */}

            <Link
              style={{ position: "relative" }}
              className="dropdown-item lead"
              to="/cart"
            >
              <i className="fas fa-shopping-cart mr-2">
                {" "}
                <small
                  style={{
                    fontSize: "14px",
                    color: "red",
                    position: "absolute",
                    top: "20px",
                    left: "15px",
                  }}
                >
                  {itemTotal()}
                </small>
              </i>{" "}
              Cart
            </Link>

            <div
              className="dropdown-item lead"
              style={{ cursor: "pointer" }}
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              <i className="fas fa-sign-out-alt mr-2"></i> Log Out
            </div>
          </div>
        </div>
      )}
    </nav>
  );
  const check = () => {
    if (isAuth() && isAuth().length !== -1) {
      return true;
    } else {
      return false;
    }
  };

  function checkChatReducer() {
    if (localStorage.getItem("checkChatReducer") === ("true" || "false")) {
      if (localStorage.getItem("checkChatReducer") === "true") {
        return true;
      }
      if (localStorage.getItem("checkChatReducer") === "false") {
        return false;
      }
    } else {
      return false;
    }
  }

  return (
    <>
      {nav()}
      <div
        style={{ overflowX: "hidden" }}
        className="container-fluid pt-3 px-0 px-xl-5"
      >
        {children}
      </div>
      {isAuth() && isAuth().length !== -1 && (
        <ChatsBox auth={check()} checkChatReducer={checkChatReducer()} />
      )}
    </>
  );
};

export default withRouter(Layout);
