import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import './Shipment.css';
import { UserContext } from "../../App";

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("example"));

  return (
    
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your name"/>
      {errors.name && <span className="error">name is required</span>}
      <input name="email" defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email"/>
      {errors.email && <span className="error">email is required</span>}
      <input name="address" {...register("address", { required: true })} placeholder="Your address"/>
      {errors.address && <span className="error">address is required</span>}
      <input name="phone" {...register("phone", { required: true })} placeholder="Your phone number"/>
      {errors.phone && <span className="error">phone number is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;
