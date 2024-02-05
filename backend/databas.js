const mongoose  = require("mongoose");
require("dotenv").config()
const mongoURL=`mongodb+srv://rahulmer04:Smp9lXbWJjrSsy7Q@hiradayri.mrpnurg.mongodb.net/TaskTally?retryWrites=true&w=majority`
const connectmongo=()=>{
    mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

}
module.exports=connectmongo