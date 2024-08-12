'use-strict'
const express = require('express');
const router = express.Router();
const {getBannerDetails,updateBannerDetails} = require('../Controller/bannerController.js')

router.get('/bannerdetails',getBannerDetails);
router.post('/updatebannerdetails',updateBannerDetails);

module.exports = router;