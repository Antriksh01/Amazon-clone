import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Products = () => {
  const [products, setProducts] = useState([]);

  //   get all product
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4600/api/v1/product/get-product"
      );
      setProducts(data.product);
      console.log(products);
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <Container>
        <Layout>
          <div className="row mb-3">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1 className="text-center">All Products</h1>
              <div className="d-flex flex-wrap">
                {products.map((p) => (
                  <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                    <div className="m-2">
                      <div
                        className="card"
                        style={{ width: "18rem", height: "25rem" }}
                      >
                        <img
                          className="card-img-top"
                          src={`http://localhost:4600/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">{p.description}</p>
                          <Link to="/" className="btn btn-primary">
                            View Details
                          </Link>
                          <Link to="/" className="btn btn-warning">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Layout>
      </Container>
    </>
  );
};

export default Products;
const Container = styled.div`
  a {
    text-decoration: none;
  }
  img {
    height: 200px;
    width: auto;
  }
`;
