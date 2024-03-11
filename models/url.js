const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const urlSchema = new Schema({
    shortID:{
        type:String,
        required:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory:[{timestamp:{type : Number}}]
    },{timestamps:true}
);
const URL=mongoose.model('URL',urlSchema);
module.exports=URL;