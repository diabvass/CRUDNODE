import { useEffect, useState, useRef } from "react";
import PolicyIcon from "@mui/icons-material/Policy";
import { specialites, loisirs } from "../insertion/dataInsertion";

import {
  Container,
  TextField,
  Box,
  Typography,
  Button,
  Alert,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
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

  // Validation et requête
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.loisir = formData.getAll("loisirs").join(", ");
    delete data["loisirs"];
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

      if (result.statut === "success") {
        setTimeout(() => {
          setNotification(null);
          setQuery("");
          setPersonne(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Validation de la recherche
  const queryCheek = (e) => {
    e.preventDefault();
    setNotification(null);
    if (!query || query.trim() === "") {
      setNotification({
        message: "Entrer un matricule",
        statut: "error",
      });
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
      setNotification({
        message: "Aucun personnel trouvé",
        statut: "warning",
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ boxShadow: 2, p: 3 }}>
      <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
        Modification données personnel
      </Typography>
      <Toolbar />

      <Box
        component="form"
        onSubmit={personne ? handleSubmit : queryCheek}
        ref={formRef}
      >
        {personne && personne ? ( // Validation
          <Box>
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

                <FormControl fullWidth>
                  <InputLabel>Spécialité</InputLabel>
                  <Select
                    name="specialite"
                    label="Spécialité"
                    defaultValue={personne.specialite}
                  >
                    {specialites.map((s) => (
                      <MenuItem key={s.id} value={s.nom}>
                        {s.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Loisirs"
                  defaultValue={personne.loisir}
                  disabled
                />
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {loisirs.map((l) => (
                    <FormControlLabel
                      key={l.id}
                      control={
                        <Checkbox
                          name="loisirs"
                          value={l.nom}
                        />
                      }
                      label={l.nom}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          // QUERY
          <Box>
            <TextField
              label="Rechercher par matricule"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              fullWidth
            />
          </Box>
        )}

        {/*BUTTONS */}
        <Box component="footer" sx={{ mt: 2, display: "flex", gap: 1.5 }}>
          <Button
            type="submit"
            variant="contained"
            color={personne ? "success" : "primary"}
          >
            {personne ? (
              "Valider la modification"
            ) : (
              <Typography>
                <PolicyIcon sx={{ fontSize: 13 }} /> Chercher
              </Typography>
            )}
          </Button>
          <Button
            color={personne ? "warning" : "error"}
            variant="contained"
            type="reset"
            onClick={() => {
              if (personne) {
                setPersonne(null);
              } else setQuery("");
            }}
          >
            {personne && personne ? "Retour" : "Effacer"}
          </Button>
        </Box>
      </Box>

      {notification && (
        <Box sx={{ mt: 2 }}>
          <Alert variant="standard" color={notification.statut}>
            {notification.message}
          </Alert>
        </Box>
      )}
    </Container>
  );
}
