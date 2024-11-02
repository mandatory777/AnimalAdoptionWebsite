import React, { useState } from "react";
import "./styles/AddAnimalForm.css";

const AddAnimalForm = ({ animal }) => {
  console.log(animal);
  //   const [animal, setAnimal] = useState(animal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setAnimal({ ...animal, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = prompt(
      "Please enter the admin password to update this listing:"
    );
    if (password !== "ADMIN123") {
      alert("Incorrect password. Access denied.");
      return;
    }

    if (window.confirm("Update this listing?")) {
      try {
        // ${animal.id} to be used for record id like ${value}
        const updateUrl = `https://unit-4-project-app-24d5eea30b23.herokuapp.com/update/data/teamId=1&recordId=1`;

        const response = await fetch(updateUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: animal.data_json }),
        });

        if (response.ok) {
          alert("Updated Successfully");
        } else {
          alert("Error updating listing. Please try again.");
        }
      } catch (error) {
        console.error("Error updating:", error);
        alert("An error occured.");
      }
    }
  };

  return (
    <div className="add-animal-form">
      <h2 className="form-title">Update Animal</h2>
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
          Update Animal
        </button>
      </form>
    </div>
  );
};

export default AddAnimalForm;
