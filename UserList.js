import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/api';
import UserItem from './UserItem';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-list">
      <h2>User Management</h2>
      <button onClick={() => navigate('/add')} className="add-user-btn">
        Add New Management
      </button>
      <div className="users-container">
        {users.map(user => (
          <UserItem 
            key={user.id} 
            user={user} 
            onDelete={handleDelete} 
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;