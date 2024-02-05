const userdata=require('../Moduels/Userdata');
const express=require('express');
const router=express.Router();
const fetchuser=require('../midleware/Fetchuser');
const {body, validationResult}=require('express-validator')

// router:1 given this router found user data
router.get('/mydata',fetchuser,async(req,res)=>{

try {
    const data= await userdata.find({user:req.user.id});
    if(!data){
        return res.status(400).send('User Not Found')
    }
    res.json(data)
    
} catch (error) {
    console.error(error.message)
}

});

// router:2  add worker data in this app

router.post('/addwork',fetchuser,[
body('price','can not be Blank..!').isLength({min:1}),
body('price','can not be Blank..!').isLength({min:1}),
], async (req,res)=>{
    //validation
    const errors= await validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors})
    };
try {
    // add data

    const {price,work}=req.body;

    const note= new userdata({price,work,user:req.user.id});
    const newdata= await note.save()

    res.json(newdata)
    
} catch (error) {
    console.error(error.message);
    res.status(500).send(error,"Internal error found")
}
});

// Router:3 Update your data find out the user and update it...!

router.put('/update/:id',fetchuser, async (req,res)=>{
  // Logic For Update Workdata;
  try {
    
      const {price,work,date}=req.body;
    
      const newNote={};
      if(price){newNote.price=price};
      if(work){newNote.work=work};
      if(date){newNote.date=date};
      
      let note=await userdata.findById(req.params.id)
      if(!note){
          return res.status(400).send("Not Found Data")
        }
        if(note.user.toString() !==req.user.id){
          return res.status(401).send("This is not Valid Action")
        };
    note=await userdata.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    
    res.json({note})
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error,"Internal error found")
  }

});

// route:4 You Can Dellte Working Note;

router.delete('/delete/:id',fetchuser, async (req,res)=>{
try {
    let note=await userdata.findById(req.params.id);
    if(!note){
        return res.status(400).send("Work data Not Found")
    };

    if(note.user.toString() !==req.user.id){
        return res.status(400).send("Not Valid Action found")
    };

note= await userdata.findByIdAndDelete(req.params.id)
res.json({"success" : "Your Note Is Successfully Deleted", data:note})
} catch (error) {
    console.error(error.message);
    res.status(500).send(error,"Internal error found")
}
})
module.exports=router