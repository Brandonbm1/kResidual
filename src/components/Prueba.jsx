import { useState } from "react";
import { useForm } from "react-hook-form";

const Prueba = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <FormattedInput
        label="Valor 1"
        name="valor1"
        register={register}
        required
      />
      <FormattedInput
        label="Valor 2"
        name="valor2"
        register={register}
        required
      />
      <FormattedInput
        label="Valor 3"
        name="valor3"
        register={register}
        required
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Prueba;

const FormattedInput = ({ label, name, register, ...rest }) => {
  const [formattedValue, setFormattedValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    // val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const formattedVal = Number(val).toLocaleString("es-AR");
    setInputValue(val); // actualizar el estado inputValue
    setFormattedValue(formattedVal);
  };

  const handleInputBlur = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedVal = Number(value).toLocaleString("es-AR");
    setInputValue(value);
    setFormattedValue(formattedVal);
  };

  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        name={name}
        onChange={handleChange}
        onBlur={handleInputBlur}
        value={formattedValue}
        {...register(name)}
        {...rest}
      />
    </div>
  );
};
