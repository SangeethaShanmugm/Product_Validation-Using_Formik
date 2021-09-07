import { Button, Typography, TextField } from "@material-ui/core";
import { useHistory, useState } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const ProductAdd = yup.object().shape({
  image: yup.string().required(),
  name: yup.string().required().min(3).max(30, "Keep it short"),
  price: yup.number().required().positive().min(1),
  description: yup.string().required().min(10)
});

export function Addproduct() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ProductAdd)
  });
  const history = useHistory();

  const addProd = (data) => {
    console.log("form data", data);
    fetch("https://60f3e4de3cb0870017a8a0ac.mockapi.io/Product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((data) => data.json())
      .then((data) => {
        alert("Product added !!");
        history.push("/");
      });
  };

  return (
    <div style={{ padding: "10px", maxWidth: "600px", margin: "auto" }}>
      <br />
      <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
        Add Products
      </Typography>
      <div
        className="vote-form"
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <TextField
          autoFocus
          variant="outlined"
          {...register("image")}
          error={errors?.image?.message}
          helperText={errors?.image?.message}
          label="Enter image"
        />
        <TextField
          autoFocus
          variant="outlined"
          {...register("name")}
          error={errors?.name?.message}
          helperText={errors?.name?.message}
          label="Enter name"
        />
        <TextField
          variant="outlined"
          {...register("price")}
          error={errors?.price?.message}
          helperText={errors?.price?.message}
          label="Enter price"
          type="number"
        />

        <TextField
          variant="outlined"
          {...register("description")}
          error={errors?.description?.message}
          helperText={errors?.description?.message}
          label="Enter description"
          multiline
          maxRows={3}
        />

        <Button
          onClick={handleSubmit(addProd)}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
