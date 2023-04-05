import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const { register, handleSubmit } = useForm();
  const { signUp } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    try {
      await signUp(email, password);
      navigate("/kResidual/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <section className="register">
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
          <button className="button form__button">Registrar</button>
        </form>
      </section>
    </div>
  );
};

export default Register;
