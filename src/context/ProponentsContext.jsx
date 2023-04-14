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
  const [error, setError] = useState(null);

  const handleOpenModal = (boolean) => {
    setOpenModal(boolean);
  };
  const validatePercentageParticipation = () => {
    if (proponentes.length == 0) {
      return { valid: false, message: "No hay proponentes" };
    }
    let totalPercentage = 0;
    proponentes.map((proponente) => {
      totalPercentage += Number(proponente.participation);
    });
    if (totalPercentage !== 100)
      return {
        valid: false,
        message:
          "Error al digitar el porcentaje de participación de los proponentes",
      };
    return { valid: true, message: "Ok" };
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
    validatePercentageParticipation,
    error,
    setError,
  };
  return (
    <ProponentContext.Provider value={value}>
      {children}
    </ProponentContext.Provider>
  );
};
