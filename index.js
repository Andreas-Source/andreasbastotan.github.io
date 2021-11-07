const express = require('express');
const app = express();
const port = 8080;
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    () => console.log('Connected to the MongoDB')
);

app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/pengeluaran', postRoute);

app.listen(
    port,
    () => console.log(`alive on http://localhost:${port}`)
);