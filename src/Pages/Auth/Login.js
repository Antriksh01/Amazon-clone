import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const HandleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const sendData = {
      email: data.email,
      password: data.password,
    };
    console.log(sendData.email);
    try {
      const response = await axios.post(
        "http://localhost:4600/api/v1/auth/login",
        sendData
      );
      if (response.data.success) {
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });

        console.log(response);
        alert("Login successfully");
        localStorage.setItem("auth", JSON.stringify(response.data));

        navigate(location.state || "/");
      } else {
        alert("invalid credentials");
      }
    } catch (err) {
      alert(err.response.data.msg);
      console.log(err.response.data.msg);
      console.log(err);
    }
  };
  return (
    <Layout title={"login - amazon"}>
      <Container className="container">
        <div className="mainheight mt-5 mb-5">
          <form onSubmit={onSubmit}>
            <h3 className="text-white">Login</h3>
            <div class="mb-3">
              {/* <label for="email" class="form-label">
                Your Email
              </label> */}
              <input
                type="email"
                placeholder="Enter your Email"
                class="form-control"
                name="email"
                value={data.email}
                onChange={HandleChange}
              />
            </div>

            <div class="mb-3">
              {/* <label for="password" class="form-label">
                Password
              </label> */}
              <input
                type="password"
                class="form-control"
                placeholder="Enter Password"
                name="password"
                value={data.password}
                onChange={HandleChange}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <button
                type="submit"
                className="btn btn-primary mt-2"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password
              </button>
            </div>
          </form>
        </div>
      </Container>
    </Layout>
  );
};

export default Login;
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
