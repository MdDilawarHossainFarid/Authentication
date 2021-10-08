const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to  tha API' });
});

app.post('/api/post', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post is created....',
        authData,
      });
    }
  });
  res.json({ message: ' Post created' });
});

app.post('api/login', (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const user = { name: name, phone: phone };
  const token = jwt.sign(user, 'Dil@123', (err, token) => {
    res.json(token);
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  console.log(bearerHeader);
  if (typeof bearerHeader !== 'undefine') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = app;
