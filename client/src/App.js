import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users`);
      setUsers(response.data);
    } catch (err) {
      setError("Error fetching users");
      console.error("Error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/users`, { username });
      setUsername("");
      fetchUsers();
    } catch (err) {
      setError("Error adding user");
      console.error("Error:", err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Management App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
          <button type="submit">Add User</button>
        </form>
        {error && <p className="error">{error}</p>}
        <div className="users-list">
          <h2>Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username} - Added on{" "}
                {new Date(user.created_at).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
