import React, { useEffect, useState } from 'react';

function BuyerTable() {
  const [buyers, setBuyers] = useState([]);
  const [csrfToken, setCsrfToken] = useState('');

  // Fetch CSRF token on mount
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get-csrf-token/', {
          method: 'GET',
          mode: 'cors',
        });
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };

    getCsrfToken();
  }, []);

  // Fetch buyers once CSRF token is available
  useEffect(() => {
    if (!csrfToken) return;

    fetch('http://localhost:8000/api/buyers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    })
      .then(res => res.json())
      .then(data => setBuyers(data))
      .catch(err => console.error('Failed to fetch buyers:', err));
  }, [csrfToken]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Montserrat' }}>
      <h2 style={{ marginBottom: '20px', color: '#f84258' }}>Buyer Details</h2>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
        fontSize: '0.95rem',
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f84258', color: 'white' }}>
            <th style={{ padding: '12px' }}>Name</th>
            <th style={{ padding: '12px' }}>Email</th>
            <th style={{ padding: '12px' }}>Address</th>
            <th style={{ padding: '12px' }}>Product</th>
            <th style={{ padding: '12px' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map((b, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>{b.name}</td>
              <td style={{ padding: '12px' }}>{b.email}</td>
              <td style={{ padding: '12px' }}>{b.address}</td>
              <td style={{ padding: '12px' }}>{b.product_name}</td>
              <td style={{ padding: '12px' }}>₹{b.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BuyerTable;
