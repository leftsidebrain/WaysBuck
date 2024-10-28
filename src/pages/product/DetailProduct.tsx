import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imgProduct from "../../assets/img/Product1.png";
import { getProductById } from "../../store/product/thunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { addToCart } from "../../store/product/productSlice";
import { getToping } from "../../store/toping/topingThunk";
import imgToping from "../../assets/img/Rectangle 9.png";

interface IToping {
  id: number;
  name: string;
  price: number;
  image?: string;
}

export default function DetailProduct() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { product,cart } = useAppSelector((state) => state.products);
  const { toping } = useAppSelector((state) => state.toping);

  const [totalPrice, setTotalPrice] = useState(0);

  const [selectedToppings, setSelectedToppings] = useState<IToping[]>([]);

  useEffect(() => {
    dispatch(getToping());
    if (id) {
      dispatch(getProductById(Number(id)));
    }
  }, []);

  useEffect(() => {
    if (product) {
      setTotalPrice(product.price);
    }
  }, [product]);

  const handleToppingSelect = (topping: IToping) => {
    const isSelected = selectedToppings.includes(topping);
    if (isSelected) {
      setSelectedToppings((prev) => prev.filter((t) => t !== topping));
      setTotalPrice((prev) => prev - topping.price);
    } else {
      setSelectedToppings((prev) => [...prev, topping]);
      setTotalPrice((prev) => prev + topping.price);
    }
  };



  const handleAddToCart = () => {
    const data = {
      productCart: product,
      toping: selectedToppings,
      totalPrice: totalPrice,
      quantity: 1
    };
    dispatch(addToCart(data));
    setSelectedToppings([]);
    setTotalPrice(product?.price as number);
  };

  return (
    <Container maxWidth={"lg"}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flex: 3, p: 3, alignItems: "center" }}>
          <img style={{ maxHeight: "30rem", objectFit: "cover" }} src={product?.image ?? imgProduct} alt="" />
        </Box>
        <Box sx={{ display: "flex", flex: 3, p: 3, flexDirection: "column" }}>
          <Box>
            <Typography variant="h4" fontWeight={"bold"} color="maroon">
              {product?.name}
            </Typography>
            <Typography>{product?.price}</Typography>
          </Box>
          <h4>Topping</h4>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "start", gap: 5, marginBottom: 5 }}>
            {toping.map((item, Index) => (
              <Box key={Index} onClick={() => handleToppingSelect(item)} sx={{ width: "15%", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", position: "relative" }}>
                <img style={{ width: "80%", objectFit: "contain" }} src={imgToping} alt="" />
                {selectedToppings.includes(item) && (
                  <Icon icon={"icon-park-solid:check-one"} fontSize={"1.2rem"} style={{ position: "absolute", top: "0", right: "0", color: "3BB54A", backgroundColor: "white", borderRadius: "100%", objectFit: "contain" }} />
                )}
                <Typography sx={{ textWrap: "nowrap" }}>{item.name}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <Typography variant="h5" color="red">
              Total
            </Typography>
            <Typography variant="h5" color="red">
              {totalPrice}
            </Typography>
          </Box>
          <Button onClick={handleAddToCart} variant="contained" color="error">
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
