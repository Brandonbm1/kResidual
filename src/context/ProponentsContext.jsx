import { createContext, useContext, useState, useEffect } from "react";

export const ProponentContext = createContext();

export const useProponentContext = () => {
  return useContext(ProponentContext);
};

export const ProponentContextProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalComponents, setModalComponents] = useState({});
  const [proponentes, setProponentes] = useState([]);
  const [infoGeneral, setInfoGeneral] = useState({});

  const handleOpenModal = (boolean) => {
    setOpenModal(boolean);
  };

  const value = {
    openModal,
    handleOpenModal,
    modalComponents,
    setModalComponents,
    proponentes,
    setProponentes,
    infoGeneral,
    setInfoGeneral,
  };
  return (
    <ProponentContext.Provider value={value}>
      {children}
    </ProponentContext.Provider>
  );
};
