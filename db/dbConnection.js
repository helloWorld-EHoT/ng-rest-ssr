const mongoose = require('mongoose');

const dbName = 'rest';
mongoose.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err);
});

db.once('open', () => {
  console.log(`MongoDB connected to "${dbName}" database`);
});

module.exports = db;
