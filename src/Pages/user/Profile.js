import React from "react";
import styled from "styled-components";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";

const Profile = () => {
  return (
    <>
      <Layout title={"your profile"}>
        <Container>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <UserMenu />
              </div>
              <div className="col-md-9">
                <h1>Your Profile</h1>
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Profile;
const Container = styled.div``;
