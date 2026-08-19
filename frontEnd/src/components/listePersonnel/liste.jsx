import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TextField,
  CircularProgress,
  Alert,
  Box,
  TablePagination,
} from "@mui/material";

export default function Liste() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}:8080/liste`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur serveur");
        }
        return res.json();
      })
      .then((result) => {
        if (result.statut === "success") {
          setData(result.data);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter((row) =>
    `${row.matricule} ${row.nom} ${row.prenoms} ${row.specialite} ${row.loisir}}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  // Message d'erreur si la requête échoue
  if (error) {
    return (
      <Alert
        component={Container}
        sx={{ p: 5, mt: "30vh", textAlign: "center", fontSize: "18px", display: "inline-block" }}
        severity="error"
      >
        Erreur lors du chargement des données
      </Alert>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 3, fontWeight: "bold" }}
      >
        Liste du personnel
      </Typography>

      <TextField
        fullWidth
        label="Rechercher..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
        sx={{ mb: 3 }}
      />

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          maxHeight: 500,
        }}
      >
        <Table
          stickyHeader
          sx={{
            minWidth: 750,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Matricule</b>
              </TableCell>

              <TableCell>
                <b>Nom</b>
              </TableCell>

              <TableCell>
                <b>Prénoms</b>
              </TableCell>

              <TableCell>
                <b>Sexe</b>
              </TableCell>

              <TableCell>
                <b>Spécialité</b>
              </TableCell>

              <TableCell>
                <b>Loisir(s)</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <TableRow key={row.matricule} hover>
                  <TableCell>{row.matricule}</TableCell>

                  <TableCell>{row.nom}</TableCell>

                  <TableCell>{row.prenoms}</TableCell>

                  <TableCell>{row.sexe}</TableCell>

                  <TableCell>{row.specialite}</TableCell>

                  <TableCell>{row.loisir || "-"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Aucun personnel trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Lignes par page"
      />
    </Container>
  );
}
