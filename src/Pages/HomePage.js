import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
// import { useAuth } from "../context/auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cartContext";
import toast from "react-hot-toast";

const HomePage = () => {
  // const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

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
    getTotal();
  }, []);

  // getProducts
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:4600/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
      console.log(products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4600/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:4600/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
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
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4600/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products);
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  };

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
              <h4 className="text-center mt-3">Filter by price</h4>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="d-flex flex-column">
                <button
                  className="btn btn-danger"
                  onClick={() => window.location.reload()}
                >
                  Remove Filters
                </button>
              </div>
            </div>

            <div className="col-md-9">
              {/* {JSON.stringify(radio, null, 4)} */}
              <h1 className="text-center">All Products</h1>
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
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

                          <button
                            className="btn btn-primary m-2"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/product/${p.slug}`);
                            }}
                          >
                            View Details
                          </button>
                          <button
                            className="btn btn-warning"
                            onClick={(e) => {
                              e.preventDefault();
                              setCart([...cart, p]);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, p])
                              );
                              toast.success("Item Added to Cart!");
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="m-2 p-2">
                {products && products.length < total && (
                  <button
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? "loading..." : "load more"}
                  </button>
                )}
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
