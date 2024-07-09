const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hotel-todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/todos', require('./routes/todos'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
