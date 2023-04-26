import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PageNotFound = () => {
  return (
    <>
      <Container>
        <Layout>
          <div className="pnf">
            <h1 className="pnf-title">404</h1>
            <h2 className="pnf-heading">Oops! Page not found</h2>
            <Link to="/">Go back</Link>
          </div>
        </Layout>
      </Container>
    </>
  );
};

export default PageNotFound;
const Container = styled.div`
  .pnf {
    display: flex;
    min-height: 65vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .pnf-title {
      font-size: 100px;
      font-weight: 700;
    }

    .pnf-heading {
      font-weight: normal;
    }

    a {
      color: black;
      border: 1px solid black;
      text-decoration: none;
      padding: 10px;
      margin-top: 10px;
      border-radius: 5px;
    }
    a:hover {
      background-color: black;
      color: white;
    }
  }
`;
