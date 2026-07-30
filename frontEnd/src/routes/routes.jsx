import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";
import Insertion from "../components/insertion/Insertion";
import Liste from "../components/listePersonnel/liste";
import Suppression from "../components/suppression/suppression";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: () => (
          <h2 style={{ textAlign: "center" }}>Page d'Accueil</h2>
        ),
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
        Component: () => (
          <h2 style={{ textAlign: "center" }}>Page Modification</h2>
        ),
      },
      {
        path: "suppression",
        Component: Suppression,
      },
    ],
  },
]);
