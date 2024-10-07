import React, { useEffect, useState } from 'react';

const KnowYourRights = () => {
  const [rights, setRights] = useState({});

  useEffect(() => {
    const fetchRights = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/rights');
        const data = await response.json();
        setRights(data);
      } catch (error) {
        console.error('Error fetching rights information:', error);
      }
    };

    fetchRights();
  }, []);

  return (
    <div>
      <h2>Know Your Rights</h2>
      <ul>
        <li><strong>Labor Rights:</strong> {rights.laborRights}</li>
        <li><strong>Civil Rights:</strong> {rights.civilRights}</li>
        <li><strong>Property Rights:</strong> {rights.propertyRights}</li>
      </ul>
    </div>
  );
};

export default KnowYourRights;