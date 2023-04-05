import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useState } from "react";

const Login = () => {
  const [error, setError] = useState();
  const { signIn, resetPassword } = useAuthContext();
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    try {
      await signIn(email, password);
      navigate("/kResidual/");
      setError("");
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError("Usuario o contraseña incorrecta");
      }
    }
  };
  const handleReset = async (e) => {
    e.preventDefault();
    const { email } = getValues();
    if (!email) return setError("Ingrese un correo");
    try {
      await resetPassword(email);
      setError(
        "Se te ha enviado un correo para que puedas reiniciar tu contraseña"
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="register">
      {error && <span className="registerForm__error">{error}</span>}
      <form className="form registerForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__group registerForm">
          <label htmlFor="email" className="form__label registerForm">
            Email
          </label>
          <input
            className="form__input registerForm"
            id="email"
            type="email"
            {...register("email", {
              required: {
                value: true,
              },
            })}
          />
        </div>
        <div className="form__group registerForm">
          <label htmlFor="password" className="form__label registerForm">
            Password
          </label>
          <input
            className="form__input registerForm"
            id="password"
            type="password"
            {...register("password", {
              required: {
                value: true,
              },
            })}
          />
        </div>

        <div className="form__group registerForm">
          <a
            href="/kResidual/login"
            className="form__label registerForm reset"
            onClick={handleReset}
          >
            Cambiar contraseña
          </a>
        </div>
        <button className="button form__button">Ingresar</button>
      </form>
    </section>
  );
};

export default Login;
