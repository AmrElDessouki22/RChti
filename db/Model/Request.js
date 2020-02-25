const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    owner: { type:String ,ref: 'User'},
    location: { type : String},
    worker:{type:String,ref:'Worker'},
    done:false,
    average: { type: Number }
   
},{timestamps:true})


const MyModel = mongoose.model('Request',UserSchema)
module.exports = MyModel
