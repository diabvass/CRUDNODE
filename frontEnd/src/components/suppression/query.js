import { useState } from "react";
export function useDelete() { // procedure de suppression
    const [loading, setLoading] = useState(false);

    const remove = async ({ matricule, passe }) => { // fonction supprimer
        setLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_API_URL_DELETE_USER, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ // passe les données 
                    matricule,
                    passe,
                }),
            });
            const data = await response.json(); // réponse du serveur
            return data;
        } catch (err) {
            return {
                statut: "error",
                message: "Erreur lors de la demande : ", err,
            };
        } finally { // fin de chargement
            setLoading(false);
        }
    };
    return { // retourne les résultats et le statut
        remove,
        loading,
    };
}