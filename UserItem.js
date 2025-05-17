import React from 'react';

const UserItem = ({ user, onDelete, onEdit }) => {
  return (
    <div className="user-card">
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Website: {user.website}</p>
      </div>
      <div className="user-actions">
        <button onClick={() => onEdit(user.id)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => onDelete(user.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserItem;