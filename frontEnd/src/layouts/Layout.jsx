import { Outlet } from "react-router";
import Navbar from "../components/navBar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "80px", fontSize : 12 }}>
        <Outlet />
      </div>
    </>
  );
}
