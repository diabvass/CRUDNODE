import { Outlet } from "react-router";
import Navbar from "../components/navBar/Navbar";
import { CssBaseline, Container, Toolbar } from "@mui/material";

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Toolbar />
      <Container maxWidth="md">
        <Outlet />
      </Container>
    </>
  );
}