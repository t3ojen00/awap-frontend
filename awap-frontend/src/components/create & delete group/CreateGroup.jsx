import React, { useState } from "react";

const CreateGroup = ({ onAddGroup, user }) => {
  const [groupName, setGroupName] = useState("");

  const handleCreate = () => {
    if (!groupName) return alert("Group name is required!");

    const newGroup = {
      group_name: groupName, // Using 'group_name' instead of 'name'
      owner_id: user.user_id, // Using 'owner_id' to match the backend schema
      owner_name: user.name,  // Retain for display purposes
    };

    onAddGroup(newGroup);
    setGroupName(""); // Reset input field
  };

  return (
    <div>
      
      <input
        type="text"
        placeholder="Enter group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default CreateGroup;
