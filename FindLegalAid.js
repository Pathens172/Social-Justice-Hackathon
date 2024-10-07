import React, { useState } from 'react';

const FindLegalAid = () => {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);

  const searchLegalAid = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/legalaid?location=${location}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching legal aid services:', error);
    }
  };

  return (
    <div>
      <h2>Find Legal Aid</h2>
      <input 
        type="text" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
        placeholder="Enter location"
      />
      <button onClick={searchLegalAid}>Search</button>

      <ul>
        {results.map((aid) => (
          <li key={aid.id}>
            {aid.name} - {aid.location} - {aid.contact_info}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindLegalAid;