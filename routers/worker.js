const express = require('express')
const app = new express.Router()
const worker = require('../db/Model/Worker')
const authworker = require('../middleware/authWorker')
const requestes = require('../db/Model/Request')
const upload = require('../src/multer')
const user = require('../db/Model/User')
const sharp = require('sharp')

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
        const worker_ = await worker.checklogin(req.body.id,req.body.password)
        await worker_.token()
        res.cookie('token',await worker_.Token[0]['token'])
        res.status(200).send()
    }catch(e)
    {
        res.status(404).send(e.message)

    }

},(error,res,next)=>
{
    res.status(404).send(error.message)
    next()
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
        res.cookie('token','')
        
        res.status(200).send()
    }catch(e)
    {
        res.status(404).send(e.message)

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
///////////////////////////////////////////////////////////////
app.get('/myrequestaccept',authworker,async (req,res)=>
{
    try{
    const reqestworker = await requestes.find({worker:req.worker._id,done:false})
    res.status(200).send(reqestworker)
    }catch(e)
    {
        res.status(404).send(e)
    }


},(error,res,next)=>
{
    res.status(404).send(e)
    

})

app.get('/userinfo/:id',authworker,async (req,res)=>
{
    try{
    const reqestworker = await requestes.findById(req.params.id)
    await reqestworker.populate('owner').execPopulate()
    res.status(200).send(reqestworker.owner)
    }catch(e)
    {
        res.status(404).send(e)
    }


},(error,res,next)=>
{
    res.status(404).send(e)
    

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
        res.status(200).send(requestItems)
    }catch(e)
    {
        res.status(404).send(e.message)
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
app.get('/checkuserworker',authworker,(req,res)=>
{
    try{
    if(req.worker)
    {
        res.status(200).send(req.worker)
    }else
    {
        res.status(404).send()
    }
}catch(e)
{
    res.status(404).send()

}


})
app.post('/avatarworker/me',authworker,upload.single('avatars'),async(req,res)=>
{
    try{
        const buffer = await sharp(req.file.buffer).rotate()
        .resize({height:250,width: 250})
        .png()
        .toBuffer()
        if(req.file.size >1600000)
        {
            throw new Error('cant upload this file max size 1.6 MB')
        }
        req.worker.avatar = buffer
        await req.worker.save()
        res.status(200).send(req.user)
}catch(e)
{
    res.status(404).send()

}
})
app.get('/avatarworker/:id',async(req,res)=>
{
    try{
        const find = await worker.findOne({_id:req.params.id})
        if(!find && !find.avatar)
        {
            return new Error('not found')
    
        }
        res.set('Content-Type','image/jpg')
        res.status(200).send(find.avatar)

    }catch(e)
    {
        res.status(404).send(e.message)
    }
},(error,res,next)=>
{
    res.send(error.message)

})
//////////////////////////////////////////////////////////////////
app.post('/donerequestworker/:id',authworker,async(req,res)=>
{
    try{
        const request = await requestes.findById(req.params.id)
        request.doneaverage = req.body.doneaverage
        await request.save()
        res.status(200).send()

    }catch(e)
    {
        res.status(404).send(e.message)
    }
},(error,res,next)=>
{
    res.send(error.message)

})
//////////////// ////////////// ///
app.post('/addpoints/:id',authworker,async(req,res)=>
{
   
    
    try{
        const request = await requestes.findOne({_id:req.body.id,done:false,worker:req.worker._id,owner:req.params.id})
        
        if(request == [])
        {
            console.log(request);
            
            return res.status(404).send('not found request')
        }
        const user_ = await user.findById(req.params.id)
        console.log(user_);
        if(!user_.points)
        {
        user_.points = parseFloat(req.body.points)

        }else{
        user_.points = parseFloat(req.body.points) + parseFloat(user_.points)
        }
        request.done = true
        await request.save()
        await user_.save()
        res.status(200).send()

    }catch(e)
    {
        res.status(404).send(e.message)
    }
},(error,res,next)=>
{
    res.send(error.message)

})
app.get('/worker',(req,res)=>
{
    res.render('workerLogin')
})

app.get('/welcomeworker',(req,res)=>
{
    res.render('welcomeworker')
})
app.get('/workerrequest',(req,res)=>
{
    res.render('workerrquest')
})
app.get('/workerproccessreq',(req,res)=>
{
    res.render('workerproccesrequest')
})
app.get('/doneform',(req,res)=>
{
    res.render('doneform')
})
module.exports = app