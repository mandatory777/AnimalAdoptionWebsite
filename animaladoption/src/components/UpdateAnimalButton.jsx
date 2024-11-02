import React from "react";

const UpdateAnimalButton = ({ animalId, animal }) => {
  const handleUpdate = async () => {
    const password = prompt(
      "Please enter the admin password to update this listing:"
    );
    if (password !== "ADMIN123") {
      alert("Incorrect password. Access denied.");
      return;
    }

    if (window.confirm("Mark this animal as adopted?")) {
      try {
        const updateUrl = `https://unit-4-project-app-24d5eea30b23.herokuapp.com/update/data?teamId=1&recordId=${animalId}`;

        // Update isAdopted to true in the animal data
        const updatedAnimal = {
          ...animal.data_json,
          isAdopted: true, // Set isAdopted to true
        };

        const response = await fetch(updateUrl, {
          method: "POST", // Changed to POST method
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: updatedAnimal }),
        });

        if (response.ok) {
          alert("Animal marked as adopted successfully.");
          window.location.reload(); // Reload the page after successful update
        } else {
          alert("Error updating listing. Please try again.");
        }
      } catch (error) {
        console.error("Error updating:", error);
        alert("An error occurred while updating.");
      }
    }
  };

  return (
    <button onClick={handleUpdate} className="card-button">
      Mark as Adopted
    </button>
  );
};

export default UpdateAnimalButton;
