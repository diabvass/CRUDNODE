import { Button } from "@mui/material";

export default function Update() {
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const reponse = await fetch(
        `${import.meta.env.VITE_API_URL}:8080/updateUser`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            matricule: "",
            nom: "Diaby",
            prenoms: "Fekir",
          }),
        },
      );

      const result = await reponse.json();
      console.log(result.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleUpdate}>Up</Button>
    </>
  );
}