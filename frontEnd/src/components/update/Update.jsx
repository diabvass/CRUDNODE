import { useEffect, useState, useRef } from "react";
import PolicyIcon from "@mui/icons-material/Policy";

import {
  Container,
  TextField,
  Box,
  Typography,
  Button,
  CardActions,
  Alert,
  Toolbar,
} from "@mui/material";

export default function Update() {
  const [data, setData] = useState([]); // reception des données du personnel
  const [query, setQuery] = useState(""); // matricule
  const [personne, setPersonne] = useState(null); // reception du personnel après matricule
  const [notification, setNotification] = useState(null);
  const formRef = useRef(null);

  // raffraichir la liste après la suppression
  const chargeListe = () => {
    fetch(`${import.meta.env.VITE_API_URL}:8080/liste`)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const reponse = await fetch(import.meta.env.VITE_API_URL_UPDATE_USER, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await reponse.json();
      setNotification({
        message: result.message,
        statut: result.statut,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // Validation du formulaire
  const queryCheek = (e) => {
    e.preventDefault();

    if (!query || query.trim() === "") {
      console.log("null dinnée");
      return;
    }

    // chercher par le matricule avec find
    const resultat = data.find(
      (personne) => personne.matricule.toUpperCase() === query.toUpperCase(),
    );

    if (resultat) {
      setPersonne(resultat);
    } else {
      setPersonne(null);
    }
  };

  return (
    <Container>
      <Typography variant="h5" align="center" sx={{ m: 2, fontWeight: "bold" }}>
        Modification données personnel
      </Typography>
      <Toolbar />

      {personne && (
        <Box component="form" onSubmit={handleSubmit} ref={formRef}>
          <Box component={Container}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Matricule"
                name="matricule"
                value={personne.matricule}
              />

              <TextField label="Nom" name="nom" defaultValue={personne.nom} />

              <TextField
                label="Prénoms"
                name="prenoms"
                defaultValue={personne.prenoms}
              />

              <TextField
                label="Loisirs"
                name="loisir"
                defaultValue={personne.loisir}
              />
              
            </Box>
          </Box>
          <CardActions>
            <Button variant="contained" type="submit">
              APPLOQUER
            </Button>
          </CardActions>
        </Box>
      )}

      {notification && (
        <Box component={Container} sx={{}}>
          <Alert variant="standard" color={notification.statut}>
            {notification.message}
          </Alert>
        </Box>
      )}

      {!personne && (
        <Box
          component="form"
          onSubmit={queryCheek}
          sx={{
            p: 2,
            border: "1px solid #ddd",
            borderRadius: 2,
          }}
        >
          <TextField
            label="Rechercher par matricule"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
          />

          <Button type="submit" variant="contained" sx={{ mt: 2}}>
            <PolicyIcon /> Chercher
          </Button>
        </Box>
      )}
    </Container>
  );
}
