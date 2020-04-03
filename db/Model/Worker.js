const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

 
const UserSchema = new Schema({
    name: { type: String},
    username:{type:String},
    age: { type: Number},
    username: { type: String},
    id: { type: String, required:true ,unique:true},
    password: { type: String ,required:true},
    phone: {type : Number},
    avatar:{type:Buffer},
    accept:{type:String,ref:'Request'}
    ,gender:{type:String},
    location:{type:String},
    Token:[{token:{type:String}}]
},{timestamps:true})
UserSchema.virtual('RequestUser',{
    ref:'Request',
    localField:'_id',
    foreignField:'owner'
})

UserSchema.methods.token = async function()
{
    try{
    const worker = this
    const token =  jwt.sign({id:worker._id},'thisismytokenworker')
    worker.Token = await worker.Token.concat({token:token})
    worker.save()
    }catch(e)
    {
        console.log(e.message);
        
    }


}
UserSchema.statics.checklogin = async (id , password)=>
{
    const findIt = await Mymodel.findOne({id:id})
    if(!findIt)
    {
        throw new Error('cant login ')
    }
    const password_ = await findIt.password
    const compare = await bcrypt.compare(password,password_)
    if(!compare)
    {
        throw new Error('cant login ')
    }
    return findIt

}
UserSchema.pre('save',async function(){
    const worker = this
    if(worker.isModified('password'))
    {
        worker.password = await bcrypt.hash(worker.password,8)
        worker.save()
    }
})
UserSchema.methods.toJSON = function()
{
    const user = this
    const userobject = user.toObject() 
    delete userobject.password
    delete userobject.Token
    return userobject
}
const Mymodel = mongoose.model('Worker',UserSchema)
module.exports = Mymodel