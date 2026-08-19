import { Container, Box, Button, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
export default function Update() {
  const [query, setQuery] = useState("");
  const [personnels, setPersonnels] = useState([]);
  const [personne, setPersonne] = useState("");
  const [notification, setNotification] = useState("");

  const relance = async () => {
    fetch(`${import.meta.env.VITE_API_URL}:8080/liste`)
      .then((res) => res.json())
      .then((result) => {
        setPersonnels(result.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // relance à chaque montage
    relance();
  }, []);

  // TROUVER LA PERSONNE PAR LE MATRICULE
  const handleQuery = () => {
    if (!query || query.trim() === "") {
      setNotification("matricule nul");
      return;
    }
    const res = personnels.find((personne) => {
      personne.matricule.toUpperCase() === query.toUpperCase();
    });
    setPersonne(res);
  };

  console.log(personne);

  return (
    <Container maxWidth="md">
      <Box
        sx={{ mt: 4, p: 3, border: "1px solid #ddd", borderRadius: 2 }}
        component="form"
        onSubmit={handleQuery}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ m: 2, fontWeight: "bold" }}
        >
          Modifier les informations du personnel
        </Typography>

        <TextField
          label="Rechercher par matricule"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
        />

        <Button sx={{ mt: 2 }} variant="contained">
          Modifier
        </Button>
      </Box>

      {/*Informations de modifications */}

      {notification}
    </Container>
  );
}
