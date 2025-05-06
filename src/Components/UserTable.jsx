import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAsync, deleteUser } from './userSlice';
import Spinner from './Spinner';
import '../App.css'; // import the stylesheet

const UserTable = () => {
  const [name, setName] = useState('');
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const dispatch = useDispatch();

  const handleAddUser = () => {
    if (!name.trim()) return;
    dispatch(addUserAsync({ id: Date.now(), name }));
    setName('');
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };
  
  return (
    <div className="container">
      <h2>USER MANAGEMENT</h2>
      <div  className="input-group">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder=' Add someone, example "Naynes Pol"'
        />
        <button onClick={handleAddUser}>Add</button>
      </div>

      {loading && <Spinner />}

      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
        <div className="user-list">
            {users.map((user) => (
              <div className="user-card" key={user.id}>
                <span>{user.name}</span>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </div>
            ))}
          </div>
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
