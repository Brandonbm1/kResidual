import React, { useState, useEffect } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { SlClose } from "react-icons/sl";
import { useProponentContext } from "../context/ProponentsContext";
import ContratoFormModal from "./ContratoFormModal";

const ContratoCard = ({ contract }) => {
  const [basicInformationValidate, setBasicInformationValidate] =
    useState(false);
  const { handleOpenModal, setModalComponents } = useProponentContext();
  const [validInformation, setValidInformation] = useState(false);
  const modalComponents = <ContratoFormModal />;
  const handleModal = () => {
    handleOpenModal(true);
    setModalComponents({
      components: modalComponents,
      object: contract,
    });
  };
  useEffect(() => {
    let validation = false;
    // if (contract.haveContracts === "No") validationContracts = true;
    // else if (contract.numContracts > 0) validationContracts = true;

    if (
      contract.contractPrice &&
      contract.isPlural &&
      contract.isSuspended &&
      contract.participation &&
      contract.startDate &&
      contract.suspentionDate &&
      contract.term
    )
      validation = true;
    setValidInformation(validation);
  }, [contract]);
  return (
    <article className="contractCard" onClick={handleModal}>
      <main className="contractCard__main">
        <section className="contractCard__information">
          <p className="contractCard__information-label">Valor del contrato:</p>
          {contract.contractPrice && (
            <span className="contractCard__information-field">
              {contract.contractPrice}
            </span>
          )}
          {contract.contractPrice ? (
            <BsCheckCircle className="proponentCard__checker valid" />
          ) : (
            <SlClose className="proponentCard__checker" />
          )}
        </section>
        <section className="contractCard__information">
          <p className="contractCard__information-label">
            Inicio del contrato:
          </p>
          {contract.startDate && (
            <span className="contractCard__information-field">
              {contract.startDate}
            </span>
          )}
          {contract.startDate ? (
            <BsCheckCircle className="proponentCard__checker valid" />
          ) : (
            <SlClose className="proponentCard__checker" />
          )}
        </section>
        <section className="contractCard__information">
          <p className="contractCard__information-label">% de Participación:</p>
          {contract.participation && (
            <span className="contractCard__information-field">
              {contract.participation}
            </span>
          )}
          {contract.participation ? (
            <BsCheckCircle className="proponentCard__checker valid" />
          ) : (
            <SlClose className="proponentCard__checker" />
          )}
        </section>
        <section className="contractCard__information">
          <p className="contractCard__information-label">¿Está suspendido?:</p>
          {contract.isSuspended && (
            <span className="contractCard__information-field">
              {contract.isSuspended}
            </span>
          )}
          {contract.isSuspended ? (
            <BsCheckCircle className="proponentCard__checker valid" />
          ) : (
            <SlClose className="proponentCard__checker" />
          )}
        </section>
      </main>
      <footer className="contractCard__footer">
        <span className="contractCard__footer-label">
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

export default ContratoCard;
