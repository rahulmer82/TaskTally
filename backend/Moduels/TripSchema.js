const mongoose=require('mongoose');
const { Schema } = mongoose;

const TripSchema= new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    member:{
        type:Number,
        required:true
    },
    monney:{
        type:Number,
        require:true
    },
    message:{
        type:String,
        default: function(){
            return this.price * this.work
        }
    },
    date:{
        type:String,
        default: function(){
            const d = new Date();
            let date=d.getDate();
            let month=d.getMonth()+1;
            let year=d.getFullYear()

const dateshow= `${date}/${month}/${year}`;
const part=dateshow.split('/')
return `${part[0].padStart(2,'0')}/${part[1].padStart(2,'0')}/${part[2]}`
        }
    }
    
})
module.exports=mongoose.model('trip',TripSchema)
