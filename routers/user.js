const express = require('express')
const app = new express.Router()
const upload = require('../src/multer')
const user = require('../db/Model/User')
const request = require('../db/Model/Request')
const auth = require('../middleware/auth')
const sharp = require('sharp')

app.post('/adduser',async(req,res)=>
{
    try{
        const userBody = await user(req.body)
        await userBody.token()
        res.cookie('token',await userBody.Token[0]['token'])
        res.status(200).send(userBody)
       

    }catch(e)
    {
        res.status(404).send(e.message)
    }
},(error,res,next)=>
{
    res.send(error.message)

})

app.post('/login',async(req,res)=>
{
    try{
      
        
        const userBody = await user.CheckUser(req.body.email,req.body.password)
        await userBody.token()
        console.log(userBody);
        
        const token = await userBody.Token[0]['token']
        res.cookie('token',token)
        res.status(200).send()
        

    }catch(e)
    {
        res.send(e.message)
    }
},(error,res,next)=>
{
    res.send(error.message)

})

app.patch('/update',auth,async(req,res)=>
{
    const keys = Object.keys(req.body)
    const allaw = ['password','email','name','age','gender','phone']
    const check = keys.every((key)=>allaw.includes(key))
    try{
        if(!check)
        {
            throw new Error('key not include update doesnt compelet ')

        }
        keys.forEach((key)=>
        {
            req.user[key] = req.body[key]

        })
        const updateUser = await req.user.save()
        res.send(updateUser)

    }catch(e)
    {
        res.send(e.message)
    }
},(error,res,next)=>
{
    res.send(error.message)

})

app.post('/logout',auth,async(req,res)=>
{
    const token_ = req.token
    try{
        req.user.Token =  req.user.Token.filter((t)=>
       {
           return t.token  !== token_
       })
         await req.user.save()
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
app.post('/logoutall',auth,async(req,res)=>
{
   
    try{
        req.user.Token =  []
        await req.user.save()
        res.cookie('token','')
        res.send(req.user)

    }catch(e)
    {
        res.send(e.message)
    }
},(error,res,next)=>
{
    res.send(error.message)

})

app.delete('/delete',auth,async(req,res)=>
{
   
    try{
        const userfound = await user.findOne({_id:req.user._id})
        if(!userfound)
        {
            throw new Error('cant do this now')
        }
        userfound.remove()
        res.send('done remove we wait to vist us agine')

    }catch(e)
    {
        res.send(e.message)
    }
},(error,res,next)=>
{
    res.send(error.message)

})
app.post('/addrequest',auth,async(req,res)=>
{
   
    try{
        const request_ = await request({...req.body,owner:req.user._id}).save() 
        res.send(request_)

    }catch(e)
    {
        res.send(e.message)
    }
},(error,res,next)=>
{
    res.send(error.message)

})
app.get('',(req,res)=>
{
    res.render('index')
})
app.get('/gettasks',auth,async(req,res)=>
{
   
    try{
        const request_ = await req.user.populate('Request').execPopulate()
        res.send(request_.Request)

    }catch(e)
    {
        res.send(e.message)
    }
},(error,res,next)=>
{
    res.send(error.message)

})
app.post('/avatar/me',auth,upload.single('avatars'),async(req,res)=>
{
   
    try{
        
        
        const buffer = await sharp(req.file.buffer)
        .rotate()
        .resize({height:250,width: 250})
        .png()
        .toBuffer()
  console.log(buffer);
  
  
        req.user.avatar = buffer
        await req.user.save()
        res.status(200).send(req.user)

    }catch(e)
    {
        res.status(404).send(e.message)
        console.log(e.message);
        
    }
},(error,res,next)=>
{
    res.send(error.message)

})
app.get('/avatar/:id',async(req,res)=>
{
    try{
        const find = await user.findOne({_id:req.params.id})
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
app.get('/checkuser',auth,async(req,res)=>
{
   
    try{
        if(req.user)
        {
            res.status(200).send(req.user)
        }

    }catch(e)
    {
        res.status(404).send(e.message)
    }
},(error,res,next)=>
{
    res.status(404).send(error.message)

})
app.get('',(req,res)=>
{
    res.render('index')
})
app.get('/login',(req,res)=>
{
    res.render('login')
})
app.get('/welcome',(req,res)=>
{
    res.render('welcome')
})


module.exports= app
