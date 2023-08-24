// index.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const  authMiddleware  = require('./middleware/authMiddleware');

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', authMiddleware, blogRoutes);


// app.get('/', (req, res) => {
//     res.send('Homepage');
// })

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});