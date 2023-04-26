import React from "react";
import Layout from "../../components/Layout/Layout";
import styled from "styled-components";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <>
      <Layout title={"Dashboard - Amazon"}>
        <Container>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <UserMenu />
              </div>
              <div className="col-md-9">
                <h3>{auth.user.name}</h3>
                <h3>{auth.user.phone}</h3>
                <h3>{auth.user.address}</h3>
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Dashboard;
const Container = styled.div``;
