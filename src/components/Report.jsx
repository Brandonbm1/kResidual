import { useEffect } from "react";
import { useProponentContext } from "../context/ProponentsContext";
const Report = () => {
  const { proponentes, infoGeneral } = useProponentContext();

  if (!infoGeneral.kResidualGeneral) return;
  useEffect(() => {
    let monedas = document.querySelectorAll(".monedas");
    monedas.forEach((moneda) => {
      let valor = parseInt(moneda.innerText);
      let formato = valor.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
      });
      moneda.innerText = formato;
    });
  }, []);

  return (
    <section className="report">
      <div className="container">
        <article className="report__details">
          <aside className="report__labels">
            <p className="report__labels-label">Proponente:</p>
            <p className="report__labels-label">Capacidad Organizacional:</p>
            <p className="report__labels-label">Capacidad Tecnica:</p>
            <p className="report__labels-label">Capacidad Financiera:</p>
            <p className="report__labels-label">Saldo Contrato en Ejecución:</p>
            <p className="report__labels-label">Calculo:</p>
          </aside>
          {proponentes.map((proponente, index) => {
            return (
              <section className="report__labels" key={index}>
                <p className="report__labels-label strong">{proponente.name}</p>
                <p className="report__labels-label moneda">
                  $ {proponente.bestIncome}
                </p>
                <p className="report__labels-label">
                  {proponente.tecnicCapabilityValue}
                </p>
                <p className="report__labels-label">
                  {proponente.financialCapabilityValue}
                </p>
                <p className="report__labels-label moneda">
                  $ {proponente.sce}
                </p>
                <p className="report__labels-label moneda">
                  $ {proponente.kResidual}
                </p>
              </section>
            );
          })}
        </article>
        <section className="report__results">
          <article className="report__results-group">
            <p className="report__results-label">
              Capacidad Residual del proponente:{" "}
            </p>
            <p className="report__results-value moneda">
              $ {infoGeneral.kResidualGeneral}
            </p>
          </article>
          <article className="report__results-group">
            <p className="report__results-label">
              Presupuesto estimado del proceso de contratacion:
            </p>
            <p className="report__results-value">$ {infoGeneral.budget}</p>
          </article>
          <article className="report__results-group">
            <p className="report__results-label">
              Capacidad residual del proceso de contratacion:
            </p>
            <p className="report__results-value moneda">
              ${" "}
              {Number(infoGeneral.budget) -
                (Number(infoGeneral.budget) * Number(infoGeneral.advance)) /
                  100}
            </p>
          </article>
          <article className="report__results-group">
            <p className="report__results-label">
              ¿El proponente cumple la capacidad residual?:
            </p>
            <p
              className={`report__results-value acepted ${
                infoGeneral.isAcepted ? "valid" : ""
              }`}
            >
              {infoGeneral.isAcepted ? "Si" : "No"}
            </p>
          </article>
        </section>
      </div>
    </section>
  );
};

export default Report;
