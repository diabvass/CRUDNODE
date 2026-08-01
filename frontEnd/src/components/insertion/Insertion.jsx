import { useState, useRef } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  Checkbox,
  TextField,
  Box,
  Button,
  Backdrop,
  CircularProgress,
  Alert,
} from "@mui/material";

import { specialites, loisirs } from "./dataInsertion";

function Insertion() {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formKey, setFormKey] = useState(0);

  const formRef = useRef(null);

  const Valide = async (e) => {
    e.preventDefault();

    const form = formRef.current;
    const data = new FormData(form);

    const formObject = Object.fromEntries(data.entries()); // transforme en objets
    formObject.loisir = data.getAll("loisirs").join(", ");
    delete formObject["loisirs"]; // delete l'ancien
    
    setOpen(true);

    try {
      const res = await fetch("http://192.168.1.75:8080/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      });

      const result = await res.json();

      if (res.ok) {
        setNotification({
          statut: "success",
          message: result.message,
        });

        setFormKey((k) => k + 1); // Recrée entièrement le formulaire
      } else {
        setNotification({
          statut: "error",
          message: result.message,
        });
      }
    } catch (error) {
      console.error(error);

      setNotification({
        statut: "error",
        message: "Erreur lors de l'envoi.",
      });
    } finally {
      setOpen(false);
    }
  };

  return (
    <Box
      key={formKey}
      component="form"
      ref={formRef}
      onSubmit={Valide}
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      <TextField label="Matricule" name="matricule" required fullWidth />
      <TextField label="Nom" name="nom" required fullWidth />
      <TextField label="Prénoms" name="prenoms" required fullWidth />

      <TextField
        label="Date de naissance"
        type="date"
        name="dateN"
        fullWidth
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />

      <FormLabel>Sexe</FormLabel>
      <RadioGroup row name="sexe" defaultValue="">
        <FormControlLabel value="Masculin" control={<Radio />} label="Masculin" />
        <FormControlLabel value="Feminin" control={<Radio />} label="Féminin" />
      </RadioGroup>

      <FormControl fullWidth required>
        <InputLabel>Spécialité</InputLabel>
        <Select name="specialite" label="Spécialité" defaultValue="">
          {specialites.map((s) => (
            <MenuItem key={s.id} value={s.nom}>
              {s.nom}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormLabel>Loisirs</FormLabel>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {loisirs.map((l) => (
          <FormControlLabel
            key={l.id}
            control={<Checkbox name="loisirs" value={l.nom} />}
            label={l.nom}
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained" color="success">Insérer</Button>
        <Button type="reset" variant="outlined" color="error">Annuler</Button>
      </Box>

      <Backdrop
        open={open}
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {notification && (
        <Alert severity={notification.statut}>{notification.message}</Alert>
      )}
    </Box>
  );
}

export default Insertion;
