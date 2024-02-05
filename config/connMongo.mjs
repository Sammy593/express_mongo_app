import mongoose from 'mongoose';

try {
  // Connect to MongoDB - Configurar valor de variable de entorno en archivo .env
  console.log(process.env.MONGO_URL_LOCAL);
  
  await mongoose.connect(process.env.MONGO_URL_LOCAL);

  // Event listeners for MongoDB connection
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}
