import React from "react";

const DeleteAnimalButton = ({ animalId, onDelete }) => {
  const handleDelete = async () => {
    const password = prompt(
      "Please enter the admin password to delete this listing:"
    );
    if (password !== "ADMIN123") {
      alert("Incorrect password. Access denied.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        const deleteUrl = `https://unit-4-project-app-24d5eea30b23.herokuapp.com/delete/data`;

        const response = await fetch(deleteUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: animalId, team: 1 }),
        });

        if (response.ok) {
          alert("Animal listing deleted successfully!");
          onDelete(animalId); // Callback to remove the animal from the list n parent componet
        } else {
          alert("Error deleting animal listing. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting the animal:", error);
        alert("An error occurred. Please check the console for details.");
      }
    }
  };

  return (
    <button onClick={handleDelete} className="card-button">
      Delete Animal
    </button>
  );
};

export default DeleteAnimalButton;
