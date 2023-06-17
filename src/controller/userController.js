const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const registerUser = async function (req, res) {
    try {
        const requestBody = req.body;
        const createData = await userModel.create(requestBody);
        res.status(201).send({ status: true, data: createData })
    }
    catch(error){
        res.status(500).send({status:false,message:error.message})
    }
}


const login= async (req,res)=>{
    try{
        let {email,password} = req.body;
        let regEmail=await userModel.findOne({email: email});
        if(!regEmail)
        {
            res.status(404).send({status:false, message:"Email not found"});
        }
        if(regEmail.password !== password)
        {
            res.status(404).send({status:false, message:"Password is incorrect"});
        }
        let token= await jwt.sign({_id:regEmail._id},"BookManagement");
        res.setHeader('x-api-token',token);
        res.status(200).send({status:true, message:""});
    }
    catch(err){
        res.status(500).send({status:false,message:err.message});
    }
}

module.exports = { registerUser,login };