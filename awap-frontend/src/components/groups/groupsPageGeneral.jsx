import React, { useState, useEffect } from "react";
import "./groupsPageGeneral.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GroupsPageGeneral = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch groups from the backend API
    const fetchGroups = async () => {
      try {
        const response = await axios.get("/api/groups");
        setGroups(response.data);
      } catch (err) {
        console.error("Failed to fetch groups:", err);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="groups-page-general">
      {/* Navbar */}
      <nav className="navbar">
        <h1>Groups</h1>
        <div className="navbar-buttons">
          <button
            className="btn create-group"
            onClick={() => navigate("/groups/create")}
          >
            Create Group
          </button>
          <button
            className="btn your-groups"
            onClick={() => navigate("/groups/your-groups")}
          >
            Your Groups
          </button>
        </div>
      </nav>

      {/* Groups Table */}
      <table className="groups-table">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Owner Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, index) => (
            <tr key={index}>
              <td>{group.group_name}</td>
              <td>{group.owner_email}</td>
              <td>{new Date(group.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupsPageGeneral;
