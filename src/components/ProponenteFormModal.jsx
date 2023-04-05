import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useProponentContext } from "../context/ProponentsContext";
import {
  calculateExperience,
  calculateFinancialCapability,
  calculateTecniqueCapability,
  calculateSCE,
  calculateKResidual,
} from "../hooks/useCalculate";

const arrayOfIndex = [];
const getRandomNumber = (numMin, numMax) => {
  const randomNumber =
    Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;
  if (arrayOfIndex.includes(randomNumber)) {
    return getRandomNumber(numMin, numMax);
  }
  arrayOfIndex.push(randomNumber);
  return randomNumber;
};

const ProponenteFormModal = () => {
  const {
    modalComponents: { object },
    setProponentes,
    handleOpenModal,
    infoGeneral,
  } = useProponentContext();

  const defaultForm = {
    name: object?.name || "",
    participation: object?.participation || "",
    overThanAYear: object?.overThanAYear || "",
    bestIncome: object?.bestIncome || "",
    financialCapability: object?.financialCapability || "",
    tecnicCapability: object?.tecnicCapability || "",
    experience: object?.experience || "",
    haveContracts: object?.haveContracts || "",
    numContracts: object?.numContracts || "",
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

    data.index = index;
    data.bestIncome = Number(data.bestIncome);
    if (data.haveContracts === "") data.haveContracts = "No";
    if (data.overThanAYear === "") data.overThanAYear = "No";
    if (
      data.overThanAYear === "No" ||
      data.bestIncome < infoGeneral?.dolarPrice * 125000
    )
      data.bestIncome = infoGeneral?.dolarPrice * 125000;
    const contratos = [];
    /**
     for (let i = 0; i < data.numContracts; i++) {
      const newContract = {
        index: getRandomNumber(150, 100000),
        contractPrice: "",
        startDate: "",
        term: "",
        isPlural: "",
        participation: "",
        isSuspended: "",
        suspentionDate: "",
      };
      contratos.push(newContract);
    }
     */

    data.numContracts = 0;
    data.contracts = contratos;
    data.sce = 0;
    data.kResidual = 0;
    data.financialCapability = Number(data.financialCapability);
    data.tecnicCapability = Number(data.tecnicCapability);
    data.experience = Number(data.experience);
    data.experienceValue = calculateExperience(data, infoGeneral);
    data.financialCapabilityValue = calculateFinancialCapability(data);
    data.tecnicCapabilityValue = calculateTecniqueCapability(data);

    // data.sce = calculateSCE(data, infoGeneral);
    // data.kresidual = calculateKResidual(data);

    setProponentes((prevState) => {
      const listProponents = [...prevState];

      const objectIndex = listProponents.findIndex(
        (obj) => obj.index === index
      );
      if (objectIndex !== -1) {
        listProponents[objectIndex] = data;
      }

      return listProponents;
    });
    handleOpenModal(false);
  };

  return (
    <form className="form proponente" onSubmit={handleSubmit(onSubmit)}>
      {/* name */}
      <div className="form__group proponente fullRow">
        <label
          htmlFor="name"
          className={`form__label proponente ${errors.name ? "error" : ""}`}
        >
          Nombre del proponente
        </label>
        <input
          id="name"
          type="text"
          className={`form__input proponente ${errors.name ? "error" : ""}`}
          {...register("name", {
            required: {
              value: true,
              message: "Field required",
            },
          })}
        />
      </div>
      {/* participation */}
      <div className="form__group proponente">
        <label
          htmlFor="participation"
          className={`form__label proponente ${
            errors.participation ? "error" : ""
          }`}
        >
          Participación (%)
        </label>
        <input
          type="text"
          id="participation"
          className={`form__input proponente ${
            errors.participation ? "error" : ""
          }`}
          {...register("participation", {
            required: {
              value: true,
              message: "Field required",
            },
            pattern: {
              value: /^([0-9][0-9]?|100)$/,
              message: "Maximum 100",
            },
          })}
        />
      </div>

      {/* overThanAYear */}
      <div className="form__group proponente">
        <label
          htmlFor="overThanAYear"
          className={`form__label proponente ${
            errors.overThanAYear ? "error" : ""
          }`}
        >
          Más de un año de información financiera
        </label>
        <Controller
          name="overThanAYear"
          control={control}
          defaultValue="No"
          render={({ field }) => (
            <select
              {...field}
              id="overThanAYear"
              className={`form__input ${errors.overThanAYear ? "error" : ""}`}
            >
              <option value="No">No</option>
              <option value="Si">Si</option>
            </select>
          )}
        />
      </div>
      {/** bestIncome */}
      <div className="form__group proponente ">
        <label
          htmlFor="bestIncome"
          className={`form__label proponente ${
            errors.bestIncome ? "error" : ""
          }`}
        >
          Mejor ingreso en los ultimos 5 años
        </label>
        <input
          type="text"
          id="bestIncome"
          className={`form__input proponente ${
            errors.bestIncome ? "error" : ""
          }`}
          {...register("bestIncome", {
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

      {/** experience */}
      <div className="form__group proponente ">
        <label
          htmlFor="experience"
          className={`form__label proponente ${
            errors.experience ? "error" : ""
          }`}
        >
          Experiencia
        </label>
        <input
          type="text"
          id="experience"
          className={`form__input proponente ${
            errors.experience ? "error" : ""
          }`}
          {...register("experience", {
            required: {
              value: true,
              message: "Field required",
            },
            pattern: {
              value: /^\d+$/,
            },
          })}
        />
      </div>
      {/** tecnicCapability */}
      <div className="form__group proponente">
        <label
          htmlFor="tecnicCapability"
          className={`form__label proponente ${
            errors.tecnicCapability ? "error" : ""
          }`}
        >
          Capacidad tecnica
        </label>
        <input
          type="text"
          id="tecnicCapability"
          className={`form__input proponente ${
            errors.tecnicCapability ? "error" : ""
          }`}
          {...register("tecnicCapability", {
            required: {
              value: true,
              message: "Field required",
            },
            pattern: {
              value: /^\d+$/,
              message: "Only decimals",
            },
          })}
        />
      </div>
      {/** financialCapability */}
      <div className="form__group proponente">
        <label
          htmlFor="financialCapability"
          className={`form__label proponente ${
            errors.financialCapability ? "error" : ""
          }`}
        >
          Capacidad financiera
        </label>
        <input
          type="text"
          id="financialCapability"
          className={`form__input proponente ${
            errors.financialCapability ? "error" : ""
          }`}
          {...register("financialCapability", {
            required: {
              value: true,
              message: "Field required",
            },
            pattern: {
              value: /^\d+(\.\d+)?$/,
              message: "Only decimals",
            },
          })}
        />
      </div>

      <button className="button form__button proponente">Guardar</button>
    </form>
  );
};

export default ProponenteFormModal;
