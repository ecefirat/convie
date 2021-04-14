import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Profile() {
  const { register, handleSubmit } = useForm();
  const [customer_address, setCustomerAddress] = useState("");
  const [customer_name, setCustomerName] = useState("");
  const [profile_picture, setProfilePicture] = useState("");

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
          setProfilePicture(data.user.profile_picture);
        });
      } else if (res.status === 400) {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
  });

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
    alert(JSON.stringify(res));

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
    //       res.json().then((profile_picture) => {
    //         console.log(profile_picture);
    //         console.log("pic above");
    //       });
    //     }
    //   }
    //   );
  };

  return (
    <div className="container">
      <h1>Hi {customer_name}!</h1>
      <h5>Edit Address</h5>
      <p>{customer_address}</p>
      <input
        style={{ display: "inline", width: 200, marginBottom: 30 }}
        type="text"
        placeholder="Enter new address..."
        name="customer_address"
        ref={register}
      />
      <button
        className="btn waves-effect waves-light green right"
        style={{ width: 80, display: "inline" }}
        onClick={handleSubmit(handleAddress)}>
        change
      </button>
      <input
        type="hidden"
        value={customer_name}
        name="customer_name"
        ref={register}
      />
      <h5>Upload Profile Picture</h5>
      <p>{profile_picture}</p>
      <input
        type="file"
        style={{
          display: "inline",
          width: 200,
          marginBottom: 30,
          marginTop: 20,
        }}
        name="picture"
        ref={register}
      />
      <button
        className="btn waves-effect waves-light green right"
        style={{ width: 80, marginTop: 10 }}
        onClick={handleSubmit(uploadImage)}>
        upload
      </button>
      <h5>Update Payment Details</h5>
    </div>
  );
}

export default Profile;
