import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const saveCart = getDatabaseCart();
    //const orderDetails = { ...loggedInUser, products: saveCart}
    fetch("http://localhost:3045/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveCart),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder();
          console.log("your order placed successfully!!!!!!!!");
        }
      });
  };
  return (
    <div className="row">
      <div className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            defaultValue={loggedInUser.displayName}
            {...register("name", { required: true })}
            placeholder="Your name"
          />
          {errors.name && <span className="error">name is required</span>}
          <input
            name="email"
            defaultValue={loggedInUser.email}
            {...register("email", { required: true })}
            placeholder="Your Email"
          />
          {errors.email && <span className="error">email is required</span>}
          <input
            name="address"
            {...register("address", { required: true })}
            placeholder="Your address"
          />
          {errors.address && <span className="error">address is required</span>}
          <input
            name="phone"
            {...register("phone", { required: true })}
            placeholder="Your phone number"
          />
          {errors.phone && (
            <span className="error">phone number is required</span>
          )}
          <input type="submit" />
        </form>
      </div>
      {/* <div className="col-md-6">
        <h2>pay for me</h2>
      </div> */}
    </div>
  );
};

export default Shipment;
