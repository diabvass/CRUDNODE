import { Outlet } from "react-router";
import Navbar from "../components/navBar/Navbar";
import { CssBaseline, Box, Container, Toolbar } from "@mui/material";

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <Navbar />

      <Box>
        <Toolbar />
        <Container>
          <Toolbar />
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
