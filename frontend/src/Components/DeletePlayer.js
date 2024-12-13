import React, { useState } from 'react';

const DeletePlayer = ({navigate}) => {
  const [playerId, setplayerId] = useState('');
  const [message, setMessage] = useState(''); 

  const DeletePlayer = () => {
    fetch(`http://localhost:1911/players/delete/${playerId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({playerId}), 
      credentials:"include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete Player. status code ${response.status}, message
          ${JSON.stringify(response.text())}`);
      }
      setMessage('Player deleted successfully');
      alert('Player deleted successfully'); 
    })
    .catch((error) => {
      setMessage(`Error: ${error.message}`); 
      alert(error.message); 
    });
  };
  return (
    <div className="form-section">
      <h2>Delete Players</h2>
      <form>
        <input 
          type="text" 
          placeholder="Player ID" 
          value={playerId}
          onChange={(e) => setplayerId(e.target.value)} 
          required 
        /><br />
        <button type="button" onClick={DeletePlayer}>Delete Player</button>
      </form>
      {message && <p>{message}</p>} 
      <button onClick={() => navigate('admin-page')}>Back to Admin page</button>
    </div>
  );
};

export default DeletePlayer;