const express=require('express')
require('dotenv').config()
const app=express();
const port=process.env.PORT||5000;
const db=require('./db/config')
const route=require('./routes/route')
const body_parser=require('body-parser')

app.set("view engine","ejs")
app.use(express.static("views"))
app.use(body_parser.urlencoded({extended:false}))
app.use('/views/img',express.static('./views/img'))
app.use('/',route)

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})