// Require necessary packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define schema for Alumni
const alumniSchema = new mongoose.Schema({
    name: String,
    batch: String,
    profile: String,
    photo: String,
    profession: String,
    achivements: String,
    email: String,
});

// Create Alumni model
const Alumni = mongoose.model('Alumni', alumniSchema);

// Set view engine
app.set('view engine', 'ejs');
let alumnig;
// Routes
app.get('/', async (req, res) => {
  try {
    // Retrieve data from MongoDB (Alumni collection)
    const alumni = await Alumni.find();
   // alumni.profile="https://"+alumni.profile;
    res.render('index', { alumni });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});
app.get(`/aa`,(req,res)=>{
  res.redirect(alumnig.profile);
})
// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    server.close(() => {
      console.log('Server stopped');
      process.exit(0);
    });
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
});
