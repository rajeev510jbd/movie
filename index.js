const express = require('express')
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const cors =require('cors');
//database connection

mongoose.connect("mongodb://localhost:27017/try")
.then(()=>{
    console.log("DB connection successfull")
})
.catch((err)=>{
    console.log(err)
})

//create schema for user
const userSchema=mongoose.Schema({
name:
{
    type:String,
    required:true
},
email:
{
    type:String,
    required:true
},
password:
{
    type:String,
    required:true
}

},{timestamps:true})


//modal for user

const userModel=mongoose.model("hello",userSchema)


//endpoint

const app=express();
app.use(express.json())
app.use(cors())
app.post('/register',(req,res)=>{
let user=req.body;
bcrypt.genSalt(10,(err,salt)=>{
    if(!err)
    {
        bcrypt.hash(user.password,salt,(err,hpass)=>{
            if(!err)
            {
               user.password=hpass
               userModel.create(user)
.then((doc)=>{
res.send({message:"user register successfully"})
})
.catch((err)=>{
console.log(err)
res.send({message:"some problem"})
             })
            }
        })
    }
})




})

//endpoint for login
app.post("/login",(req,res)=>{
   let userCred=req.body

   userModel.findOne({email:userCred.email})
   .then((user)=>{


if(user!=null)
{
    bcrypt.compare(userCred.password,user.password,(err,result)=>{
 if(result===true)
 {
    //generate a token and send it back
    jwt.sign({email:userCred.email},"rajeevkey",(err,token)=>{
if(!err)
{
    res.send({token:token})
}
else{
    res.send({message:'some issue'})

}
    })
 }

 else
 {
    res.status(403).send({message:"incorrect password"})
 }
    })
    
}
else{
    res.status(404).send({message:"user doesn't exist"})
}
   })
   .catch((err)=>{
res.status(500).send({message:"error"})
   })
})


app.get("/getdata",verifyToken,(req,res)=>{
    res.send({messge:"i am developer"})
})

function verifyToken(req,res,next)
{
    res.send("coming from middle")
}
app.listen(8000,()=>{
console.log("success server")
})
































// const timer1=setTimeout("console.log('hii1')",1000)
// const timer2=setTimeout("console.log('hii2')",2000)
// const timer3=setTimeout(a,3000)

// //clearTimeout(timer3)

// function a()
// {
//     console.log("helloworld")
// }

// const timer= setInterval('console.log("ifjv")',1000)//bar bar loop chlta hai
// clearInterval(timer,3000)