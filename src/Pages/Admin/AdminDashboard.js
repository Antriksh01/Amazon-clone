import React from "react";
import Layout from "../../components/Layout/Layout";
import styled from "styled-components";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Amazon"}>
      <Container>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-3 m-3 p-3">
              <AdminMenu />
            </div>
            <div className=" col-lg-7 col-md-100">
              <div className="card w-75">
                <h3>Admin Name : {auth.user.name}</h3>
                <h3>Admin Number : {auth.user.phone}</h3>
                <h3>Admin Email : {auth.user.email}</h3>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default AdminDashboard;
const Container = styled.div``;
