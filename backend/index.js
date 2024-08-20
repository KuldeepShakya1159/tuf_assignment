require('dotenv').config();
// require('./Database/config.js')
const express = require('express');
const cors = require('cors');
const app=express();
const PORT = process.env.PORT;



const BannerRoutes = require('./Routes/bannerRoute')
app.use(express.json());
app.use(cors({
    origin:['https://tuf-assignmentfrontend-521wia8u2-kuldeep-shakyas-projects.vercel.app','https://tuf-assignmentfrontend-kuldeep-shakyas-projects.vercel.app'],
    methods:["GET","POST","PUT","DELETE"]
}))

app.get('/',(req,res)=>{
    res.send('Welcome to Kuldeep Assginment')
})

app.use('/api/banner',BannerRoutes);

app.listen(PORT,(error)=>{
    if(error){
        console.log(`error while starting the server ${error}`);
    }

    console.log(`server has started at ${PORT}`);
})
