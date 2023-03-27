import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSave } from "react-icons/ai";
// import { BsChevronDoubleDown } from "react-icons/bs";
import { useProponentContext } from "../context/ProponentsContext";

const initialForm = {
  advance: "",
  budget: "",
  dolarPrice: "",
  estimatedTerm: "",
  presentationDate: "",
};
const Hero = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(initialForm);
  const { setInfoGeneral } = useProponentContext();

  const onSubmit = (data) => {
    setInfoGeneral(data);
    // reset();
  };
  const isSubmitSuccessful = true;

  return (
    <section className="hero">
      <article className="hero__content">
        <header className="hero__header">
          <h3 className="hero__title">
            Informacion genereal del proceso de contratacion
          </h3>
        </header>
        <main className="hero__main">
          <form onSubmit={handleSubmit(onSubmit)} className="form heroForm">
            <div className="form__group heroForm">
              <label
                htmlFor="dolarPrice"
                className={`form__label heroForm ${
                  errors.dolarPrice ? "error" : ""
                }`}
              >
                Valor del dolar
              </label>
              <input
                type="text"
                id="dolarPrice"
                placeholder="Valor del dolar hoy (COP)"
                token="$"
                {...register("dolarPrice", {
                  required: {
                    value: true,
                    message: "Field required",
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: "Just numbers in this field",
                  },
                })}
                className={`form__input heroForm ${
                  errors.dolarPrice ? "error" : ""
                }`}
              />
            </div>
            <div className="form__group heroForm">
              <label
                htmlFor="estimatedTerm"
                className={`form__label heroForm ${
                  errors.estimatedTerm ? "error" : ""
                }`}
              >
                Plazo estimado (Meses)
              </label>
              <input
                type="text"
                id="estimatedTerm"
                placeholder="¿Cuantos meses tiene de plazo?"
                token=""
                {...register("estimatedTerm", {
                  required: {
                    value: true,
                    message: "Field required",
                  },
                  patter: {
                    value: /^\d+$/,
                    message: "Just numbers in this field",
                  },
                })}
                className={`form__input heroForm ${
                  errors.estimatedTerm ? "error" : ""
                }`}
              />
            </div>

            <div className="form__group heroForm">
              <label
                htmlFor="presentationDate"
                className={`form__label heroForm ${
                  errors.presentationDate ? "error" : ""
                }`}
              >
                Fecha de presentación
              </label>
              <input
                type="date"
                id="presentationDate"
                token=""
                {...register("presentationDate", {
                  required: {
                    value: true,
                    message: "Field required",
                  },
                })}
                className={`form__input heroForm ${
                  errors.presentationDate ? "error" : ""
                }`}
              />
            </div>
            <div className="form__group heroForm">
              <label
                htmlFor="advance"
                className={`form__label heroForm ${
                  errors.advance ? "error" : ""
                }`}
              >
                Anticipo
              </label>
              <input
                type="text"
                id="advance"
                placeholder="Valor del anticipo (%)"
                token="%"
                {...register("advance", {
                  required: {
                    value: true,
                    message: "Field required",
                  },
                  pattern: {
                    value: /^([0-9][0-9]?|100)$/,
                    message: "Maximum 100",
                  },
                })}
                className={`form__input heroForm ${
                  errors.advance ? "error" : ""
                }`}
              />
            </div>
            <div className="form__group heroForm fullRow">
              <label
                htmlFor="budget"
                className={`form__label heroForm ${
                  errors.budget ? "error" : ""
                }`}
              >
                Presupuesto estimado
              </label>
              <input
                type="text"
                id="budget"
                placeholder="Valor del proyecto (USD)"
                token="$"
                {...register("budget", {
                  required: {
                    value: true,
                    message: "Field required",
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: "Just numbers in this field",
                  },
                })}
                className={`form__input heroForm ${
                  errors.budget ? "error" : ""
                }`}
              />
            </div>

            <button
              className={`button form__button heroForm fullRow ${
                isSubmitSuccessful ? "successful" : ""
              }`}
            >
              <AiOutlineSave
                className={`${isSubmitSuccessful ? "successful" : ""}`}
              />
            </button>
          </form>
        </main>
      </article>
    </section>
  );
};

export default Hero;
