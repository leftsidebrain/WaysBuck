import { Icon } from "@iconify/react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Controller } from "react-hook-form";
import tf from "../assets/img/Bt Upload Invoice.png";
import imgProduct from "../assets/img/Product1.png";
import { IOrders, useOrdersHooks } from "../hooks/pay-hooks/useOrdersHooks";
import { removeFromCart, resetCart } from "../store/product/productSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

declare global {
  interface Window {
    snap: any;
  }
}
export default function Cart() {
  const [previewImage, setPreviewImage] = useState<string>(tf);
  const { cart } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const handleRemove = (index: number) => {
    dispatch(removeFromCart(index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setValue("payment", files[0]);
      setPreviewImage(URL.createObjectURL(files[0]));
    }
  };

  const handleImageClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const { control, handleSubmit, reset, setValue } = useOrdersHooks();

  const amount = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const submit = async (data: IOrders) => {
    const id = "Order-" + Math.floor(Math.random() * 1000000);
    const orders = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      postcode: data.posCode,
      address: data.address,
      total: amount,
      payment: data.payment,
    };

    const midtrans = {
      transaction_details: {
        order_id: id,
        gross_amount: amount,
      },
      customer_details: {
        first_name: data.name,
        email: data.email,
        phone: data.phone,
      },
      item_details: cart.map((item) => ({
        id: item.productCart.id,
        name: item.productCart.name,
        price: item.totalPrice,
        toping: item.toping.map((item) => item.name).join(", "),
        quantity: item.quantity,
      })),
    };

    try {
      const res = await axios.post("http://localhost:3000/midtrans/create", midtrans);
      window.snap.pay(res.data.token);

      // await axios.post("http://localhost:3000/orders", orders);
      reset();
      dispatch(resetCart());
      setPreviewImage(tf);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };
  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <Container>
      <h1>My Cart</h1>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box sx={{ width: "100%", flex: 4 }}>
          <h3>Review Your Order</h3>
          <div style={{ borderTop: "3px solid black", marginBottom: "1rem" }} />
          {cart.map((item, index) => {
            return (
              <Box key={index} sx={{ display: "flex", flex: 4 }}>
                <Box sx={{ display: "flex", gap: 3, flex: 5 }}>
                  <Box>
                    <img style={{ maxWidth: "5rem" }} src={imgProduct} alt="" />
                  </Box>
                  <Box>
                    <h3>{item.productCart.name}</h3>
                    <h4>Toping : {item.toping.map((item) => item.name).join(", ")}</h4>
                  </Box>
                </Box>
                <Box sx={{ flex: "2", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "end", gap: 1 }}>
                  <Typography variant="body1">Price: {item.totalPrice}</Typography>
                  <Icon icon={"mdi:delete-empty"} fontSize={"2rem"} onClick={() => handleRemove(index)} />
                </Box>
              </Box>
            );
          })}

          <Box sx={{ display: "flex", gap: 5, justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Box sx={{ width: "30rem" }}>
              <div style={{ borderTop: "3px solid black", marginTop: "1rem" }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <p>Subtotal</p>
                <p>{cart.reduce((a, b) => a + b.totalPrice, 0)}</p>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <p>Qty</p>
                <p>{cart.length}</p>
              </Box>
              <div style={{ borderTop: "3px solid black", marginTop: "1rem" }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <p>Subtotal</p>
                <p>{cart.reduce((a, b) => a + b.totalPrice, 0)}</p>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img style={{ width: "12rem" }} src={previewImage} alt="" onClick={handleImageClick} />
              <Controller control={control} name="payment" render={() => <input id="fileInput" type="file" style={{ display: "none" }} accept="image/*" onChange={handleFileChange} />} />
            </Box>
          </Box>
        </Box>
        <Box sx={{ flex: 1.5, paddingTop: "4rem" }}>
          <form onSubmit={handleSubmit(submit, onError)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Controller control={control} name="name" render={({ field }) => <TextField placeholder="name" variant="outlined" size="small" {...field} />} />
              <Controller control={control} name="email" render={({ field }) => <TextField placeholder="email" type="email" variant="outlined" size="small" {...field} />} />
              <Controller control={control} name="phone" render={({ field }) => <TextField placeholder="phone" type="number" variant="outlined" size="small" {...field} />} />
              <Controller control={control} name="posCode" render={({ field }) => <TextField placeholder="pos code" type="number" variant="outlined" size="small" {...field} />} />
              <Controller control={control} name="address" render={({ field }) => <TextField placeholder="Adress" multiline rows={4} variant="outlined" size="small" {...field} />} />

              {/* <TextField variant="outlined" multiline rows={4} /> */}
            </Box>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: "2rem", backgroundColor: "red" }}>
              Pay
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
