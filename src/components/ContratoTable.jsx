import React from "react";
import { useEffect } from "react";

const ContratoTable = ({ contracts }) => {
  // useEffect(() => {
  //   console.log(contracts);
  // }, [contracts]);
  return (
    <table className="contract__table">
      <thead className="contract__table-header">
        <tr className="contract__table-row">
          <th className="contract__table-data">Valor del contrato ($)</th>
          <th className="contract__table-data">Fecha de inicio </th>
          <th className="contract__table-data">Plazo de ejecución</th>
          <th className="contract__table-data">¿Es oferente plural?</th>
          <th className="contract__table-data">Participación</th>
          <th className="contract__table-data">¿Está suspendido?</th>
          <th className="contract__table-data">Fecha de suspension</th>
        </tr>
      </thead>
      <tbody>
        {contracts &&
          contracts.map((contract, i) => {
            return (
              <tr key={i} className="contract__table-row">
                <td className="contract__table-data">
                  {contract.contractPriceFormat}
                </td>
                <td className="contract__table-data">
                  {contract.startDateFormat}
                </td>
                <td className="contract__table-data">{contract.term}</td>
                <td className="contract__table-data">{contract.isPlural}</td>
                <td className="contract__table-data">
                  {contract.participationFormat}
                </td>
                <td className="contract__table-data">{contract.isSuspended}</td>
                <td className="contract__table-data">
                  {contract.suspentionDateFormat}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default ContratoTable;
