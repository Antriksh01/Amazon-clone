import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styled from "styled-components";
import AdminMenu from "../../components/Layout/AdminMenu.js";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Option } from "antd/es/mentions";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const HandleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(data);
  };

  //   getSingleProduct
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4600/api/v1/product/get-product/${params.slug}`
      );
      setData(data.product);
      setId(data.product._id);
      setCategory(data.product.category._id);
      console.log(category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

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

  // create product function

  const onSubmit = async (e) => {
    e.preventDefault();

    // const sendData = {
    //   name: data.name,
    //   description: data.description,
    //   price: data.price,
    //   quantity: data.quantity,
    //   photo: data.photo,
    //   category: data.category,
    // };

    const productData = new FormData();
    productData.append("name", data.name);
    productData.append("description", data.description);
    productData.append("price", data.price);
    productData.append("quantity", data.quantity);
    photo?.size > 10000 && productData.append("photo", photo);
    productData.append("category", category);
    console.log(productData);
    try {
      const { data } = await axios.put(
        `http://localhost:4600/api/v1/product/update-product/${id}`,
        productData
      );
      if (data.success) {
        alert("Product updated successfully");
        console.log(data);
        navigate("/dashboard/admin/products");
      } else {
        alert("failed to update product");
      }
    } catch (err) {
      console.log(err);
      alert("something went wrong");
    }
  };

  //   delete product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure want to delete this product");
      if (answer === "yes") {
        const { data } = await axios.delete(
          `http://localhost:4600/api/v1/product/delete-product/${id}`
        );
        alert("product deleted successfully");
        navigate("/dashboard/admin/products");
      } else {
        alert("product can not be deleted");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <>
      <Layout title={"Dashboard - Create Product"}>
        <Container>
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Update Product</h1>

              <div className="m-1 w-75">
                <Select
                  bordered={false}
                  placeholder="select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={category}
                >
                  {categories.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product-photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`http://localhost:4600/api/v1/product/product-photo/${id}`}
                        alt="product-photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={data.name}
                    name="name"
                    placeholder="write a name"
                    className="form-control"
                    onChange={HandleChange}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={data.description}
                    name="description"
                    placeholder="write a description"
                    className="form-control"
                    onChange={HandleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={data.price}
                    name="price"
                    placeholder="add price"
                    className="form-control"
                    onChange={HandleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={data.quantity}
                    name="quantity"
                    placeholder="add quantity"
                    className="form-control"
                    onChange={HandleChange}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="select shipping"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    value={shipping ? "yes" : "no"}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <div className="btn btn-primary" onClick={onSubmit}>
                    Update Product
                  </div>
                </div>
                <div className="mb-3">
                  <div className="btn btn-danger" onClick={handleDelete}>
                    Delete Product
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default UpdateProduct;
const Container = styled.div``;
