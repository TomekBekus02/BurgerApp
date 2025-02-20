const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors")

const restaurantRoutes = require('./routes/restaurant');
const adminRoutes = require('./routes/admin');

const MONGODB_URI = "mongodb+srv://tomaszbekus02:cFaDSc8rPjN2Na6y@cluster0.uuz7m.mongodb.net/restaurant?retryWrites=true&w=majority&appName=Cluster0"

app.use(express.json());
app.use(cors());

app.use(restaurantRoutes);
app.use('/admin', adminRoutes);

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        app.listen(3000);
        console.log('database Connected');
    })
    .catch(err => console.error(err));
