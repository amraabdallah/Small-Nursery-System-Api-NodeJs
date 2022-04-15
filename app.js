const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');


const AuthRouter = require('./routes/AuthRouter');
const teacherRouter = require('./routes/teacherRouter');
const childRouter = require('./routes/childRouter');
const classRouter = require('./routes/classRouter');

mongoose.connect('mongodb://localhost:27017/nursery')
  .then(() => {
    console.log('Connected to database');

    const port = 8080;
    app.listen(process.env.port || port, () => {
      console.log('Server started on port ' + port);
    });
  })
  .catch(() => {
    console.log('Connection failed');
  });

// CORS Middleware
app.use(cors());

// Morgan Middleware for logging
app.use(morgan('tiny'));

// Body Parser Middleware for parsing JSON
app.use(bodyParser.json());
// Body Parser Middleware for parsing URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))
// ========== Routes for the API ==========
app.use(AuthRouter);
app.use("/child", childRouter);
app.use("/teacher", teacherRouter);
app.use(classRouter);





//Not found middleware
app.use((req, res, next) => {
  res.status(404).json({ data: 'Resource not found' });
});

//error middleware
app.use((err, req, res, next) => {
  let status = err.status || 500;
  res.status(status).json({ ErrorMW: err.message });
});
