const path = require('path')
const cookieParser = require('cookie-parser')
const express = require('express')
require('./db/initDatabase')
const routersUser = require('./routers/user')
const routersWorker = require('./routers/worker')
const app = express()
const PORT = process.env.PORT || 3000
const hbs = require('hbs')
const static = path.join(__dirname,'./public')
const views = path.join(__dirname,'./template/views')
app.set('view engine', 'hbs');
app.set('views',views)
app.use(express.static(static))
app.use(express.json())
app.use(cookieParser())
app.use(routersUser)
app.use(routersWorker)
app.listen(PORT)