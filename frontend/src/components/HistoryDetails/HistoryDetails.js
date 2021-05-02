import React from "react";
import { useForm } from "react-hook-form";

const HistoryDetails = (props) => {
  const { register, handleSubmit } = useForm();

  const { row, deleteOrder } = props;

  return (
    <div className="col s12 m7">
      <div className="card horizontal" style={{ marginBottom: 25 }}>
        <div className="card-image">
          <img src="https://lorempixel.com/100/190/nature/6" alt="" />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>Order Number: {row.order_id}</p>
            <p>Amount: {row.order_amount}</p>
            <p>Address: {row.order_address}</p>
            <p>Date: {row.order_date}</p>
          </div>
          <input
            type="hidden"
            name="order_id"
            value={row.order_id}
            ref={register}></input>
          <button
            onClick={handleSubmit(deleteOrder)}
            className="btn-floating btn-small halfway-fab waves-effect waves-light red">
            <i className="material-icons">delete</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetails;
