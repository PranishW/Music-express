const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const Song = require('./model')
const app = express()
const MongoURI = "mongodb://localhost:27017/music"
mongoose.connect(MongoURI)
    .then(()=>{
        console.log("Connected to DB")
    })

app.use(express.json())
app.use(bodyparser.urlencoded({extended:false}))
app.set('view engine','ejs')

app.get("/", async(req,res)=>{
    let songs = await Song.find()
    res.render('music',{songs:songs})
})
app.post("/",async(req,res)=>{
    const song = new Song(req.body)
    const newsong = await song.save()
    res.redirect("/")
})
app.get("/delete/:id",async (req,res)=>{
    let song = await Song.findById(req.params.id)
    song = await Song.findByIdAndDelete(req.params.id)
    res.redirect("/")
})
app.get("/search",async (req,res)=>{
    let filteredsongs = await Song.find({director:req.query.director})
    res.render('search',{songs:filteredsongs})
})
app.get("/singer",async (req,res)=>{
    let filteredsongs = await Song.find({director:req.query.director,singer:req.query.singer})
    res.render('search',{songs:filteredsongs})
})
app.listen(7000,()=>{
    console.log("Listening on Port 7000")
})