const worker = require('../db/Model/Worker')
const jwt = require('jsonwebtoken')
const authWorker = async(req,res,next)=>
{
    try{  
    const token = req.header('Authorization').replace('Bearer ','')
    const tokenDecode =  jwt.verify(token,'thisismytokenworker')
    const findIt = await worker.findOne({_id:tokenDecode.id})
    if(!findIt)
    {
        throw new Error('cant login')
    }
    req.worker = findIt
    req.token = token
    next()
    }catch(e)
    {        
        res.status(404).send(e.message)

    }

}
module.exports = authWorker