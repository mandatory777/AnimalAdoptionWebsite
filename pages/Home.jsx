import React from "react";
import { Link } from "react-router-dom";
import "../pages/Home.css";
import CreateTestListingButton from "../components/CreateTestListingButton";

const Home = () => {
  return (
    <div className="container">
      <CreateTestListingButton />
      <h1>Welcome to Paw Partners</h1>
      <h3>A trusted platform for pet adoption</h3>
      <div className="card-container">
        <Link to="/add-animal">
          <button className="home-button add-animal" aria-label="Add a new animal listing">
            Add Animal
          </button>
        </Link>
        <Link to="/animal-listings">
          <button className="home-button view-listings" aria-label="View all animal listings">
            View Animal Listings
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
