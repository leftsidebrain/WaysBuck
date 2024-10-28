import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { IToping, useTopingHooks } from "../../hooks/addTopingHooks";

export default function addToping() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { control, handleSubmit, setValue, reset } = useTopingHooks();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setValue("image", files[0]);
      setPreviewImage(URL.createObjectURL(files[0]));
    }
  };

  const submit = async (data: IToping) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price.toString());
      formData.append("image", data.image ?? "");

      await axios.post("http://localhost:3000/toping", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      reset();
      setPreviewImage(null);
    } catch (error) {}
  };

  return (
    <Container>
      <Box sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}>
        <Box width={"100%"} flex={3} display={"flex"} flexDirection={"column"} gap={5}>
          <Typography variant="h4" fontWeight={"bold"}>
            Add Toping
          </Typography>
          <form onSubmit={handleSubmit(submit)}>
            <Box sx={{ display: "flex", gap: 4, flexDirection: "column" }}>
              <Controller control={control} name="name" render={({ field }) => <TextField size="small" placeholder="Product Name" {...field} />} />
              <Controller control={control} name="price" render={({ field }) => <TextField size="small" placeholder="Price" {...field} />} />
              <Controller control={control} name="image" render={() => <TextField size="small" type="file" placeholder="Product Photo" inputProps={{ accept: "image/*" }} onChange={handleFile} />} />

              <Button type="submit" variant="contained" sx={{ width: "90%", alignSelf: "center" }}>
                Add Product
              </Button>
            </Box>
          </form>
        </Box>
        <Box flex={2} textAlign={"center"} display={"flex"} justifyContent={"center"}>
          {previewImage && <img style={{ maxWidth: "20rem", objectFit: "cover" }} src={previewImage} alt="" />}
        </Box>
      </Box>
    </Container>
  );
}
