const express = require('express');
const users = require('./MOCK_DATA.json');
const app = express();
const fs = require('fs');
const port = 3000;

// Middleware plugins
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const html = `<ul></ul>`;
  res.send(html);
});

app.route('/api/users/:id')
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .put((req, res) => {
    return res.json({ status: 'pending' });
  })
  .delete((req, res) => {
    return res.json({ status: 'pending' });
  });

app.post('/api/users', (req, res) => {
  try {
    const body = req.body;

    if (!body) {
      console.error('Empty request body');
      return res.status(400).json({ status: 'error', message: 'Empty request body' });
    }

    users.push({ ...body, id: users.length + 1 });

    fs.writeFile('MOCK_DATA.json', JSON.stringify(users), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return res.status(500).json({ status: 'error', message: 'Error writing to file' });
      }

      return res.json({ status: 'success' });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ status: 'error', message: 'Unexpected error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
