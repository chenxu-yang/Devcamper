const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//load env vars
dotenv.config({ path: './config/config.env' });

//connect to database
connectDB();

// route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');

const app = express();
//body parser
app.use(express.json());
//dev logging middleware
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}
//file upload
app.use(fileupload());
//set static folder
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 5000;
//mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use(errorHandler);
app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`error:${err.message}`.red);
  //close server & exit process
  app.close(() => process.exit(1));
});
