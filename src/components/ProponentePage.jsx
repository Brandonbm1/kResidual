import React, { useState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useProponentContext } from "../context/ProponentsContext";
import ProponenteCard from "./ProponenteCard";

const initialForm = {
  nameProponent: "",
  isPlural: false,
  quantityProponent: "",
};
const ProponentePage = () => {
  const [numProponentes, setNumProponentes] = useState(null);
  const { proponentes, setProponentes } = useProponentContext();
  const [isPlural, setIsPlural] = useState(false);
  const [proponentesToRender, setproponentesToRender] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm(initialForm);

  useEffect(() => {
    setproponentesToRender(proponentes);
  }, [proponentes]);

  const onSubmit = ({ isPlural, quantityProponent, nameProponent }) => {
    let quantProps;
    let name = "";
    let participation;
    const newProponents = [];

    if (isPlural == "Si") quantProps = quantityProponent;
    else {
      quantProps = 1;
      participation = 100;
    }

    for (let i = 0; i < quantProps; i++) {
      if (i === 0) name = nameProponent;
      else name = "";
      newProponents.push({ index: i + 1, name, participation });
    }
    setNumProponentes(quantityProponent);
    setProponentes(newProponents);
    // reset();
  };
  return (
    <section className="proponent" id="proponente">
      <div className="container">
        <header className="proponent__header">
          <h2 className="proponent__title">Informacion del proponente</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__group">
              <label htmlFor="nameProponent" className="form__label">
                Nombre del proponente
              </label>
              <input
                id="nameProponent"
                className={`form__input ${errors.nameProponent ? "error" : ""}`}
                {...register("nameProponent", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              {errors.nameProponent && (
                <span>{errors.nameProponent.message}</span>
              )}
            </div>
            <div className="form__group">
              <label htmlFor="isPlural" className="form__label">
                ¿Es proponente plural?
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
              {errors.isPlural && <span>{errors.isPlural.message}</span>}
            </div>
            <div className="form__group">
              <label htmlFor="quantityProponent" className="form__label">
                Cantidad de proponentes
              </label>
              <input
                id="quantityProponent"
                className={`form__input ${
                  errors.quantityProponent ? "error" : ""
                }`}
                {...register("quantityProponent", {
                  required: {
                    value: true,
                    message: "Quantity is a required field",
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: "Just numbers in this field",
                  },
                })}
              />
            </div>
            <button className="button form__button">Guardar</button>
          </form>
        </header>
        <main className="proponent__main">
          {proponentesToRender &&
            proponentesToRender.map((proponente, index) => (
              <ProponenteCard proponente={proponente} key={index} />
            ))}
        </main>
        <footer className="proponent__footer"></footer>
      </div>
    </section>
  );
};

export default ProponentePage;
