const express = require('express');
const app = express();


const dotenv = require('dotenv');
const mongoose = require('mongoose');


//router
const authRoute = require('./routes/auth');
const farmerRoute = require('./routes/farmers');
const terrainRoute = require ('./routes/terrains');
global.secretKey = "k0of1nT0kn";

dotenv.config();
app.use(express.json());


mongoose.connect(process.env.MONGO_URL,{
    // useNewUrlParser: true,
    // useUnifiedTopology:true,
    // useCreateIndex:true,
}).then(
    console.log('connected to mongodb')
).catch((error)=>console.log(error));

app.use('/api/auth',authRoute);
app.use('/api/farmers',farmerRoute);
app.use('/api/terrains',terrainRoute);


app.listen("4000", ()=>{
    console.log('backend working');
});
