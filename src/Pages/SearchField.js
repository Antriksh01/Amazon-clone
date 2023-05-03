import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SearchField = () => {
  const [values, setValues] = useSearch();
  return (
    <Container>
      <Layout title={"search results"}>
        <div className="container">
          <div className="text-center">
            <h1>Search Results</h1>
            <h6>
              {values?.results.length < 1
                ? "no result founds"
                : `Found ${values?.results.length}`}
            </h6>
            <div className="d-flex flex-wrap mt-5">
              {values?.results.map((p) => (
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
                        <p className="card-text">
                          Category : {p.category.name}
                        </p>
                        <p className="card-text">
                          {p.description.substring(0, 30)}...
                        </p>
                        <p>₹{p.price}</p>

                        <button className="btn btn-primary m-2">
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
        </div>
      </Layout>
    </Container>
  );
};

export default SearchField;
const Container = styled.div`
  a {
    text-decoration: none;
  }
`;
