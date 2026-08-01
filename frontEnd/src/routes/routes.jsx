import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";
import Insertion from "../components/insertion/Insertion";
import Liste from "../components/listePersonnel/liste";
import Suppression from "../components/suppression/suppression";
import Home from "../components/home/Home";
import Update from "../components/update/Update";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "insertion",
        Component: Insertion,
      },
      {
        path: "liste",
        Component: Liste,
      },
      {
        path: "modification",
        Component: Update
      },
      {
        path: "suppression",
        Component: Suppression,
      },
    ],
  },
]);
