import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import styled from "styled-components";

const CreateCategory = () => {
  return (
    <>
      <Layout title={"Dashboard - create-category"}>
        <Container>
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Create Category</h1>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default CreateCategory;
const Container = styled.div``;
