import React from "react";
import Layout from "../../components/Layout/Layout";
import styled from "styled-components";
import AdminMenu from "../../components/Layout/AdminMenu";

const Users = () => {
  return (
    <>
      <Layout title={"Dashboard - All users"}>
        <Container>
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>All users</h1>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Users;
const Container = styled.div``;
