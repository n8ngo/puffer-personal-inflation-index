const path = require('path');
const express = require('express');
const db = require('./models/dbConnect.js')
const app = express();
const middleware = require('./routes/middleware');

const PORT = 3000;

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, '../client')));
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../dist'));
// });
/**
 * define route handlers
 */

app.use('/solo', middleware);


// catch-all route handler
app.use((req, res) => res.status(404).send('PAGE NOT FOUND!'));

/**
 * express error handler
 * 
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  // console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
