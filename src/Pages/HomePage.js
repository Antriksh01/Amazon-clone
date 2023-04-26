import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Layout title={"Home - amazon"}>
        <div>{JSON.stringify(auth, null, 4)}</div>
      </Layout>
    </>
  );
};

export default HomePage;
