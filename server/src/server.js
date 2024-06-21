require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI,{ useNewUrlpraser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log('Connected to MongoDB');
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((e)=>{
        console.log("Connection error",e);
    });