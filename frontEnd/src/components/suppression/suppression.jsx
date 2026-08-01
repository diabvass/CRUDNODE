import { useEffect, useState } from "react";
import Process from "./Process";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PolicyIcon from "@mui/icons-material/Policy";

import {
  Container,
  TextField,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
} from "@mui/material";

export default function Suppression() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [personne, setPersonne] = useState(null);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const onNotify = (message, severity = "info") => {
    setNotification({
      message,
      severity,
    });
  };

  const viderChamp = () => {
    setQuery("");
    setPersonne(null);
    setTimeout(() => {
      setNotification(null);
    }, 1000);
  };
  const chargeListe = () => {
    fetch(`${import.meta.env.VITE_API_URL}:8080/liste`)
      .then((res) => res.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    chargeListe();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotification(null);
    const resultat = data.find(
      (personne) => personne.matricule.toLowerCase() === query,
    );

    if (resultat) {
      setPersonne(resultat);
    } else {
      setNotification({
        message: "Aucun personnel pour cet identifiant",
        severity: "error",
      });
      setPersonne(null);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 4,
          p: 3,
          border: "1px solid #ddd",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center" mb={3}>
          Suppression d'une personne
        </Typography>

        <TextField
          label="Rechercher par matricule"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          <PolicyIcon /> Chercher
        </Button>

        {personne && (
          <Card sx={{ mt: 3 }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography>Matricule : {personne.matricule}</Typography>

                <Typography>Nom : {personne.nom}</Typography>

                <Typography>Prénoms : {personne.prenoms}</Typography>
              </Box>

              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <DeleteForeverIcon />
              </Button>
            </CardContent>
          </Card>
        )}
        {notification && (
          <Alert severity={notification.severity} sx={{ mt: 2 }}>
            {notification.message}
          </Alert>
        )}
        <Process
          open={open}
          handleClose={() => setOpen(false)}
          matricule={personne?.matricule}
          nom={personne?.nom}
          prenoms={personne?.prenoms}
          chargeListe={chargeListe}
          viderChamp={viderChamp}
          onNotify={onNotify}
        />
      </Box>
    </Container>
  );
}
