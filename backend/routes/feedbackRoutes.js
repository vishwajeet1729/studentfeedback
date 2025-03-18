const express=require('express');


const Feedback=require('../models/Feedback');
const Question=require('../models/Question');
const Student=require('../models/Student');
const Submission=require('../models/Submission');
const Notification=require('../models/Notification')
const Teacher =require('../models/Teacher');


const router=express.Router();



router.get('/allFeedbacks',async(req,res)=>{
   
    try{
        //const allFeedbacks=await Feedback.find({});
        const allFeedbacks=await Feedback.find({isActive:true})
                                 .populate({path:'teacher'})
                                 .populate({path:'submittedBy'})
                                 .populate({path:'submission'})
                                 .populate({path:'question'})
                                 .populate({path:'branch_id'});

       

        if(!allFeedbacks) throw Error("no feedbacks found");
        
        res.status(200).json({allFeedbacks});
        console.log('made request')
    }
    catch(err)
    {
        res.status(500).json({ message: err.message });
    }
    
    
})


router.get('/allFeedbacks/:branch_id',async(req,res)=>{
   
  try{
    const {branch_id}=req.params;
   // console.log(branch_id);
      //const allFeedbacks=await Feedback.find({});
      if(branch_id=='All')
      {
        const allFeedbacks=await Feedback.find({isActive:true})
                               .populate({path:'teacher'})
                               .populate({path:'submittedBy'})
                               .populate({path:'submission'})
                               .populate({path:'question'})
                               .populate({path:'branch_id'});
                              
                               // console.log(allFeedbacks);

                               if(!allFeedbacks) throw Error("no feedbacks found");
                               
                               res.status(200).json({allFeedbacks});

      }else{
        const allFeedbacks=await Feedback.find({isActive:true,branch_id})
        .populate({path:'teacher'})
        .populate({path:'submittedBy'})
        .populate({path:'submission'})
        .populate({path:'question'})
        .populate({path:'branch_id'});
       // console.log(allFeedbacks);

        if(!allFeedbacks) throw Error("no feedbacks found");
        
        res.status(200).json({allFeedbacks});
      }
      

    
  }
  catch(err)
  {
      res.status(500).json({ message: err.message });
  }
  
  
})



// creating feedback

router.post('/', async (req, res) => {
    try {

     
     //console.log(req.body)
      const { teacher, subject,branch_id } = req.body;
      const {questions}=req.body;

      const submission=[];
      const question_ids=[]
   
       for( var q of questions)
      {
     
           const {question,options}=q;
       
           const ques=new Question({question,options});
             await ques.save()
             question_ids.push(ques._id);
           
      } 

     
        
     // console.log(teacher)
      const foundTeacher=await Teacher.findById(teacher)
     // console.log(foundTeacher)
      
     const message=`${foundTeacher.name} created feedback for ${subject}`
        
       const notification=new Notification({message});
       
     // console.log(notification)
       await notification.save()
     //  console.log(notification)
       const newFeedback = new Feedback({
        teacher,
        subject,
        question:question_ids,
        submission,
        branch_id
      });
     
       
      await newFeedback.save(); 
      // console.log(newFeedback);

     // console.log(newFeedback);
      
      res.json({ message: 'Feedback submitted successfully' ,feedback:newFeedback});
   

    } catch (err) {
      //console.log("err")
      res.status(500).json({ message: err.message });
    }
  });




  router.post('/submitFeedback',async(req,res)=>{
       
    try{
   
     const {feedbackId,studentId}=req.body
      const feedback=await Feedback.findById(feedbackId);
      const student=await Student.findById(studentId);
      
      const {text}=req.body;

      if(!student)
      {
           throw Error('student not found');
      }

      if(!feedback) {
        
        throw Error('feedback not found');
      }

   
      // write logic for , if student has already submitted the feedback 
      //i.e studentId exists in submitted by attribute of feedback

      
      const {answers}=req.body;
     
     // console.log(answers);
    
       if(feedback.submittedBy.includes(studentId))
       {
        
        throw Error('you have already submitted feedback!!');

       }

         // await Submission.deleteMany({});  
      
         if(text.length>0)
         {
          const newSubmission=new Submission({feedback_id:feedbackId,student_id:studentId,answers,text});
          await newSubmission.save();  
          feedback.submission.push(newSubmission._id); 
          // console.log(newSubmission);
           feedback.submittedBy.push(studentId);
          // console.log(newSubmission)
           await feedback.save(); 
   
        res.status(200).json({message:'succesfully submitted feedback',feedback});

         }
         else{
          const newSubmission=new Submission({feedback_id:feedbackId,student_id:studentId,answers});
          await newSubmission.save();  
          feedback.submission.push(newSubmission._id); 
   
           feedback.submittedBy.push(studentId);
           await feedback.save(); 
   
        res.status(200).json({message:'succesfully submitted feedback',feedback});

         }
        

    }
    catch(err){
      
      res.status(400).json({message:err.message})
    }
  // console.log(req.body)
       
  })  


 
  
 router.get('/myFeedbacks/:teacherId',async(req,res)=>{

  try{
    
    const {teacherId}=req.params;
    const allFeedbacks=await Feedback.find({teacher:teacherId})
                             .populate({path:'teacher'})
                             .populate({path:'submittedBy'})
                             .populate({path:'submission'})
                             .populate({path:'question'});
   //console.log(allFeedbacks)

    if(!allFeedbacks) throw Error("no feedbacks found");
    
    res.status(200).json({allFeedbacks});
}
catch(err)
{
    res.status(500).json({ message: err.message });
}

 }) 


router.get('/active/:feedback_id',async(req,res)=>{
    
  try{
    const {feedback_id}=req.params;
  
    const feedback=await Feedback.findById(feedback_id).populate({path:'submission'});
    feedback.isActive=!feedback.isActive;
    await feedback.save()
    //console.log(feedback)
   
    //console.log(!feedback.isActive)
    
    var datas="";

    if(!feedback.isActive)
    {   
         for(let sub of feedback.submission)
         {
           datas+=sub.text
           datas+=" ";
            //console.log(sub.text);
         }
        

        const sendReq=async(datas)=>
       {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/knkarthick/MEETING_SUMMARY",
            {
                headers: { Authorization: `Bearer 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` },
                method: "POST",
                body: JSON.stringify(datas),
            }
        );
        const result = await response.json();
          
         //console.log(result[0])
         
         var summ=result[0].summary_text
       
         feedback.summary=summ;
        // console.log(feedback)
         await feedback.save();

      }
         sendReq(datas)
    
    }

    

    res.status(200).json({feedback});
  }
  catch(err){
    res.status(500).json({ message: err.message });
    }
    
    

})

module.exports=router;