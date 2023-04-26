import React from "react";
import Layout from "../../components/Layout/Layout";
import styled from "styled-components";
import AdminMenu from "../../components/Layout/AdminMenu.js";

const CreateProduct = () => {
  return (
    <>
      <Layout title={"Dashboard - Create Product"}>
        <Container>
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Create Product</h1>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default CreateProduct;
const Container = styled.div``;
