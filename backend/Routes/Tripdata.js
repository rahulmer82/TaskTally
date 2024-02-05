const userdata=require('../Moduels/TripSchema');
const express=require('express');
const router=express.Router();
const fetchuser=require('../midleware/Fetchuser');
const {body, validationResult}=require('express-validator')

// router:1 given this router found user data
router.get('/mytrip',fetchuser,async(req,res)=>{

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

router.post('/addinfo',fetchuser,[
body('member','can not be Blank..!').isLength({min:1}),
body('monney','can not be Blank..!').isLength({min:1}),
body('message','can not be Blank..!').isLength({min:3}),
], async (req,res)=>{
    //validation
    const errors= await validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    };
try {
    // add data

    const {member,monney,message}=req.body;

    const note= new userdata({member,monney,message,user:req.user.id});
    const newdata= await note.save()

    res.json(newdata)
    
} catch (error) {
    console.error(error.message);
    res.status(500).send(error,"Internal error found")
}
});

// Router:3 Update your data find out the user and update it...!

router.put('/mtupdate/:id',fetchuser, async (req,res)=>{
  // Logic For Update Workdata;
  try {
    
      const {price,work,message,date}=req.body;
    
      const newNote={};
      if(price){newNote.price=price};
      if(work){newNote.work=work};
      if(message){newNote.message=message};
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

router.delete('/mtdelete/:id',fetchuser, async (req,res)=>{
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
router.delete('/mtuserdelete/:userId',fetchuser, async (req,res)=>{
    const userId = req.params.userId;

    try {
      // Delete all messages for the specified user ID
      const result = await userdata.deleteMany({ user: userId });
  
      if (result.deletedCount > 0) {
        res.json({ success: true, message: `Deleted ${result.deletedCount} messages for user ${userId}` });
      } else {
        res.status(404).json({ success: false, message: 'No messages found for the specified user ID' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  })

module.exports=router