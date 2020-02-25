const jwt = require('jsonwebtoken')
const user = require('../db/Model/User')
const auth = async (req,res,next)=>
{
    try{
    const token = await req.header('Authorization').replace('Bearer ','')
    const decoded =  jwt.verify(token, process.env.TOKENKEY)
    const findUser =await user.findOne({_id:decoded.id}) 
    if(!findUser)
    {
        throw new Error('user not found please login in agin')
    }
    req.user = findUser
    req.token = token
    next()
}catch(e)
{
    res.status(404).send(e.message);
    
}
    
}
module.exports=auth