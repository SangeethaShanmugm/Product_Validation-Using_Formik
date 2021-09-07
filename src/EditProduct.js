import React, { useState, useEffect } from "react";
import { Button, Typography, TextField } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ProductAdd = yup.object().shape({
  image: yup.string().required("⚠️ Provide the product image"),
  name: yup.string().required().min(3).max(50, "Keep it short"),
  price: yup.number().required().positive().min(1),
  description: yup.string().required().min(10)
});

export function EditProduct() {
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm({
    resolver: yupResolver(ProductAdd)
  });
  const history = useHistory();
  const { id } = useParams();

  function displayProduct(id) {
    fetch(`https://60f3e4de3cb0870017a8a0ac.mockapi.io/Product/${id}`, {
      method: "GET"
    })
      .then((data) => data.json())
      .then((data) => {
        setProduct(data);
      });
  }

  const editProduct = (data) => {
    console.log("form data", data);
    fetch(`https://60f3e4de3cb0870017a8a0ac.mockapi.io/Product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((data) => data.json())
      .then((data) => {
        alert("Product successfully updated !!");
        history.push("/");
      });
  };
  const [product, setProduct] = useState({});
  useEffect(() => {
    displayProduct(id);
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <div>
        <Typography
          variant="h5"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Update the Products
        </Typography>
        {!product.id && <h1 style={{ textAlign: "center" }}>Loading ...</h1>}
        {product.id && (
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
              defaultValue={product.image}
              label="Enter image"
            />
            <TextField
              autoFocus
              variant="outlined"
              {...register("name")}
              error={errors?.name?.message}
              helperText={errors?.name?.message}
              defaultValue={product.name}
              label="Enter name"
            />
            <TextField
              variant="outlined"
              {...register("price")}
              error={errors?.price?.message}
              helperText={errors?.price?.message}
              defaultValue={product.price}
              label="Enter price"
              type="number"
            />

            <TextField
              variant="outlined"
              {...register("description")}
              error={errors?.description?.message}
              helperText={errors?.description?.message}
              defaultValue={product.description}
              label="Enter description"
              multiline
              maxRows={3}
            />

            <Button
              onClick={handleSubmit(editProduct)}
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
