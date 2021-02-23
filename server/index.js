const { Nuxt, Builder} = require('nuxt')
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
app.use(cors())

const cookieParser=require('cookie-parser')
const mongoose = require('mongoose')


// Create express instance

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
 app.use(cookieParser());

// Require API routes
const users = require('./routes/userRoutes')
const songs = require('./routes/musicRouter')

// Import API Routes
app.use('/api',users)
app.use('/api/music',songs);

// Start standalone server if directly running
let config = require('../nuxt.config')
config.dev = !(process.env.NODE_ENV === 'production')

const nuxt = new Nuxt(config)

if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(nuxt.render)
const DB = config.env.DATABASE.replace(
  '<PASSWORD>',
  config.env.DATABASE_PASSWORD
);
mongoose
.connect(DB ,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true 
})
.then(() => console.log('DB connection successful!'));

app.listen(port);
console.log('Server is listening on ' + host + ':' + port)
