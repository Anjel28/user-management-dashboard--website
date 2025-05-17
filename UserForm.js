import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, updateUser, getUser } from '../services/api';

const UserForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    website: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const fetchUser = async () => {
        try {
          setLoading(true);
          const data = await getUser(id);
          setUser(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEdit) {
        await updateUser(id, user);
      } else {
        await createUser(user);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-form">
      <h2>{isEdit ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Website:</label>
          <input
            type="text"
            name="website"
            value={user.website}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-btn">
          {isEdit ? 'Update User' : 'Add User'}
        </button>
        <button 
          type="button" 
          onClick={() => navigate('/')} 
          className="cancel-btn"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserForm;