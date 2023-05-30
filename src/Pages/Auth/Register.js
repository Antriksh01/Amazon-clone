import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-hot-toast";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    answer: "",
    password: "",
  });
  const navigate = useNavigate();

  const HandleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const sendData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      answer: data.answer,
      password: data.password,
    };
    console.log(sendData);
    try {
      const response = await axios.post(
        "http://localhost:4600/api/v1/auth/register",
        sendData
      );
      toast.success("Registration successfully");
      console.log(response);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Layout>
        <Container className="container">
          <div className="mainheight mt-5 mb-5">
            <form onSubmit={onSubmit}>
              <h3 className="text-white">Register</h3>
              <div class="mb-3">
                <input
                  type="text"
                  placeholder="Enter  Name"
                  class="form-control"
                  name="name"
                  value={data.name}
                  onChange={HandleChange}
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="email"
                  placeholder="Enter Email"
                  class="form-control"
                  name="email"
                  value={data.email}
                  onChange={HandleChange}
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  placeholder="Enter  Number"
                  class="form-control"
                  maxLength={10}
                  name="phone"
                  value={data.phone}
                  onChange={HandleChange}
                  required
                />
              </div>

              <div class="mb-3">
                <input
                  type="text"
                  placeholder="Enter  address"
                  class="form-control"
                  name="address"
                  value={data.address}
                  onChange={HandleChange}
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  placeholder="Enter your PR in Bench"
                  class="form-control"
                  name="answer"
                  value={data.answer}
                  onChange={HandleChange}
                  required
                />
              </div>

              <div class="mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter Password"
                  name="password"
                  value={data.password}
                  onChange={HandleChange}
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
                <span>
                  Already have an account <Link to="/login">Sign in</Link>{" "}
                </span>
              </div>
            </form>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Register;
const Container = styled.div`
  width: 100%;

  .mainheight {
    width: 100%;
    display: flex;
    justify-content: center;
    form {
      width: auto;
      background-color: #fff;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      h3 {
        text-align: center;
        color: black !important;
      }
      p {
        text-align: right;
        a {
          color: #255b47;
          text-decoration: none;
          font-weight: bold;
        }
      }
      .d-grid {
        button {
          background-color: #255b47;
          border: none;
        }
        button:hover {
          box-shadow: #000 0px 8px 24px;
        }
      }
      input {
        width: 18rem;
      }
    }
  }
`;
