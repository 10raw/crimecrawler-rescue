const express = require('express')
const app=express()
// const fetch=require('node-fetch')
var Twitter = require('twitter-v2')
const multer =require('multer')
const { json } = require('express')
require('dotenv').config();
const cors=require('cors')
app.use(cors())
// app.get('/feed',(req,res)=>{
//     const url1="https://api.twitter.com/2/tweets/search/recent?query=crime"
//     const options1={
//         method:"GET",
//         headers:{
//             'Content-Type': 'application/json' ,
//             
//         }
//     }
//     const response= fetch(url1,options1)
//     // console.log(response)
//     // res.json(
//         response.then(ress=>res.send(ress))
//         // res.send(ress)
// })
const list=[
    'crime',
    'rescue',
    'emergency',
    'help',
    'justice',
    'pledge'
]
app.get('/feed', async (req,res)=>{
   let totaldataarray=[]
   console.log(process.env.CONSUMER_KEY)
    var client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
       
      });
    
      list.forEach( async element => {
          data1= await client.get('tweets/search/recent', { query: `#${element}` });
          console.log(typeof(data1))
          totaldataarray.push(data1)
          console.log(totaldataarray[0]['data'])
      }); 

res.json(totaldataarray)
})

app.get('/sendalert',(req,res)=>{
res.send("hehe")
})
const list2=['missing','pledge']
app.get('/missingfeed',(req,res)=>{
    let totaldataarray=[]
    var client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
       
       
      });
    
      list2.forEach( async element => {
          data1= await client.get('tweets/search/recent', { query: `#${element}` });
          console.log(typeof(data1))
          totaldataarray.push(data1)
          console.log(totaldataarray[0]['data'])
      }); 

res.send("data")
})
const storageEngine=multer.diskStorage({
 destination:(req,file,callback)=>{ 
        callback(error=null,destination='./uploads/')},
    filename:(req,file,callback)=>{
        callback(error=null,filename=Date.now()+file.originalname)}
})
const upload=multer({storage:storageEngine})

app.post('/',upload.single('image'),(req,res)=>{
    console.log(req.file.buffer,req.file,req.files)
    res.send("hello")
})

app.listen(8000 | process.env.PORT,()=>{
    console.log("launched at 8000")
})