const bookModel = require('../models/bookModel');
const UserModel = require('../models/userModel');
const validator = require('validator');

const userValidations = async function(req,res,next){

    try{
        const {title,phone,name,email,password} = req.body;

        if(!title ||!phone ||!name ||!email ||!password)
        return res.status(400).send({status:false, message:"Required field missing"});


        if(title.trim().length===0||name.trim().length===0||email.trim().length===0||password.trim().length===0||phone.trim().length===0){
            return res.status(400).send({status:false, message:"invalid input"});
        }

        if (!["Mr", "Mrs", "Miss"].includes(title)) {
            return res.status(400).send({ status: false, msg: "Invalid title" });
          }

          if(!(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone))){
            return res.status(400).send({status:false,message:"Mobile number is not valid"})
        }
          
          if(!validator.isEmail(email)){
            return res.status(400).send({ status:false, message:"invalid email"});
          }

        const unique = await UserModel.findOne({$or:[{email},{phone}]});
        if(unique){
            return res.status(400).send({status:false, message:"Email or Phone Number already exists"});
        }

    
        if(!(password.length>=8 && password.length<=15)){
            return res.status(400).send({ status:false, message:"invalid password"});
        }
          next();
        
    }catch(error){
        return res.status(500).send({status:false, message:error.message});
    }
}
const bookValidation= async (req,res,next)=>{
  try{
     const {title,excerpt,userId,ISBN,category,subcategory,releasedAt} = req.body;
     if(!title || !excerpt||!userId || !ISBN || !category || !subcategory||!releasedAt)
     {
      return res.status(400).json({status:false,message:"required field missing"});
     }
     if(userId.trim().length!=24 || !(/^[0-9a-fA-F]+$/.test(userId.trim())))
     {
      return res.status(400).json({status:false,message:"Invalid User ID"});
     }
     next();
  }
  catch(err){
    return res.status(500).send({status:false, message:err.message});
  }
}
module.exports = {userValidations,bookValidation};