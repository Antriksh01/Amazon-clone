import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import styled from "styled-components";
import axios from "axios";
import { Button, Modal } from "antd";
import "antd/dist/reset.css";

import CategoryForm from "../../components/form/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4600/api/v1/category/create-category",
        { name }
      );
      if (data.success) {
        alert(`${name} is created`);
        console.log(name);
        getAllCategory();
      } else {
        alert(`${data.msg}`);
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };

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

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:4600/api/v1/category/update-category/${selected._id}`,
        { name: updateName }
      );
      if (data.success) {
        alert(`${updateName} category updated successfully`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategory();
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4600/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        alert(`category deleted successfully`);
        getAllCategory();
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"Dashboard - create-category"}>
        <Container>
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Manage Category</h1>
              <div className="container p-3 w-50">
                <CategoryForm
                  onSubmit={onSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
              <div className="w-75">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((c) => (
                      <>
                        <tr>
                          <td key={c._id}>{c.name}</td>
                          <td>
                            <button
                              className="btn btn-primary ms-2"
                              onClick={() => {
                                setVisible(true);
                                setUpdateName(c.name);
                                setSelected(c);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => {
                                handleDelete(c._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                visible={visible}
              >
                <CategoryForm
                  value={updateName}
                  setValue={setUpdateName}
                  onSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default CreateCategory;
const Container = styled.div``;
