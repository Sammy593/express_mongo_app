import mongoose from 'mongoose';

try {
  // Connect to MongoDB
  console.log(process.env.MONGO_URL);
  await mongoose.connect(process.env.MONGO_URL);

  // Event listeners for MongoDB connection
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}
