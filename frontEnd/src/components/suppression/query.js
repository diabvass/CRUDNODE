import { useState } from "react";
export function useDelete() {
    const [loading, setLoading] = useState(false);

    const remove = async ({ matricule, passe }) => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/deleteUser", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    matricule,
                    passe,
                }),
            });
            const data = await response.json();
            return data;
        } catch (err) {
            return {
                statut: "error",
                message: "Erreur lors de la demande : ", err,
            };
        } finally {
            setLoading(false);
        }
    };
    return {
        remove,
        loading,
    };
}