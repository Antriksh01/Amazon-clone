import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AdminMenu = () => {
  return (
    <>
      <Container>
        <h1>Admin Panel</h1>
        <div class="list-group">
          <Link
            to="/dashboard/admin/create-category"
            class="list-group-item list-group-item-action"
          >
            Create Category
          </Link>
          <Link
            to="/dashboard/admin/create-product"
            class="list-group-item list-group-item-action"
          >
            Create Product
          </Link>
          <Link
            to="/dashboard/admin/users"
            class="list-group-item list-group-item-action"
          >
            Users
          </Link>
        </div>
      </Container>
    </>
  );
};

export default AdminMenu;
const Container = styled.div``;
