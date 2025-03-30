import { useEffect, useState } from "react";
import Card from "./Card";

export default function Posts() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track the total number of pages
  const [editingUser, setEditingUser] = useState(null); // Track the user being edited
  const [formData, setFormData] = useState({ firstName: "", lastName: "" }); // Form data for editing
  const API_URL = "https://reqres.in/";

  const getData = async (page = 1) => {
    try {
      const response = await fetch(`${API_URL}api/users?page=${page}`);
      const data = await response.json();
      setUserData(data?.data || []); // Extract the `data` array
      setTotalPages(data?.total_pages || 1); // Set the total number of pages
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData(currentPage); // Fetch data for the current page
  }, [currentPage]);

  const handleDelete = (id) => {
    setUserData((prevData) => prevData.filter((user) => user.id !== id));
  };

  const handleUpdate = (user) => {
    setEditingUser(user); // Set the user being edited
    setFormData({ firstName: user.first_name, lastName: user.last_name }); // Pre-fill the form with user data
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const response = await fetch(`${API_URL}api/users/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("Updated user:", updatedUser);

        // Update the local state with the new user data
        setUserData((prevData) =>
          prevData.map((user) =>
            user.id === editingUser.id
              ? {
                  ...user,
                  first_name: formData.firstName,
                  last_name: formData.lastName,
                }
              : user
          )
        );

        setEditingUser(null); // Close the modal
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div
      style={{
        height: "100vh", // Full viewport height
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Space out the content
        alignItems: "center", // Center horizontally
        padding: "20px",
        boxSizing: "border-box", // Include padding in height calculation
      }}
    >
      {/* Heading */}
      <h1
        style={{
          fontFamily: "HelveticaNeue",
          fontSize: "32px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        USERS
      </h1>

      {/* User List */}
      <div
        style={{
          flex: 1, // Allow the user list to grow and take available space
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center the cards horizontally
          gap: "10px", // Reduced vertical gap between cards
          overflowY: "auto", // Add scrolling only for the user list if needed
          width: "100%", // Ensure the list takes full width
        }}
      >
        {userData.length === 0 ? (
          <p>No users available.</p>
        ) : (
          userData.map((user) => (
            <div
              key={user.id}
              style={{
                width: "50%", // Set the width of each card to 50%
              }}
            >
              <Card
                firstName={user.first_name}
                lastName={user.last_name}
                avatar={user.avatar}
                onDelete={() => handleDelete(user.id)}
                onUpdate={() => handleUpdate(user)}
              />
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          style={{
            padding: "8px 16px",
            backgroundColor: currentPage === 1 ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{
            padding: "8px 16px",
            backgroundColor: currentPage === totalPages ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>

      {/* Modal for Editing User */}
      {editingUser && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#f0f8ff", // Light blue background
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            width: "400px", // Increased width
            height: "300px", // Increased height
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            Edit User
          </h3>
          <form onSubmit={handleFormSubmit} style={{ flex: 1 }}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px" }}>
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px" }}>
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
