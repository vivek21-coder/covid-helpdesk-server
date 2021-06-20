const mongoose = require('mongoose');
const mongoosevalidator = require('mongoose-unique-validator');

const dataSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  age:{
    type:String,
  },
  aadhaar:{
    type:String,
  },
  covid_status:{
    type:String,
  },
  email:{
    type:String,
    required:true,
  },
  phone:{
    type:String,
  },
  city:{
    type:String,
    required:true,
  },
  resource:{
    type:String,
    required:true,
  },
  available_or_required:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  descriptioncity:{
    type:String,
    required:true,
  },
  date_time:{
    type:String,
    required:true,
  },
});

dataSchema.plugin(mongoosevalidator);
const Data = mongoose.model('Data', dataSchema, 'data');
module.exports = Data;
