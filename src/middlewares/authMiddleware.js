const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const authenticationMid = function (req, res, next) {
    try { 
      let token = req.headers["x-api-token"]; 
      if (!token)
        return res.status(400).send({ status: false, msg: "token must be present" });
   
      const decodedToken=jwt.verify(token, "BookManagement");
      if(!decodedToken){
          return res.status(400).send({status:false,msg:"token is invalid"})
      } 
      req.decodedToken=decodedToken; 
      next(); 
    } catch (error) { 
      return res.status(500).send({ status: false, msg:error.message });
    }
  }

  module.exports = {authenticationMid}