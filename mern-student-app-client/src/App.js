import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Fetch student data when the component mounts and whenever the page changes
    axios.get(`http://localhost:3001/students?page=${page}&size=3`)
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [page]);

  return (
    <div>
      <h1>Student Data</h1>
      {students.map(student => (
        <div key={student.id}>
          <h2>{student.name}</h2>
          <p>Total Marks: {student.total_marks}</p>
        </div>
      ))}
      <button onClick={() => setPage(page - 1)}>Previous Page</button>
      <button onClick={() => setPage(page + 1)}>Next Page</button>
    </div>
  );
}

export default App;
