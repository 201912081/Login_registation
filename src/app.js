const express=require('express')
const app=express();
const port=process.env.PORT||3000;

require("./db/conn")
const registermodel=require("./model/register")

const path=require('path')
const hbs=require('hbs');
const register = require('./model/register');

// app.use(express.static()))

const templatePath=path.join(__dirname,"../template/views")
const partialPath=path.join(__dirname,"../template/partials")

app.set("view engine","hbs");
app.set("views",templatePath)
hbs.registerPartials(partialPath)

app.use(express.json())

// to get the data from form in register.hbs
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/register",(req,res)=>{
    res.render("register")
})

app.get("/login",(req,res)=>{
    // console.log(req.body)
    res.render("login")
})

app.post("/login",async(req,res)=>{
   try{
    
        const email=req.body.email;
        const password=req.body.password;
        const data=await registermodel.findOne({email:email, password:password})
        if(data)
        {
            res.status(200).render("index")
        }
        else{
            res.status(404).send("email or password is wrong!!")
        }
    
   }
   catch(err){
    res.status(400).send(err)
   }
})

// create user
app.post("/register",async(req,res)=>{
    try{
        console.log(req.body)
        const pass=req.body.password;
        const cpass=req.body.confirmpassword;
        if(!pass==cpass)
            res.render("password and confirm password does not match")
        else{
            const registerData=new registermodel({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                phone:req.body.phone,
                age:req.body.age,
                password:req.body.password,
                gender:req.body.gender

            })
            const data=await registerData.save()
            if(data){
                res.status(200).render("index");
            }
            else{
                res.status(404).render("something went wrong");
            }
        }
    }
    catch(err){
        console.log(err)
    }
})

app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})