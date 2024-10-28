import { Box, Container } from "@mui/material";
import jumbo from "../assets/img/Jumbotron.png";
import IndexProduct from "./product/IndexProduct";
import { useEffect } from "react";

export default function Index() {
  return (
    <Container>
      <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
        <Box sx={{ textAlign: "center" }}>
          <img style={{ width: "50rem" }} src={jumbo} alt="" />
        </Box>
        <IndexProduct />
      </Box>
    </Container>
  );
}
