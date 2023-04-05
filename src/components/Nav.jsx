import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut, IoIosPaper } from "react-icons/io";
import { BsFillPeopleFill, BsFillClipboard2CheckFill } from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";
import { scrollToElement } from "../hooks/useCalculate";
import { useProponentContext } from "../context/ProponentsContext";

const Nav = () => {
  const { logOut } = useAuthContext();
  const handleLogOut = async () => {
    await logOut();
  };
  const { infoGeneral } = useProponentContext();
  return (
    <section className="nav">
      <div className="nav__group">
        <button className="nav__button logout" onClick={handleLogOut}>
          <IoMdLogOut />
          <span className="nav__description">Salir</span>
        </button>
      </div>
      <div className="nav__group">
        <button
          className="nav__button logout"
          onClick={() => scrollToElement("hero")}
        >
          <AiFillInfoCircle />
          <span className="nav__description">Info General</span>
        </button>
      </div>
      <div className="nav__group">
        <button
          className="nav__button logout"
          onClick={() => scrollToElement("proponente")}
        >
          <BsFillPeopleFill />
          <span className="nav__description">Info proponentes</span>
        </button>
      </div>
      <div className="nav__group">
        <button
          className="nav__button logout"
          onClick={() => scrollToElement("contract")}
        >
          <IoIosPaper />
          <span className="nav__description">Info Contratos</span>
        </button>
      </div>

      {infoGeneral.isValid && (
        <div className="nav__group">
          <button
            className="nav__button logout"
            onClick={() => scrollToElement("contract")}
          >
            <BsFillClipboard2CheckFill />
            <span className="nav__description">Reporte</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Nav;
