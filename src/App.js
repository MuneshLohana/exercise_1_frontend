import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch records from the backend when the component mounts
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/records/getAll');
      setRecords(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to the backend
      await axios.post('http://localhost:5000/records/add', {
        name: name,
        phoneNumber: phoneNumber,
      });

      // Fetch updated records from the backend
      fetchRecords();

      // Clear form fields
      setName('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Error submitting data:', error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>React Node App</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="name" style={styles.label}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <br />
        <label htmlFor="phoneNumber" style={styles.label}>
          Phone Number:
        </label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          style={styles.input}
        />
        <br />
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
      <div>
        <h2 style={styles.header}>Records</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{record.id}</td>
                <td style={styles.tableCell}>{record.name}</td>
                <td style={styles.tableCell}>{record.phonenumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    margin: '20px',
  },
  header: {
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  label: {
    marginRight: '10px',
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    padding: '8px',
    marginBottom: '10px',
    width: '200px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#B30000',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#B30000',
    color: 'white',
    padding: '10px',
    textAlign: 'left',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'left',
  },
};

export default App;
