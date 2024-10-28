import { Box, Button, Container, Typography } from "@mui/material";
import QR from "../../assets/img/QR.png";
import logo from "../../assets/img/WaysBucks (1) 1.png";
import { useAppSelector } from "../../store/store";
import imgProduct from "../../assets/img/Product1.png";

export default function OrderedProduct() {
  const { cart } = useAppSelector((state) => state.products);
  return (
    <Container sx={{ backgroundColor: "#F6DADA", display: "flex", p: 3, gap: 5, borderRadius: "10px" }}>
      <Box sx={{ flex: 4 }}>
        {cart.map((item, index) => (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box key={index}>
              <img style={{ maxHeight: "10rem" }} src={imgProduct} alt="" />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box>
                <Typography variant="h5" color="maroon">
                  {item.productCart.name}
                </Typography>
                <Typography variant="subtitle1" color="maroon">
                  Saturday : 5 March 2024
                </Typography>
                <Typography style={{ textWrap: "nowrap" }} variant="subtitle1" color="maroon">
                  Toping : {item.toping.map((top) => top.name).join(", ")}
                </Typography>
                <Typography style={{ textWrap: "nowrap" }} variant="subtitle1" color="maroon">
                  Price : {item.totalPrice}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ flex: 2, justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <Box>
          <img style={{ maxWidth: "5rem" }} src={logo} alt="" />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
          <img style={{ maxWidth: "5rem" }} src={QR} alt="" />
          <Button size="small" variant="contained" fullWidth>
            On The Way
          </Button>
          <Typography sx={{ textAlign: "center" }}>Sub Total : Rp.{cart.reduce((a, b) => a + b.totalPrice, 0)}</Typography>
        </Box>
      </Box>
    </Container>
  );
}
