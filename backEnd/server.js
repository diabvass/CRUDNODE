const express = require("express");
const cors = require("cors");
const personnelRoutes = require("./routes/personnelRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", personnelRoutes);

app.listen(8080, () => {
  console.log("Serveur lancé sur http://localhost:8080");
});