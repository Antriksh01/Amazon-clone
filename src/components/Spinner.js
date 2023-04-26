import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate(`/${path}`, { state: location.pathname });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <div
        class="d-flex justify-content-center align-items-center flex-column"
        style={{ height: "100vh" }}
      >
        <h1 className="text-center">redirecting to you in {count} second</h1>
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
