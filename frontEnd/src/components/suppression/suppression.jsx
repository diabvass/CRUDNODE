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
  const [data, setData] = useState([]); // reception des données du personnel
  const [query, setQuery] = useState(""); // matricule
  const [personne, setPersonne] = useState(null); // reception du personnel après matricule
  const [open, setOpen] = useState(false); // modal
  const [notification, setNotification] = useState(null);
  const onNotify = (message, severity = "info") => {
    // écouteur dans process
    setNotification({
      message,
      severity,
    });
  };

  const viderChamp = () => {
    // tout effacer
    setQuery("");
    setPersonne(null);
    setTimeout(() => {
      setNotification(null);
    }, 1000);
  };
  // raffraichir la liste après la suppression
  const chargeListe = () => {
    fetch(import.meta.env.VITE_API_URL_LISTE)
      .then((res) => res.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // remonte une fois
    chargeListe();
  }, []);

  // Validation du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setNotification(null);
    if (!query || query.trim() === "") {
      setNotification({
        message: "Champ vide",
        severity: "warning",
      });
      return;
    }

    // chercher par le matricule avec find
    const resultat = data.find(
      (personne) => personne.matricule.toUpperCase() === query.toUpperCase(),
    );
    // bloc des resultats
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
    <Container maxWidth="md">
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
        <Typography
          variant="h5"
          align="center"
          sx={{ m: 2, fontWeight: "bold" }}
        >
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

        {/*Bloc de notification */}
        {notification && (
          <Alert severity={notification.severity} sx={{ mt: 2 }}>
            {notification.message}
          </Alert>
        )}
        {/*Processus, logique et contrôle de suppression */}
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
