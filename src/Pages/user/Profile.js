import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Profile = () => {
  //context-use
  const [auth, setAuth] = useAuth();
  //state
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  // handlechangefunc
  const HandleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  // onsubmitfunc
  const onSubmit = async (e) => {
    e.preventDefault();

    const sendData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      password: data.password,
    };
    console.log(sendData);
    try {
      const { data } = await axios.put(
        "http://localhost:4600/api/v1/auth/profile",
        sendData
      );
      setAuth({ ...auth, user: data?.updatedUser });
      let ls = localStorage.getItem("auth");
      ls = JSON.parse(ls);
      ls.user = data.updatedUser;
      localStorage.setItem("auth", JSON.stringify(ls));
      toast.success("Profile Updated Successfully");
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // get data user
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setData(auth?.user);
  }, [auth?.user]);
  return (
    <>
      <Layout title={"your profile"}>
        <Container>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <UserMenu />
              </div>
              <div className="col-md-9">
                <div className="mainheight mt-5 mb-5">
                  <form onSubmit={onSubmit}>
                    <h3 className="">User Profile</h3>
                    <div class="mb-3">
                      <input
                        type="text"
                        placeholder="Enter  Name"
                        class="form-control"
                        name="name"
                        value={data.name}
                        onChange={HandleChange}
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
                        disabled
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
                      />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">
                        Update
                      </button>
                      <span>
                        Already have an account <Link to="/login">Sign in</Link>{" "}
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Profile;
const Container = styled.div`
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
