import { Box, Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../store/product/thunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import imgProduct from "../../assets/img/Product1.png";

export default function IndexProduct() {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <Box sx={{ display: "flex", gap: 5, justifyContent: "center", flexWrap: "wrap", mb: "5rem", p: "3px" }}>
      {products.map((item) => (
        <Card sx={{ width: "12rem", height: "20rem" }} key={item.id} style={{ padding: "2px" }}>
          <CardActionArea
            onClick={() => {
              nav(`/detail-product/${item.id}`);
            }}
          >
            <CardMedia sx={{ objectFit: "contain", minHeight: "15rem" }} component="img" image={item.image ?? imgProduct} alt="Product" />
            <Box padding={1}>
              <Typography gutterBottom variant="subtitle1">
                {item.name}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                {item.price}
              </Typography>
            </Box>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
