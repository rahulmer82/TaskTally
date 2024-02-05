const express=require('express');
const User=require('../Moduels/Authentication');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { validationResult} = require('express-validator');
const {body}=require('express-validator')
const JWT_SECRET='RAHUL$MER'

//Route 1:Create user using a post Requiest;

router.post('/createuser',[
body("email","Please Enter a Valid Email Id..!").isEmail(),
body('password',"Atlist 5 Cherater Enter").isLength({min:5}),
body('name',"Atlist 3 Cheracter Enter").isLength({min:3})
], async(req,res)=>{
   let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };  
    try {
        
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"Sorry a user with this email already exists"})
            success=false
        }
        const salt= await bcrypt.genSalt(10);
        const setpass=await bcrypt.hash(req.body.password,salt);
    
        user=await User.create({
            name: req.body.name,
            email: req.body.email,
            password: setpass
        })
        const data={
            user:{
                id:user.id
            }
        };
        const authtoken=jwt.sign(data,JWT_SECRET);
        success=true
        res.json({success,authtoken})
    } catch (error) {
        console.error(error.message);
        success=false
        res.status(500).send(success,"Internal Error Found")
    }
});

//Router:2 Login data to use

router.post('/login',[
    body('email','Please Enter a Valid Email Id..!').isEmail(),
    body('password','Please Enter a Atlist 5 Cheracters...!').isLength({min:5})
],async (req,res)=>{
    success=false
const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({error:errors.array()})
};
try {
    //find Email in databas;
    const {email,password}=req.body;
    let user= await User.findOne({email});
    if(!user){
        return req.status(400).json({error:"Email Id is Wrong...!,Please Enter a Right Email Id..."});
    
    };
    const passwordcompare= await bcrypt.compare(password,user.password);
    if(!passwordcompare){
        return res.status(400).json({error:"Password is Wrong..!,Plase Enter a Right Password..."})
    };
    const data={
        user:{
            id:user.id
        }
    };
    
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true
    res.json({success,authtoken})
    
} catch (error) {
    console.error(error.message);
    success=false
    res.status(500).send(success,'Internal Error Found')
}
})
module.exports=router