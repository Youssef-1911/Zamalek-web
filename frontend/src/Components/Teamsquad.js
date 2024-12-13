import React, { useState, useEffect } from 'react';




const ViewTeam = ({navigate}) => {
  const [players, setPlayers] = useState([]);

  const ViewTeam = () => {
    fetch('http://localhost:1911/player/view')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch Players');
          return [];
        }
      })
      .then((data) => {
        setPlayers(data);
      })
      .catch((error) => {
        console.error('Error fetching Products:', error);
      });
  };

  useEffect(() => {
    ViewTeam();
  }, []);

  return (
    <div>
      <h1>Team Players</h1>
      <h2>فرسان ميت عقبه</h2>
      <ul>
        {players.map((player) => (
          <li key={player.ID}>
            <strong>Name: </strong> {player.Name} <br />
            <strong>POSITION: </strong> {player.Position} <br />
            <strong>NATIONALITY: </strong> {player.Nationality} <br />
            <strong>BIO: </strong> {player.Bio}<br /> 
            <strong>NUMBER: </strong>{player.Photo}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('user-page')}>Back to Fan page</button>
    </div>
  );
};

export default ViewTeam;