require('dotenv').config();
const express = require('express');

const app=express();
const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.send('its working')
})

app.listen(PORT,(error)=>{
    if(error){
        console.log(`error while starting the server ${error}`);
    }

    console.log(`server has started at ${PORT}`);
})