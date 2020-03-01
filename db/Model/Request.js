const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    owner: { type:String ,ref: 'User',required:true},
    location:{type:String , required:true},
    worker:{type:String,ref:'Worker'},
    done:{type:Boolean,default: false},
    average: { type: Number ,required:true},
    phone:{type:String , required:true}
},{timestamps:true})


const MyModel = mongoose.model('Request',UserSchema)
module.exports = MyModel
