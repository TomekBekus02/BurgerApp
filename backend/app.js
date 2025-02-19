const express = require('express');
const app = express();

const mongoose = require('mongoose')
const MONGODB_URI = "mongodb+srv://tomaszbekus02:cFaDSc8rPjN2Na6y@cluster0.uuz7m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

app.use()
mongoose
    .connect(MONGODB_URI)
    .then(result => app.listen(3000))
    .catch(err => console.error(err));
