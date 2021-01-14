const express = require('express');
const app = express();
const path = require('path');
const characterController = require('./controllers/characterController.js')
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost/dndspelllist';
mongoose.connect(mongoURI);

// const leaderList = [
//   { name: 'Anna', id: 'a0' },
//   { name: 'Ben', id: 'b0' },
//   { name: 'Clara', id: 'c0' },
//   { name: 'David', id: 'd0' },
// ];

// app.get('/api/leaders', (req, res) => {
//   return res.status(200).send(leaderList);
// });
app.use(express.json());

app.get('/character', characterController.getCharacters, (req, res) => {
  return res.status(200).json([...res.locals.list])
})

app.post('/character', characterController.addCharacter, (req, res) => {
  return res.status(200).json(res.locals.added)
})

app.delete('/character', characterController.deleteCharacter, (req, res) => {
  return res.status(200).json(res.locals.deleted)
})

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(3000); //listens on port 3000 -> http://localhost:3000/
