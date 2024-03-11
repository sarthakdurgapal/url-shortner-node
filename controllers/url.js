const shortid = require('shortid');
const URL = require('../models/url');
async function handleGenereateNewShortURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({message:'URL is required'});
    const shortId=shortid.generate();
    await URL.create({
        shortID:shortId,
        redirectURL:body.url,
        visitHistory:[]
    });
    return res.json({shortId});
}

async function handleGetAnalytics(req,res){
    const shortID=req.params.shortId;
    const url=await URL.findOne({
        shortID
    });
    if(!url) return res.status(404).json({message:'URL not found'});
    return res.json({totalclicks:url.visitHistory.length ,analytics: url.visitHistory});
}
module.exports={
    handleGenereateNewShortURL,
    handleGetAnalytics
}
