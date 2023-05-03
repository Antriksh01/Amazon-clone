import React from "react";
import Layout from "../components/Layout/Layout";
import styled from "styled-components";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

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
              <h4>Total :</h4>
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
