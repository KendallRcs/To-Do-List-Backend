const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 4000;

const sequelize = require('./config/database');
const User = require('./models/User');
const Task = require('./models/Task');

sequelize.sync().then(() => {
  console.log('Database synced');
});

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/tasks', require('./routes/task.routes'));

app.get('/', (req, res) => {
    res.send('API Started');
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});