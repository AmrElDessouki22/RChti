const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOOSEDB, {
  useNewUrlParser: true,
  useCreateIndex: true
})