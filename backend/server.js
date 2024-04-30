const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

let students = [];

// Load student data from CSV file into memory
fs.createReadStream('student-details.csv')
  .pipe(csv())
  .on('data', (row) => {
    students.push(row);
  });

// Pagination API
app.get('/students', (req, res) => {
  let { page, size } = req.query;
  page = parseInt(page);
  size = parseInt(size);

  const offset = (page - 1) * size;
  const paginatedItems = students.slice(offset, offset + size);

  res.json(paginatedItems);
});

// Server-side filtering API
app.get('/students/filter', (req, res) => {
  const { field, value } = req.query;
  const filteredItems = students.filter(student => student[field] === value);

  res.json(filteredItems);
});

app.listen(3001, () => console.log('Server started on port 3001'));
