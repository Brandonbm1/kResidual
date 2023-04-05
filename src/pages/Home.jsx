import React from "react";
import Hero from "../components/Hero";
import ProponentePage from "../components/ProponentePage";
import ContratoPage from "../components/ContratoPage";
import Modal from "../components/Modal";
import Report from "../components/Report";
import Nav from "../components/Nav";

const Home = () => {
  return (
    <>
      <Nav />
      <Hero />
      <ProponentePage />
      <ContratoPage />
      <Modal />
      <Report />
      {/* <Prueba /> */}
    </>
  );
};

export default Home;
