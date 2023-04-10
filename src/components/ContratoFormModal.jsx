import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useProponentContext } from "../context/ProponentsContext";
import { calculateKResidual, calculateSCE } from "../hooks/useCalculate";

const ContratoFormModal = () => {
  const [formInputs, setFormInputs] = useState("");
  const [defaultForm, setDefaultForm] = useState({});
  const {
    handleOpenModal,
    modalComponents: { object, mode },
    setProponentes,
    proponentes,
    infoGeneral,
  } = useProponentContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm(defaultForm);
  let defaultAuxForm;
  let inputs;

  if (mode === "multipleContract") {
    defaultAuxForm = {
      contracts: "",
    };
    inputs = (
      <div className="form__group contractForm fullRow">
        <label
          htmlFor="tableData"
          className={`form__label ${errors.tableData ? "error" : ""}`}
        >
          Pegue los contratos en ejecucion
        </label>
        <textarea
          id="tableData"
          className={`form__input textArea ${errors.tableData ? "error" : ""}`}
          {...register("tableData", {
            required: {
              value: true,
            },
          })}
        />
      </div>
    );
  } else {
    defaultAuxForm = {
      contractPrice: object?.contractPrice || "",
      startDate: object?.startDate || "",
      term: object?.term || "",
      isPlural: object?.isPlural || "",
      participation: object?.participation || "",
      isSuspended: object?.isSuspended || "",
      suspentionDate: object?.suspentionDate || "",
    };
    inputs = (
      <>
        <div className="form__group contractForm fullRow">
          <label
            htmlFor="contractPrice"
            className={`form__label contractForm ${
              errors.contractPrice ? "error" : ""
            }`}
          >
            Valor del contrato
          </label>
          <input
            id="contractPrice"
            type="text"
            className={`form__input contractForm ${
              errors.contractPrice ? "error" : ""
            }`}
            {...register("contractPrice", {
              required: {
                value: true,
                message: "Field required",
              },
            })}
          />
          {errors.contractPrice && <span>{errors.contractPrice.message}</span>}
        </div>
        <div className="form__group contractForm">
          <label
            htmlFor="startDate"
            className={`form__label contractForm ${
              errors.startDate ? "error" : ""
            }`}
          >
            Fecha de inicio
          </label>
          <input
            type="date"
            id="startDate"
            className={`form__input contractForm ${
              errors.startDate ? "error" : ""
            }`}
            {...register("startDate", {
              required: {
                value: true,
                message: "Field required",
              },
            })}
          />
        </div>
        <div className="form__group contractForm">
          <label
            htmlFor="term"
            className={`form__label contractForm ${errors.term ? "error" : ""}`}
          >
            Plazo de ejecución
          </label>
          <input
            type="text"
            id="term"
            className={`form__input contractForm ${errors.term ? "error" : ""}`}
            {...register("term", {
              required: {
                value: true,
                message: "Field required",
              },
              pattern: {
                value: /^\d+$/,
                message: "Only numbers",
              },
            })}
          />
        </div>
        <div className="form__group contractForm">
          <label
            htmlFor="isPlural"
            className={`form__label contractForm ${
              errors.isPlural ? "error" : ""
            }`}
          >
            ¿Oferente plural?
          </label>
          <Controller
            name="isPlural"
            control={control}
            defaultValue="No"
            render={({ field }) => (
              <select
                {...field}
                id="isPlural"
                className={`form__input ${errors.isPlural ? "error" : ""}`}
              >
                <option value="No">No</option>
                <option value="Si">Si</option>
              </select>
            )}
          />
        </div>
        <div className="form__group contractForm">
          <label
            htmlFor="participation"
            className={`form__label contractForm ${
              errors.participation ? "error" : ""
            }`}
          >
            Participación (%)
          </label>
          <input
            type="text"
            id="participation"
            className={`form__input contractForm ${
              errors.participation ? "error" : ""
            }`}
            {...register("participation", {
              required: {
                value: true,
                message: "Field required",
              },
              pattern: {
                value: /^\d+$/,
                message: "Only numbers",
              },
            })}
          />
        </div>
        <div className="form__group contractForm">
          <label
            htmlFor="isSuspended"
            className={`form__label contractForm ${
              errors.isSuspended ? "error" : ""
            }`}
          >
            ¿Está suspendido?
          </label>
          <Controller
            name="isSuspended"
            control={control}
            defaultValue="No"
            render={({ field }) => (
              <select
                {...field}
                id="isSuspended"
                className={`form__input ${errors.isSuspended ? "error" : ""}`}
              >
                <option value="No">No</option>
                <option value="Si">Si</option>
              </select>
            )}
          />
        </div>
        <div className="form__group contractForm">
          <label
            htmlFor="suspentionDate"
            className={`form__label contractForm ${
              errors.suspentionDate ? "error" : ""
            }`}
          >
            Fecha de suspensión
          </label>
          <input
            type="date"
            id="suspentionDate"
            className={`form__input contractForm ${
              errors.suspentionDate ? "error" : ""
            }`}
            {...register("suspentionDate", {
              required: {
                value: true,
                message: "Field required",
              },
            })}
          />
        </div>
      </>
    );
  }
  useEffect(() => {
    setDefaultForm(defaultAuxForm);
    setFormInputs(inputs);
  }, []);

  useEffect(() => {
    reset(defaultForm);
  }, [reset]);
  const formatDate = (date) => {
    if (!date) return "";
    const arrDate = date.split("/");
    const fecha = new Date(arrDate[2], arrDate[1] - 1, arrDate[0]);
    const anio = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    return `${anio}-${mes.toString().padStart(2, "0")}-${dia
      .toString()
      .padStart(2, "0")}`;
  };

  const onSubmit = (data) => {
    const index = proponentes.findIndex(
      (proponente) => proponente.index === object.index
    ); /** Indice del proponente */

    const newProponentes = [...proponentes]; /** Copia de los proponentes */
    const contratos = [...newProponentes[index].contracts];

    if (mode === "oneContract") {
      if (data.isPlural === "") data.isPlural = "No";
      if (data.isPlural === "No") data.participation = "100";
      if (data.isSuspended === "") data.isSuspended = "No";
      if (data.isSuspended === "No" || data.isSuspended === "")
        data.suspentionDate = infoGeneral.presentationDate;

      data.contractPrice = data.contractPrice.split(".").join("");

      contratos.push(data);
    } else {
      const rows = data.tableData
        .split("\n")
        .filter((fila) => fila !== "")
        .map((fila) => fila.split("\t"));

      rows.map((row) => {
        const [
          contractPrice,
          startDate,
          term,
          isPlural,
          participation,
          isSuspended,
          suspentionDate,
        ] = row;

        const newContractPrice = contractPrice
          .split(" ")
          .join("")
          .split(".")
          .join("")
          .slice(1, -1);
        const newParticipation = participation.substring(
          0,
          participation.length - 1
        );
        const newStartDate = formatDate(startDate);
        const newSuspentionDate = formatDate(suspentionDate);
        const newContract = {
          contractPrice: Number(newContractPrice),
          contractPriceFormat: contractPrice,
          startDate: newStartDate,
          startDateFormat: startDate,
          term: Number(term),
          isPlural,
          participation: Number(newParticipation),
          participationFormat: participation,
          isSuspended,
          suspentionDate: newSuspentionDate,
          suspentionDateFormat: suspentionDate,
        };
        contratos.push(newContract);
      });
    }

    newProponentes[index].contracts = contratos;
    reset(defaultForm);
    setProponentes(newProponentes);
    handleOpenModal(false);
  };
  return (
    <form className="form contractForm" onSubmit={handleSubmit(onSubmit)}>
      {formInputs}
      <button className="button form__button contractForm fullRow">
        Guardar
      </button>
    </form>
  );
};

export default ContratoFormModal;
