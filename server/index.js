// app.js

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB

mongoose.set('strictQuery', false);
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/TopShoeDz');


}
// Define a simple mongoose model

app.use(express.json());

// Example route
app.get('/', async (req, res) => {
  try {
    res.send('Hello World')
} catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
