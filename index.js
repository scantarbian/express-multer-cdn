require('dotenv').config()
const express = require('express')
const multer = require('multer')
const cors = require('cors')

//express variables
const app = express()
const port = process.env.PORT
const corsOptions = {
    origin: process.env.TARGET_URL,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.listen(port, () => {
    console.log(`CDN active at http://localhost:${port}`)
})

app.use(express.static('public'), )

//CORS preflights
app.options('*', cors(corsOptions))

//multer settings
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public/uploads/${req.body.owner}`,)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
})

const docsStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public/uploads/${req.body.owner}/${req.body.request}`,)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
})

const uploadImage = multer({ storage: imageStorage })
const uploadDocs = multer({ storage: docsStorage })

app.post('/image', uploadImage.single("profileImage"), (req,res,next)=>{
    res.status(200).send({
        url: req.file.path
    })
})

app.post('/docs', uploadDocs.single("attachment"), (req,res,next)=>{
    res.status(200).send({
        url: req.file.path
    })
})