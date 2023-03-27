import React from "react";
import { useProponentContext } from "../context/ProponentsContext";
import { calculateKResidual, calculateSCE } from "../hooks/useCalculate";
import ContratoCard from "./ContratoCard";

const ContratoPage = () => {
  const { proponentes, setProponentes, infoGeneral, setInfoGeneral } =
    useProponentContext();

  const obtainKresidual = () => {
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
          (Number(newInfoGeneral.budget) * Number(newInfoGeneral.advance)) / 100
      )
        isAcepted = true;
      newInfoGeneral.isAcepted = isAcepted;
      newInfoGeneral.kResidualGeneral = Math.round(kResidualGeneral);
      setProponentes(newProponentes);
      setInfoGeneral(newInfoGeneral);
      console.log(newInfoGeneral);
    }
  };

  return (
    <section className="contract">
      <div className="container">
        <header className="contract__header">
          <h2 className="contract__title">
            Información de los contratos en curso
          </h2>
        </header>
        <br />
        <main className="contract__main">
          {proponentes &&
            proponentes.map((proponente) => (
              <>
                <section className="contract__basicInformation">
                  <h3 className="index" key={proponente.index}>
                    Proponente {proponente.name}
                  </h3>
                </section>
                <section className="contract__grid">
                  {proponente?.contracts?.map((contract, index) => (
                    <ContratoCard key={index} contract={contract} />
                  ))}
                </section>
              </>
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
