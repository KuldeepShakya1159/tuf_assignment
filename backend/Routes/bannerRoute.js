'use-strict'
const express = require('express');
const router = express.Router();
const {getBannerDetails,updateBannerDetails} = require('../Controller/bannerController.js')

router.get('/getdetails',getBannerDetails);
router.post('/updatedetails',updateBannerDetails);

module.exports = router;