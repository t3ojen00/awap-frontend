import React from "react";

const GroupList = ({ groups, onViewGroup, user }) => {
  return (
    <div>
      <h2>All Groups</h2>
      {groups.length === 0 ? (
        <p>No groups available. Create one!</p>
      ) : (
        <ul>
          {groups.map((group) => (
            <li key={group.group_id}> {/* Use group_id instead of id */}
              <span>{group.group_name}</span> {/* Use group_name instead of name */}
              {group.owner_id === user.user_id && <strong> (Owner)</strong>} {/* Use owner_id */}
              <button onClick={() => onViewGroup(group)}>View</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupList;
