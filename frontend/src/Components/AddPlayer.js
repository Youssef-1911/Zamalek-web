import React, { useState } from 'react';

const AddPlayer = () => {
  const [name, setname] = useState('');
  const [position, setposition] = useState('');
  const [bio, setbio] = useState('');
  const [nationality, setnationality] = useState('');
  const [photo,setphoto] = useState('')
  const [message, setMessage] = useState(''); 

  const AddPlayer = () => {
    fetch('http://localhost:1911/players/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name,position,bio,nationality,photo}), 
      credentials:"include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to add Player. status code ${response.status}, message
          ${JSON.stringify(response.text())}`);
      }
      setMessage('Player added successfully');
      alert('Player added successfully'); 
    })
    .catch((error) => {
      setMessage(`Error: ${error.message}`); 
      alert(error.message); 
    });
  };
  return (
    <div className="form-section">
      <h2>Add Players</h2>
      <form>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setname(e.target.value)} 
          required 
        /><br />
        <input 
          type="text" 
          placeholder="Position" 
          value={position} 
          onChange={(e) => setposition(e.target.value)} 
          required 
        /><br />
        <input 
          type="text" 
          placeholder='Bio'
          value={bio} 
          onChange={(e) => setbio(e.target.value)} 
          required 
        /><br />
        <input 
          type="text" 
          placeholder="Nationality" 
          value={nationality} 
          onChange={(e) => setnationality(e.target.value)} 
          required 
        /><br />
        <input
        type="integer"
        placeholder="Number"
        value={photo}
        onChange={(e)=> setphoto(e.target.value)}
        required
        /><br/>
        <button type="button" onClick={AddPlayer}>Add Player</button>
      </form>
      {message && <p>{message}</p>} 
    </div>
  );
};

export default AddPlayer;