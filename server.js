const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const urlRoutes=require('./routes/url');
const URL=require('./models/url');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
require('dotenv').config();

// Connect to MongoDB
const url=process.env.MONGO_URL;
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log('MongoDB connected'))
    .catch(err=>console.log(err));

const port=process.env.PORT ||3000;



app.use('/url',urlRoutes);
app.get('/:shortId',async(req,res)=>{
    const shortID=req.params.shortId;
    const url=await URL.findOne({shortID
    });
    if(!url) return res.status(404).json({message:'URL not found'});
    url.visitHistory.push({timestamp:Date.now()});
    await url.save();
    return res.redirect(url.redirectURL);
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}
);

