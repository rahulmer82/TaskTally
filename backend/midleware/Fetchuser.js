var jwt=require('jsonwebtoken');
const JWT_SECRET='RAHUL$MER'

const fetchuser=(req,res,next)=>{
    //get the user and get token to find object id of user

    const token=req.header('usertoken')
    if(!token){
        return res.status(401).send("Please Authanticate Valid Token");
    };
try {
    const data=jwt.verify(token,JWT_SECRET)
    req.user=data.user;
    next()
    
} catch (error) {
    res.status(4001).send("Found A middlwer problem")
}

}
module.exports=fetchuser