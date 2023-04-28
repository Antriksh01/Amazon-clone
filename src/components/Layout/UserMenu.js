import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UserMenu = () => {
  return (
    <>
      <Container>
        <h1>User Dashboard</h1>
        <div class="list-group">
          <Link
            to="/dashboard/user/profile"
            class="list-group-item list-group-item-action"
          >
            Profile
          </Link>
          <Link
            to="/dashboard/user/orders"
            class="list-group-item list-group-item-action"
          >
            Orders
          </Link>
        </div>
      </Container>
    </>
  );
};

export default UserMenu;
const Container = styled.div``;
