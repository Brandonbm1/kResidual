import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useProponentContext } from "../context/ProponentsContext";
import { calculateKResidual, calculateSCE } from "../hooks/useCalculate";

const ContratoFormModal = () => {
  const {
    handleOpenModal,
    modalComponents: { object },
    setProponentes,
    proponentes,
    infoGeneral,
  } = useProponentContext();

  const defaultForm = {
    contractPrice: object?.contractPrice || "",
    startDate: object?.startDate || "",
    term: object?.term || "",
    isPlural: object?.isPlural || "",
    participation: object?.participation || "",
    isSuspended: object?.isSuspended || "",
    suspentionDate: object?.suspentionDate || "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm(defaultForm);
  useEffect(() => {
    reset(defaultForm);
  }, [reset]);

  const onSubmit = (data) => {
    const index = object.index;
    const proponenteIndex = proponentes.findIndex((proponente) =>
      proponente.contracts.some((contrato) => contrato.index === index)
    );
    const newProponentes = [...proponentes];
    data.index = index;
    const contratos = [...newProponentes[proponenteIndex].contracts];
    if (data.isPlural === "") data.isPlural = "No";
    if (data.isPlural === "No") data.participation = 100;
    if (data.isSuspended === "") data.isSuspended = "No";
    if (data.isSuspended === "No")
      data.suspentionDate = infoGeneral.presentationDate;

    data.contractPrice = Number(data.contractPrice.split(".").join(""));

    const contratoIndexInProponente = contratos.findIndex(
      (c) => c.index === index
    );
    contratos[contratoIndexInProponente] = data;

    newProponentes[proponenteIndex].contracts = contratos;
    newProponentes[proponenteIndex].sce = calculateSCE(
      newProponentes[proponenteIndex],
      infoGeneral
    );
    // newProponentes[proponenteIndex].kResidual = calculateKResidual(
    //   newProponentes[proponenteIndex]
    // );

    reset(defaultForm);
    setProponentes(newProponentes);
    handleOpenModal(false);
  };
  return (
    <form className="form contractForm" onSubmit={handleSubmit(onSubmit)}>
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
      <button className="button form__button contractForm fullRow">
        Guardar
      </button>
    </form>
  );
};

export default ContratoFormModal;
