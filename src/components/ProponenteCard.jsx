import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { SlClose } from "react-icons/sl";
import ProponenteFormModal from "./ProponenteFormModal";
import { useProponentContext } from "../context/ProponentsContext";

const ProponenteCard = ({ proponente }) => {
  const [validInformation, setValidInformation] = useState(false);
  const { handleOpenModal, setModalComponents } = useProponentContext();
  const [validContracts, setValidContracts] = useState(false);

  useEffect(() => {
    let validation = false;
    let validationContracts = false;
    console.log({ proponente });
    if (proponente.haveContracts === "No") validationContracts = true;
    else if (proponente.numContracts > 0) validationContracts = true;

    if (
      proponente.name &&
      proponente.participation &&
      proponente.bestIncome &&
      proponente.financialCapability &&
      proponente.tecnicCapability &&
      proponente.experience &&
      validationContracts
    )
      validation = true;
    setValidContracts(validationContracts);
    setValidInformation(validation);
  }, [proponente]);

  const modalComponents = <ProponenteFormModal />;

  const handleModal = () => {
    handleOpenModal(true);
    setModalComponents({
      components: modalComponents,
      object: proponente,
    });
  };

  return (
    <article className="proponentCard" onClick={() => handleModal()}>
      <h3 className={`proponentCard__title`}>Proponente #{proponente.index}</h3>
      <main className="proponentCard__information">
        <section className="proponentCard__information-section">
          <p className="proponentCard__information-label">Nombre proponente:</p>
          {proponente.name && (
            <span className="proponentCard__information-field">
              {proponente.name}
            </span>
          )}
          {proponente.name ? (
            <BsCheckCircle className="proponentCard__checker valid" />
          ) : (
            <SlClose className="proponentCard__checker" />
          )}
        </section>
        <section className="proponentCard__information-section">
          <p className="proponentCard__information-label">% Participación: </p>
          {proponente.participation && (
            <span className="proponentCard__information-field">
              {Number(proponente.participation)}
            </span>
          )}
          {proponente.participation ? (
            <BsCheckCircle className="proponentCard__checker valid" />
          ) : (
            <SlClose className="proponentCard__checker" />
          )}
        </section>
        <section className="proponentCard__information-section">
          <p className="proponentCard__information-label">
            Informacion financiera:{" "}
          </p>

          {proponente.bestIncome &&
          proponente.financialCapability &&
          proponente.tecnicCapability &&
          proponente.experience ? (
            <BsCheckCircle className="proponentCard__checker valid" />
          ) : (
            <SlClose className="proponentCard__checker" />
          )}
        </section>
        <section className="proponentCard__information-section">
          <p className="proponentCard__information-label">
            Cantidad de contratos:{" "}
          </p>
          {proponente.haveContracts && (
            <span className="proponentCard__information-field">
              {Number(proponente.numContracts)}
            </span>
          )}
          {validContracts ? (
            <BsCheckCircle className="proponentCard__checker valid" />
          ) : (
            <SlClose className="proponentCard__checker" />
          )}
        </section>
      </main>
      <footer className="proponentCard__footer">
        <span className="proponentCard__footer-label">
          ¿Información completa?:
        </span>
        {validInformation ? (
          <BsCheckCircle className="proponentCard__checker valid" />
        ) : (
          <SlClose className="proponentCard__checker" />
        )}
      </footer>
    </article>
  );
};

export default ProponenteCard;
