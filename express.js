
//// ideally we should use import instead of require
const express = require('express');

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const redis = require('redis');
const faqRoutes = require('./routes/faq');
require('dotenv').config();

const app = express();


app.use(morgan('dev'));


//// body parser middleware to parse json request body
app.use(bodyParser.json());



/// i have added .env file so that i can store mongodb uri and redis url in it 
//// for production
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/faqdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


const redisClient = redis.createClient({ url: process.env.REDIS_URL || 'redis://127.0.0.1:6379' });
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});
redisClient.connect();

//// we need to pass redis client to all routes so that we can use it in the controller
app.use((req, res, next) => {
  req.redisClient = redisClient;
  next();
});


app.use('/faqs', faqRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
