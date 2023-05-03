import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Container>
      <Layout>
        <div className="container">
          <div className="row">
            {categories?.map((c) => (
              <div className="col-md-6 mt-5 mb-3 gx-5 gy-5">
                <Link to={`/category/${c.slug}`} className="btn btn-primary">
                  {c.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </Container>
  );
};

export default Categories;
const Container = styled.div``;
