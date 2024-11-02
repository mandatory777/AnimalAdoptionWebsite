import React, { useEffect, useState } from "react";
import "./styles/AnimalListings.css";
import UpdateAnimalButton from "./UpdateAnimalButton";

const AnimalListings = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnimals = async () => {
    try {
      const response = await fetch(
        "https://unit-4-project-app-24d5eea30b23.herokuapp.com/get/all?teamId=1"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setAnimals(data.response || []);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleDelete = async (animalId) => {
    const password = prompt(
      "Please enter the admin password to delete this listing:"
    );
    if (password !== "ADMIN123") {
      alert("Incorrect password. Access denied.");
      return;
    }

    if (
      !window.confirm(
        "Are you sure you want to delete this animal? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const deleteUrl = `https://unit-4-project-app-24d5eea30b23.herokuapp.com/delete/data`;
      const response = await fetch(deleteUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: animalId,
          team: 1,
        }),
      });

      if (response.ok) {
        alert("Animal deleted successfully!");
        fetchAnimals();
      } else {
        alert("Error deleting animal. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting animal:", error);
      alert("Error deleting animal. Check the console for details.");
    }
  };

  const handleUpdate = async (animalId, updatedAnimalData) => {
    try {
      const currentAnimalResponse = await fetch(
        `https://unit-4-project-app-24d5eea30b23.herokuapp.com/get/${animalId}?teamId=1`
      );
      if (!currentAnimalResponse.ok) {
        throw new Error("Failed to fetch current animal data");
      }

      const currentAnimal = await currentAnimalResponse.json();

      const currentAnimalData =
        currentAnimal.data_json.body || currentAnimal.data_json;
      const updatedAnimal = {
        id: animalId,
        team: 1,
        name: currentAnimalData.name || updatedAnimalData.name,
        imgUrl: currentAnimalData.imgUrl || updatedAnimalData.imgUrl,
        age: currentAnimalData.age || updatedAnimalData.age,
        sex: currentAnimalData.sex || updatedAnimalData.sex,
        description:
          currentAnimalData.description || updatedAnimalData.description,
        email: currentAnimalData.email || updatedAnimalData.email,
        isAdopted: updatedAnimalData.isAdopted,
      };

      const updateUrl = `https://unit-4-project-app-24d5eea30b23.herokuapp.com/update/animal`;
      const response = await fetch(updateUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAnimal),
      });

      if (response.ok) {
        alert("Animal updated successfully!");
        fetchAnimals();
      } else {
        alert("Error updating animal. Please try again.");
      }
    } catch (error) {
      console.error("Error updating animal:", error);
      alert("Error updating animal. Check the console for details.");
    }
  };

  return (
    <>
      <h2 className="page-heading">Animal Listings</h2>
      <div className="listings-container">
        {animals.length === 0 ? (
          <p>No animals available for adoption.</p>
        ) : (
          animals.map((animal) => {
            const animalData = animal.data_json.body || animal.data_json;
            return (
              <div
                key={animal.id}
                className={`card ${animalData.isAdopted ? "adopted" : ""}`}
              >
                {animalData.isAdopted && (
                  <div className="adopted-overlay">
                    <img
                      src="https://raw.githubusercontent.com/JetRobertsBCCA/GOATpage/refs/heads/main/ADOPTED.png"
                      alt="Adopted"
                    />
                  </div>
                )}
                {animalData.imgUrl ? (
                  <img
                    src={animalData.imgUrl}
                    alt={animalData.name}
                    style={{
                      width: "370px",
                      height: "370px",
                      objectFit: "inherit",
                    }}
                  />
                ) : (
                  <p>No image available</p>
                )}
                <div className="card-content">
                  <h3 className="card-title">
                    {animalData.name} ({animalData.type || animalData.breed})
                  </h3>
                  <p className="card-info">Age: {animalData.age}</p>
                  <p className="card-info">Sex: {animalData.sex}</p>
                  <p className="card-info">
                    Description: {animalData.description}
                  </p>
                  <p className="card-info">
                    Email:{" "}
                    <a href={`mailto:${animalData.email}`}>
                      {animalData.email}
                    </a>
                  </p>

                  <button
                    onClick={() => handleDelete(animal.id)}
                    className="card-button delete"
                    style={{ marginRight: "10px" }}
                  >
                    Delete
                  </button>

                  {!animalData.isAdopted && (
                    <UpdateAnimalButton
                      animalId={animal.id}
                      onUpdate={handleUpdate}
                      animal={animal}
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default AnimalListings;
