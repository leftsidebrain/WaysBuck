import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import logo from "../assets/img/WaysBucks (1) 1.png";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logout } from "../store/auth/slice";
import { Icon } from "@iconify/react/dist/iconify.js";
import avatar from "../assets/img/31f041b28426c4a5b9c3c99741ca3f79.jpg";
import { useState } from "react";

export default function Header() {
  const nav = useNavigate();
  const { role, isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.products);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Functions to handle menu opening and closing
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginX: "100px", paddingY: "1rem", mb: "2rem" }}>
      <img onClick={() => nav("/")} style={{ width: "4.5rem" }} src={logo} alt="" />

      {!isLoggedIn ? (
        <Box sx={{ gap: 2, display: "flex" }}>
          <Button
            variant="contained"
            onClick={() => {
              nav("/login");
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              nav("/register");
            }}
          >
            register
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={{ position: "relative" }}>
            <Icon icon={"uil:cart"} fontSize={"3rem"} color="#BD0707" onClick={() => nav("cart")} />
            {cart.length > 0 && (
              <span style={{ color: "white", position: "absolute", backgroundColor: "#F13F3F", width: "1.5rem", height: "1.5rem", textAlign: "center", lineHeight: "1.5rem", borderRadius: "100%", left: "2rem", fontSize: "12px" }}>
                {" "}
                {cart.length}
              </span>
            )}
          </Box>
          {/* <img style={{ height: "4rem", width: "4rem", objectFit: "cover", borderRadius: "100%", border: "3px red solid" }} src={avatar} alt="" /> */}
          <Box sx={{ position: "relative" }}>
            <IconButton onClick={handleMenuClick} sx={{ padding: 0 }}>
              <img style={{ height: "4rem", width: "4rem", objectFit: "cover", borderRadius: "100%", border: "3px red solid" }} src={avatar} alt="User Avatar" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              {role === "ADMIN" ? (
                <Box>
                  <MenuItem
                    onClick={() => {
                      nav("/add-product");
                      handleMenuClose();
                    }}
                  >
                    <Icon icon={"tabler:cup"} fontSize={"1.5rem"} style={{ marginRight: "0.5rem" }} /> Add Product
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      nav("/add-toping");
                      handleMenuClose();
                    }}
                  >
                    <Icon icon={"circum:coffee-cup"} fontSize={"1.5rem"} style={{ marginRight: "0.5rem" }} /> Add Topping
                  </MenuItem>
                </Box>
              ) : (
                <Box>
                  <MenuItem
                    onClick={() => {
                      nav("/profile");
                      handleMenuClose();
                    }}
                  >
                    <Icon icon={"fa-regular:user"} fontSize={"1.5rem"} style={{ marginRight: "0.5rem" }} /> Profile
                  </MenuItem>
                </Box>
              )}
              <MenuItem onClick={handleLogout}>
                {" "}
                <Icon icon={"codicon:sign-out"} fontSize={"1.5rem"} style={{ marginRight: "0.5rem" }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      )}
    </Box>
  );
}
