
const mongoose=require('mongoose');
const Teacher=require('./Teacher');
const Question=require('./Question');
const Student=require('./Student');
const Submission=require('./Submission');
const Classes=require('./Classes')

const FeedbackSchema = new mongoose.Schema({
   
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    
    subject:{
      type:String,
      required:true
    },
    
    question:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }]
    ,
    
   submission:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission'
      
   }],

   submittedBy:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    }
   ],

   isActive:{
    type:Boolean,
    default:true
   },

   branch_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Classes'
   },
   summary:{
    type:String,
    default:"",
    required:false
   }


  }
  
  ,{timestamps:true});
  
  const Feedback = mongoose.model('Feedback', FeedbackSchema);
  module.exports = Feedback;

  
  
  
  
  