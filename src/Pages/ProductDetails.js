import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const navigate = useNavigate();

  // console.log(product.category.name);

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);
  // getproducts
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4600/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);

      setRelatedProduct(data?.products);
      console.log(relatedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4600/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
      console.log(relatedProduct);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Layout>
        <div className="row container mt-5">
          <div className="col-md-6">
            <img
              className="card-img-top"
              src={`http://localhost:4600/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              height={200}
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-center">Product Details</h1>
            <div className="rightSec">
              <h6>Name : {product.name}</h6>
              <h6>Description : {product.description}</h6>
              <h6>Price : {product.price}</h6>
              <h6>Category : {product.category?.name}</h6>
              <button className="btn btn-warning">Add to Cart</button>
              {/* <h6>Shipping : {product.shipping}</h6> */}
            </div>
          </div>
        </div>
        <hr className="mt-5" />

        <div className="row mt-5">
          <h1>similar products</h1>
          {relatedProduct?.length < 1 && <p>No Similar Product Found</p>}
          <div className="d-flex flex-wrap justify-content-center">
            {relatedProduct?.map((p) => (
              <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                <div className="m-2">
                  <div
                    className="card"
                    style={{ width: "18rem", height: "30rem" }}
                  >
                    <img
                      className="card-img-top"
                      src={`http://localhost:4600/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      height={200}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">Category : {p.category.name}</p>
                      <p className="card-text">
                        {p.description.substring(0, 30)}...
                      </p>
                      <p>₹{p.price}</p>
                      <button
                        className="btn btn-primary m-2"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/product/${p.slug}`);
                        }}
                      >
                        View Details
                      </button>
                      <button className="btn btn-warning">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    </Container>
  );
};

export default ProductDetails;
const Container = styled.div`
  .rightSec {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    h1 {
      text-align: center !important;
    }
  }
  a {
    text-decoration: none;
  }
`;
