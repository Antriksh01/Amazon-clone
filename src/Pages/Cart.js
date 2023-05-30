import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import styled from "styled-components";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import axios from "axios";
// import DropIn from "braintree-web-drop-in-react";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log(auth?.user);

  const totalPrice = (pid) => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-us", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // get payment token gateway
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4600/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handlePayment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:4600/api/v1/product/braintree/payment",
        nonce,
        cart
      );

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment completed successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Layout title={"cart - amazon"}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center bg-light p-2 mb-1">
                {`Hello ${auth?.token && auth?.user?.name}`}
              </h1>
              <h4 className="text-center">
                {cart?.length > 1
                  ? `You have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout"
                    }`
                  : "your cart is empty"}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              {cart?.map((p) => (
                <div className="row card m-3 flex-row">
                  <div className="col-md-4">
                    <img
                      className="card-img-top m-3"
                      src={`http://localhost:4600/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      height={200}
                    />
                  </div>
                  <div className="col-md-8 pro-details">
                    <h4>{p.name}</h4>
                    <p>{p.description.substring(0, 30)}</p>
                    <h4>Price : ₹{p.price}</h4>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <h4>Cart Summary</h4>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total :{totalPrice()}</h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>current address</h4>
                    <h6>{auth?.user?.address}</h6>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    {auth?.token ? (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() =>
                          navigate("/dashboard/user/profile", {
                            state: "http://localhost:3000/cart",
                          })
                        }
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Please Login to checkout
                      </button>
                    )}
                  </div>
                </>
              )}
              <div className="mt-2">
                {!clientToken || !cart.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn btn-warning"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "processing..." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Container>
  );
};

export default Cart;
const Container = styled.div`
  .pro-details {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-start;
    padding-left: 4rem;
    padding-top: 2rem;
  }
`;
