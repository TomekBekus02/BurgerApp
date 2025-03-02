require('dotnev').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const crypto = require('crypto');
const session = require('express-session');
const MongodbStore = require('connect-mongodb-session')(session)

//const restaurantRoutes = require('./routes/restaurant');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/products');
const toppingRoutes = require('./routes/topping');

const MONGODB_URI = process.env.DATABASE_URI
const secret = crypto.randomBytes(64).toString('hex');
const store = new MongodbStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})
app.use(express.json());
app.use(cors());
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use(productRoutes);
app.use(toppingRoutes);
//app.use(restaurantRoutes);
app.use('/admin', adminRoutes);

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        app.listen(3000);
        console.log('database Connected');
    })
    .catch(err => console.error(err));
