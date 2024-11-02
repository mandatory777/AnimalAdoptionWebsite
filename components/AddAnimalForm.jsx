import React, { useState } from "react";
import "./styles/AddAnimalForm.css";

const AddAnimalForm = () => {
  const [animal, setAnimal] = useState({
    name: "",
    type: "",
    age: "",
    sex: "",
    description: "",
    email: "",
    imgUrl: "",
    isAdopted: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimal({ ...animal, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://unit-4-project-app-24d5eea30b23.herokuapp.com/post/data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            team: 1,
            body: animal,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to add animal");
      alert("Animal added successfully!");
      setAnimal({
        name: "",
        type: "",
        age: "",
        sex: "",
        description: "",
        email: "",
        imgUrl: "",
      }); // Resets the form
    } catch (error) {
      console.error(error);
      alert("Error adding animal: " + error.message);
    }
  };

  return (
    <div className="add-animal-form">
      <h2 className="form-title">Add Animal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="name"
            placeholder="Name"
            value={animal.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <select
            name="type"
            value={animal.type}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="" disabled>
              Type
            </option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <input
            name="age"
            placeholder="Age"
            value={animal.age}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <select
            name="sex"
            value={animal.sex}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="" disabled>
              Sex
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <textarea
            name="description"
            placeholder="Description"
            value={animal.description}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={animal.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            name="imgUrl"
            placeholder="Image URL"
            value={animal.imgUrl}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="form-button">
          Add Animal
        </button>
      </form>
    </div>
  );
};

export default AddAnimalForm;
