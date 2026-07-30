import { RouterProvider } from "react-router";
import { router } from "./routes/routes";
import "./App.css";
export default function App() {
  return <RouterProvider router={router} />;
}