const express = require('express')
const app = new express.Router()
const worker = require('../db/Model/Worker')
const authworker = require('../middleware/authWorker')
const requestes = require('../db/Model/Request')

app.post('/addworker',async(req,res)=>
{
    
    
    try{
        const worker_ = await worker(req.body).save()
        await worker_.token()
        res.send(worker_)
    }catch(e)
    {
        res.send(e.message)

    }

},(error,res,next)=>
{
    res.send(error.message)
    next()
    
})


app.post('/loginworker',async(req,res)=>
{
    
    try{
        const worker_ = await worker.checklogin(req.body.email,req.body.password)
        await worker_.token()
        res.send(worker_)
    }catch(e)
    {
        res.send(e.message)

    }

},(error,res,next)=>
{
    res.send(error.message)
})
app.patch('/updateworker',authworker,async(req,res)=>
{
    const objects = Object.keys(req.body)
    const allawed = ['password','email','name','age','gender','phone']
    const check = objects.every((key)=>allawed.includes(key))
    
    try{
        if(!check)
        {
            throw new Error('cant update')
        }
        objects.forEach((key)=>
        {
            req.worker[key] = req.body[key]
        })
        const worker_ = await req.worker.save()
        res.send(worker_)
    }catch(e)
    {
        res.send(e.message)

    }

},(error,res,next)=>
{
    res.send(error.message)
})


app.post('/logoutworker',authworker,async(req,res)=>
{
    
    try{
        req.worker.Token = req.worker.Token.filter((token)=>
        {
            return token.token != req.token
        })
        await req.worker.save()
        
        res.send(req.worker)
    }catch(e)
    {
        res.send(e.message)

    }

},(error,res,next)=>
{
    res.send(error.message)
})

app.post('/logoutworkerall',authworker,async(req,res)=>
{
    
    try{
        req.worker.Token = []
        await req.worker.save()
        res.send(req.worker)
    }catch(e)
    {
        res.send(e.message)
    }

},(error,res,next)=>
{
    res.send(error.message)
})
app.get('/requestes',authworker,async(req,res)=>
{
    
    try{
        const requestItems = await requestes.find({worker:undefined})
        res.send(requestItems)
    }catch(e)
    {
        res.send(e.message)
    }

},(error,res,next)=>
{
    res.send(error.message)
})
app.post('/accept/request/:id',authworker,async(req,res)=>
{
    
    try{
        const requestItems = await requestes.findOne({_id:req.params.id,done:false})
        requestItems.worker = req.worker._id
        await requestItems.save()
        res.send(requestItems)
    }catch(e)
    {
        res.send(e.message)
    }

},(error,res,next)=>
{
    res.send(error.message)
})

app.post('/done/request/:id',authworker,async(req,res)=>
{
    
    try{
        const requestItems = await requestes.findOne({_id:req.params.id})
        requestItems.done = true
        await requestItems.save()
        res.send(requestItems)
    }catch(e)
    {
        res.send(e.message)
    }

},(error,res,next)=>
{
    res.send(error.message)
})



module.exports = app