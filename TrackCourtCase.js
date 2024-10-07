import React, { useState } from 'react';

const TrackCourtCase = () => {
  const [caseNumber, setCaseNumber] = useState('');
  const [caseInfo, setCaseInfo] = useState(null);

  const trackCase = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/courtcase?case_number=${caseNumber}`);
      const data = await response.json();
      setCaseInfo(data);
    } catch (error) {
      console.error('Error tracking court case:', error);
    }
  };

  return (
    <div>
      <h2>Track Court Case</h2>
      <input 
        type="text" 
        value={caseNumber} 
        onChange={(e) => setCaseNumber(e.target.value)} 
        placeholder="Enter case number"
      />
      <button onClick={trackCase}>Track Case</button>

      {caseInfo && (
        <div>
          <h3>Case Details:</h3>
          <p>Case Number: {caseInfo.case_number}</p>
          <p>Status: {caseInfo.status}</p>
          <p>Description: {caseInfo.description}</p>
        </div>
      )}
    </div>
  );
};

export default TrackCourtCase;