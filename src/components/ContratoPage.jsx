import { useProponentContext } from "../context/ProponentsContext";
import { calculateKResidual, calculateSCE } from "../hooks/useCalculate";
import ContratoFormModal from "./ContratoFormModal";
import ContratoTable from "./ContratoTable";
import { useState } from "react";
import ErrorModal from "./ErrorModal";
import { useEffect } from "react";

const ContratoPage = () => {
  const modalComponents = <ContratoFormModal />;
  const [error, setError] = useState(null);
  const errorModalComponents = <ErrorModal text={error} />;
  const {
    proponentes,
    setProponentes,
    infoGeneral,
    setInfoGeneral,
    handleOpenModal,
    setModalComponents,
  } = useProponentContext();

  useEffect(() => {
    if (error) {
      handleOpenModal(true);
      setModalComponents({
        components: errorModalComponents,
      });
    }
  }, [error]);

  const obtainKresidual = () => {
    try {
      if (infoGeneral.budget) {
        let kResidualGeneral = 0;
        let isAcepted = false;
        const newProponentes = [...proponentes];
        const newInfoGeneral = { ...infoGeneral };

        newProponentes.map((proponente) => {
          const sce = calculateSCE(proponente, infoGeneral);
          proponente.sce = sce;

          proponente.kResidual = calculateKResidual(proponente, infoGeneral);
          kResidualGeneral += proponente.kResidual;
        });

        if (
          kResidualGeneral >
          Number(newInfoGeneral.budget) -
            (Number(newInfoGeneral.budget) * Number(newInfoGeneral.advance)) /
              100
        )
          isAcepted = true;
        newInfoGeneral.isAcepted = isAcepted;
        newInfoGeneral.isValid = true;
        newInfoGeneral.kResidualGeneral = Math.round(kResidualGeneral);

        setProponentes(newProponentes);
        setInfoGeneral(newInfoGeneral);
      } else {
        throw new Error("Ingrese la información general");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleModal = (mode, object) => {
    handleOpenModal(true);
    setModalComponents({
      components: modalComponents,
      mode,
      object,
    });
  };

  return (
    <section className="contract" id="contract">
      <div className="container">
        <header className="contract__header">
          <h2 className="contract__title">
            Información de los contratos en curso
          </h2>
          <a
            href="../../archivo.xlsx"
            target="_blank"
            // rel="noopener noreferrer"
            download="archivo.xlsx"
            className="contract__header-button button"
          >
            Descarga excel base
          </a>
        </header>
        <br />
        <main className="contract__main">
          {proponentes &&
            proponentes.map((proponente, index) => (
              // <div className="contract__card">
              <details key={index} className="contract__details">
                <summary className="contract__basicInformation">
                  <h3
                    className="contract__basicInformation-title"
                    key={proponente.index}
                  >
                    Proponente -- {proponente.name}
                  </h3>
                  <article className="contract__basicInformation-buttons">
                    <button
                      className="contract__basicInformation-button button addOneContract"
                      onClick={() => handleModal("oneContract", proponente)}
                    >
                      +
                    </button>
                    <button
                      className="contract__basicInformation-button button addMultipleContracts"
                      onClick={() =>
                        handleModal("multipleContract", proponente)
                      }
                    >
                      Agregar
                    </button>
                  </article>
                </summary>
                <section className="contract__grid">
                  {proponente?.contracts && (
                    <ContratoTable
                      key={index}
                      contracts={proponente.contracts}
                    />
                  )}
                </section>
              </details>
              // </div>
            ))}
        </main>
        <footer className="contract__footer">
          <button
            className="button contract__footer-button"
            onClick={obtainKresidual}
          >
            Calcular valor k-residual
          </button>
        </footer>
      </div>
    </section>
  );
};

export default ContratoPage;
