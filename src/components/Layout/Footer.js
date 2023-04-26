import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  const handleTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <Container>
        <div className="footer">
          <h4 className="text-center mt-3">All Rights Reserved &copy; EIPL</h4>
          <p className="text-center mt-3">
            <Link onClick={handleTop} to="/about">
              About
            </Link>
            |
            <Link onClick={handleTop} to="/contact">
              Contact
            </Link>
            |
            <Link onClick={handleTop} to="/privacy">
              Privacy Policy
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
};

export default Footer;
const Container = styled.div`
  .footer {
    background-color: black;
    text-align: center;
    color: white;
    padding: 1rem;
    a {
      color: white;
      text-decoration: none;
      margin: 1rem;
    }
    a:hover {
      color: red;
    }
  }
`;
