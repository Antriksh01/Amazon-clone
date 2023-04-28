import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
// import { useAuth } from "../context/auth";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Checkbox } from "antd";

const HomePage = () => {
  // const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);

  // get All Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4600/api/v1/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
        console.log(categories);
      }
    } catch (error) {
      console.log(error);
      alert("error while fetching data");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // getProducts
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4600/api/v1/product/get-product"
      );
      setProducts(data.product);
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Container>
        <Layout title={"Home - amazon"}>
          <div className="row mt-3 mb-5">
            <div className="col-md-3">
              <h4 className="text-center">Filter by category</h4>
              <div className="d-flex flex-column">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
            </div>
            <div className="col-md-9">
              {JSON.stringify(checked, null, 4)}
              <h1 className="text-center">All Products</h1>
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                    <div className="m-2">
                      <div
                        className="card"
                        style={{ width: "18rem", height: "27rem" }}
                      >
                        <img
                          className="card-img-top"
                          src={`http://localhost:4600/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">
                            Category : {p.category.name}
                          </p>
                          <p className="card-text">{p.description}</p>

                          <button className="btn btn-primary m-2">
                            View Details
                          </button>
                          <button className="btn btn-warning">
                            Add to Cart
                          </button>
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

export default HomePage;
const Container = styled.div`
  a {
    text-decoration: none;
  }
`;
