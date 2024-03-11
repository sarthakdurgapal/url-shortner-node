const express = require('express');
const {handleGenereateNewShortURL, handleGetAnalytics}=require('../controllers/url');
const router = express.Router();

router.post('/',handleGenereateNewShortURL);
router.get('/analytics',handleGetAnalytics)
module.exports=router;