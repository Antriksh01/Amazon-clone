import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ImAmazon } from "react-icons/im";
import { useAuth } from "../../context/auth";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = (e) => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    alert("logout successfully");
  };
  return (
    <>
      <Container>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <Link class="navbar-brand" to="/">
              <ImAmazon />
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <Link class="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>

                {!auth.user ? (
                  <>
                    <li class="nav-item">
                      <Link class="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link" to="/register">
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li class="nav-item dropdown">
                      <Link
                        class="nav-link dropdown-toggle"
                        to="/"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {auth.user.name}
                      </Link>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <Link
                            class="dropdown-item"
                            to={`/dashboard/${
                              auth.user.role === 1 ? "admin" : "user"
                            }`}
                          >
                            Dashboard
                          </Link>
                        </li>

                        <li>
                          <Link
                            onClick={handleLogout}
                            class="dropdown-item"
                            to="/login"
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </>
                )}
                <li class="nav-item">
                  <Link class="nav-link" to="/cart">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Container>
    </>
  );
};

export default Header;
const Container = styled.div`
  .navbar {
    font-family: "Big Shoulders Display", cursive;
    font-size: 17px;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 2px;
    height: 3.5rem;
    box-shadow: 0 8px 6px -6px grey;
  }
  .active {
    border-bottom: 1px solid;
  }
`;
