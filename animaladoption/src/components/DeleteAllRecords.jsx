import React from "react";
import '../components/DeleteAllRecords.css'

const DeleteAllRecords = () => {
  const handleDeleteAll = async () => {
    // Prompt for admin password
    const password = prompt(
      "Please enter the admin password to delete all records:"
    );
    if (password !== "ADMIN123") {
      alert("Incorrect password. Access denied.");
      return;
    }

    // Confirm deletion
    if (
      !window.confirm(
        "Are you sure you want to delete all records? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const deleteUrl =
        "https://unit-4-project-app-24d5eea30b23.herokuapp.com/nuke/all?teamId=1";

      const response = await fetch(deleteUrl, {
        method: "GET",
      });

      if (response.ok) {
        alert("All records deleted successfully!");
      } else {
        alert("Error deleting records. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting records:", error);
      alert("Error deleting records. Check the console for details.");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
  <h2 style={{ color: '#333', fontFamily: 'Arial, sans-serif', fontSize: '24px', marginBottom: '10px' }}>Delete All Records</h2><p>USE WITH CAUTION</p>
  <button 
    onClick={handleDeleteAll} 
    style={{
      backgroundColor: '#ff4d4d',
      color: 'white',
      fontSize: '16px',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
    }}
  >
    Delete All
  </button>
</div>

  );
};

export default DeleteAllRecords;
