const path = require('path');
const express = require('express');
const DATABASE_URL = require('dotenv').config();


const PORT = process.env.PORT || 5100;

const app = express();

const db = require('./services/db');
const publicRoutes = require('./routes/public');
const meetingsRoutes = require('./routes/meeting');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const { runInNewContext } = require('vm');

app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/public', publicRoutes);
app.use('/auth', authRoutes);
app.use(meetingsRoutes);
app.use(adminRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

console.log('Up and running')
app.listen(PORT);