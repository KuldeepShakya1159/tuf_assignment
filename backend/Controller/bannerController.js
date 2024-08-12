'use-strict'
const {getBannerDetailsService,updateBannerDetailService} = require('../Services/bannerService');

const getBannerDetails = async(req,res)=>{
    try{
        console.log('Getting BannerData from DB');
        const result = await getBannerDetailsService();
        console.log(result);
        if(result.status){
            res.send(result.data[0])
        }else{
            res.send(result)
        }
        
    }catch(error){
        console.log(error);
        return error;
    }
}

const updateBannerDetails = async(req,res)=>{
    try{
        console.log('Updating the Banner Data from DB');
        // const {title,description,days,hours,minutes,seconds,btext,blink} = req.body;
        console.log(">>>>>>>>>>>>",req.body);
        const result = await updateBannerDetailService(req.body);
        
        console.log('updated result',result);
        if(result.status){
            return res.status(200).json({status:result.status,data:result.data});
        }else{
            return res.status(200).json({status:result.status,message:'Updating content Failed'});
        }
    }catch(error){
        console.log(error);
        return res.status(500).send(`Something went wrong ${error}`);
    }
}

module.exports={getBannerDetails,updateBannerDetails}