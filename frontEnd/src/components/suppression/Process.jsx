import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useDelete } from "./query";

export default function Process({
  open,
  handleClose,
  matricule,
  nom,
  prenoms,
  chargeListe,
  viderChamp,
  onNotify,
}) {
  const [avis, setAvis] = useState(false);
  const [passe, setPasse] = useState("");
  const { remove, loading } = useDelete();

  const reset = () => {
    setPasse("");
    setAvis(false);
    handleClose();
  };

  const handleSuppression = async () => {
    if (!avis) {
      setAvis(true);
      return;
    }

    const response = await remove({
      matricule,
      passe,
    });

    onNotify(
      response.message,
      response.statut === "success" ? "success" : "error",
    );
    if (response.statut === "success") {
      await chargeListe();
      viderChamp();
    }
    reset();
  };

  return (
    <Dialog open={open} onClose={reset} aria-labelledby="dialog-suppression">
      <DialogTitle id="dialog-suppression">
        Confirmation de suppression
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Voulez-vous supprimer cette personne ?
          <br />
          <strong>
            {matricule} : {nom} {prenoms}
          </strong>
        </DialogContentText>

        {avis && (
          <TextField
            autoFocus
            margin="dense"
            label="Mot de passe de sécurité"
            type="password"
            fullWidth
            value={passe}
            onChange={(e) => setPasse(e.target.value)}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={reset} color="inherit">
          Annuler
        </Button>
        <Button
          color="error"
          variant="contained"
          disabled={loading}
          onClick={async () => handleSuppression()}
        >
          {loading ? "Suppression..." : avis ? "Valider" : "Supprimer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
