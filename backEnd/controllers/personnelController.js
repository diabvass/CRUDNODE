const db = require("../config/db");

const addUser = async (req, res) => {
  const {
    matricule,
    nom,
    prenoms,
    dateN,
    sexe,
    specialite,
    loisir,
  } = req.body;

  if (
    !matricule?.trim() ||
    !nom?.trim() ||
    !prenoms?.trim() ||
    !specialite
  ) {
    return res.status(400).json({
      statut: "error",
      message: "Renseigner les champs obligatoires.",
    });
  }

  try {
    const sql = `
      INSERT INTO personnel
      (matricule, nom, prenoms, dateNaissance, sexe, specialite, loisir)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      matricule,
      nom,
      prenoms,
      dateN,
      sexe,
      specialite,
      loisir,
    ]);

    res.status(201).json({
      statut: "success",
      message: "Insertion réussie",
      id: result.insertId,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      statut: "error",
      message: "Erreur lors de l'insertion.",
      error: err.message,
    });
  }
};


const liste = async (req, res) => {
  try {
    const [sql] = await db.query("SELECT * FROM personnel");

    res.status(200).json({
      statut: "success",
      data: sql,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      statut: "error",
      message: "Erreur lors de la récupération.",
      description: err,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const {
      matricule,
      passe
    } = req.body;
    if (!matricule || passe !== "1234") {
      return res.status(400).json({
        statut: "error",
        message: "Passe incoreect"
      });
    }
    const sql = `DELETE FROM personnel WHERE matricule = ?`;
    const [resultat] = await db.query(sql, [
      matricule
    ]);

    res.status(200).json({
      statut: "success",
      message: "supprission réussie",
    });
  } catch (error) {

    console.log(error);
    return res.status(500).json({
      statut: "error",
      message: "Erreur serveur"
    });
  }
}

const updateUser = async (req, res) => {
  try {
    const { matricule, nom, prenoms, loisir, specialite } = req.body;


    const sql = "UPDATE personnel SET nom=?, prenoms=?, loisir=?, specialite=? WHERE matricule=?";
    const [reponse] = await db.query(sql, [nom, prenoms, loisir, specialite, matricule]);

    return res.status(200).json({
      message: "Modification effectuée avec succès",
      statut: "success"
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Erreur serveur', err,
      statut: 'error'
    });
  }
};

module.exports = {
  addUser,
  liste,
  deleteUser,
  updateUser
};