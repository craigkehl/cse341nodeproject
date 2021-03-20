
const path = require('path');
const express = require('express');
const DATABASE_URL = require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

const meetingsRoutes = require('./routes/meeting');
const adminRoutes = require('./routes/admin');

app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(meetingsRoutes);
app.use(adminRoutes);

app.listen(PORT);