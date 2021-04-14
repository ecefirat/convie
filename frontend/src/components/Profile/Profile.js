import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Profile() {
  const { register, handleSubmit } = useForm();
  const [customer_address, setCustomerAddress] = useState("");
  const [customer_name, setCustomerName] = useState("");
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/sessionInfo", {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setCustomerAddress(data.user.customer_address);
          setCustomerName(data.user.customer_name);
          setImagePath(data.user.imagePath);
        });
      } else if (res.status === 400) {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
  }, []);

  const handleAddress = (data) => {
    console.log(data);
    fetch("http://localhost:5000/customerAddress", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 404) {
        console.log("couldnt change");
      }
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          console.log("address above");
        });
      }
    });
  };

  const uploadImage = async (data) => {
    const formData = new FormData();
    formData.append("picture", data.picture[0]);
    console.log(formData);

    const res = await fetch("http://localhost:5000/picture", {
      method: "POST",
      body: formData,
      credentials: "include",
    }).then((res) => res.json());
    const newImagePath = "http://localhost:5000/uploads/" + res.picture.name;
    console.log(newImagePath);
    setImagePath(newImagePath);

    //   const uploadImage = (data) => {

    //     fetch("http://localhost:5000/picture", {
    //       method: "POST",
    //       body: JSON.stringify(data),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       credentials: "include",
    //     });
    //   };

    //   {
    //     if (res.status === 404) {
    //       console.log("image upload failed");
    //     } else if (res.status === 200) {
    //       res.json().then((imagePath) => {
    //         console.log(imagePath);
    //         console.log("pic above");
    //       });
    //     }
    //   }
    //   );
  };

  return (
    <div className="container">
      <h2>Hi {customer_name}!</h2>
      <h5>Edit Address</h5>
      <p>{customer_address}</p>
      <input
        type="text"
        placeholder="Enter new address..."
        name="customer_address"
        ref={register}
        style={{ marginBottom: 15 }}
      />
      <button
        className="btn waves-effect waves-light green"
        style={{ marginBottom: 10 }}
        onClick={handleSubmit(handleAddress)}>
        submit
      </button>
      <input
        type="hidden"
        value={customer_name}
        name="customer_name"
        ref={register}
      />
      <h5>Change Profile Picture</h5>
      <input
        type="file"
        name="picture"
        ref={register}
        style={{ marginBottom: 15 }}
      />
      <button
        className="btn waves-effect waves-light green"
        style={{ marginBottom: 10 }}
        onClick={handleSubmit(uploadImage)}>
        upload
      </button>
      {imagePath ? (
        <img src={imagePath} alt="img" width="200px" height="200px" />
      ) : null}
      <h5>Update Payment Details</h5>
    </div>
  );
}

export default Profile;
