
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

// Configura el path del archivo .env
const envPath = path.join(__dirname, 'credentials.env');

// Carga las variables de entorno desde el archivo .env
dotenv.config({ path: envPath });
const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

// Middleware
app.use(bodyParser.json());

// Conexión a MongoDB Atlas
mongoose.connect(uri);
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
    // Aquí puedes comenzar a definir tus esquemas y modelos de MongoDB
  });

// Routes
app.use('/api/students', require('./routes/studentRoutes'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});