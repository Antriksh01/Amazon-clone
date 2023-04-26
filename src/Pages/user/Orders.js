import React from "react";
import Layout from "../../components/Layout/Layout";
import styled from "styled-components";
import UserMenu from "../../components/Layout/UserMenu";

const Orders = () => {
  return (
    <>
      <Layout title={"your orders"}>
        <Container>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <UserMenu />
              </div>
              <div className="col-md-9">
                <h1>All Orders</h1>
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Orders;
const Container = styled.div``;