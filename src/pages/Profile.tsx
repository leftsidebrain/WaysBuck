import { Box, Container, Typography } from "@mui/material";
import avatar from "../assets/img/Avatar.png";
import OrderedProduct from "./product/OrderedProduct";
import { useAppSelector } from "../store/store";

export default function Profile() {
  const { name, profile_pic, role, email } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.products);
  return (
    <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
      <Box>
        <h1>My Profile</h1>

        <Box sx={{ display: "flex", gap: 2, textWrap: "nowrap" }}>
          <img style={{ maxHeight: "15rem" }} src={avatar} alt="" />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <Box>
              <Typography variant="h6" fontWeight={"bold"}>
                Fullname
              </Typography>
              <Typography variant="h6" fontWeight={"bold"}>
                {name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={"bold"}>
                email
              </Typography>
              <Typography variant="h6" fontWeight={"bold"}>
                {email}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {cart.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, justifyContent: "center", alignItems: "center" }}>
          <h1>My Trasnsaction</h1>
          <OrderedProduct />
        </Box>
      )}
    </Container>
  );
}
