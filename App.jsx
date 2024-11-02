import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import AddAnimalForm from "./components/AddAnimalForm";
import AnimalListings from "./components/AnimalListings";
import DeleteAllRecords from "./components/DeleteAllRecords";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />  {/* Navbar outside Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-animal" element={<AddAnimalForm />} />
        <Route path="/animal-listings" element={<AnimalListings />} />
        <Route path="/admin-delete" element={<DeleteAllRecords />} />
      </Routes>
    </Router>
  );
}

export default App;
