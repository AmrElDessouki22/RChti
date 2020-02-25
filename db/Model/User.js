const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

 
const UserSchema = new Schema({
    name: { type: String},
    age: { type: Number},
    username: { type: String},
    email: { type: String, required:true ,unique:true},
    password: { type: String ,required:true},
    phone: {type : Number},
    avatar:{type:Buffer}
    ,gender:{type:String},
    location:{type:String},
    Token:[{token:{type:String}}]
},{timestamps:true})
UserSchema.virtual('Request',{
    ref:'Request',
    localField:'_id',
    foreignField:'owner'
})
UserSchema.virtual('RequestWorker',{
    ref:'Request',
    localField:'_id',
    foreignField:'worker'
})
UserSchema.methods.token = async function()
{
    try{
    const user = this
    const Token =  jwt.sign({ id:user._id}, process.env.TOKENKEY)
    user.Token = await user.Token.concat({token:Token})
    await user.save()
    }catch(e)
    {
    
        throw new Error(e.message)
        
    }
}
UserSchema.methods.toJSON = function()
{
    
    const user_ = this
    const user = user_.toObject()
    delete user.password
    delete user.Token
    return user

}
UserSchema.statics.CheckUser = async (email,password)=>
{
    const user_ = await MyModel.findOne({email:email})
    if(!user_)
    {
        console.log(email);
        throw new Error("can't login")
        
        
    }
    const bcyCheck = await bcrypt.compare(password, user_.password)
    if(!bcyCheck)
    {
        console.log('password : '+password);
        throw new Error("can't login")
    }
    return user_
}
UserSchema.pre('save',async function(next)
{
    const user = this
    const password = user.password
    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(password, 8)
    }
    next()
})
const MyModel = mongoose.model('User',UserSchema)
module.exports = MyModel