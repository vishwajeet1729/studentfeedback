
import {useState, useEffect} from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import "./styles/viewAllFeedbacks.css"

import SubmitFeedback from './SubmitFeedback'

const ViewAllFeedbacks=({curr})=>{
    const [feedbacks,setFeedbacks]=useState([]);
    const [toggleView,setToggleView]=useState(false);
    const [viewSubmit,setViewSubmit]=useState(false);
    const [val,setVal]=useState(-1)
    const {user,dispatchs}=useAuthContext();
    
    var url=`http://studentfeedback-5d4s1ghme-vishwajeet1729s-projects.vercel.app/feedback/allFeedbacks/${curr}`
    var baseUrl='https://student-feedback-portal-pyoeyxxmi-shankar9834.vercel.app'
      useEffect(()=>{
        
        // const getFeedbacks=async()=>{
        //     const res=await fetch(`${baseUrl}/feedback/allFeedbacks/${curr}`)
        //     const data=await res.json()
          
        //     setFeedbacks(data.allFeedbacks);
          
        //   //console.log(data.allFeedbacks)
        // }

        const getFeedbacks=async()=>{
          const res=await fetch(url)
          const data=await res.json()
        
          setFeedbacks(data.allFeedbacks);
        
        //console.log(data.allFeedbacks)
      }
        getFeedbacks();
       
      

     },[]) 
    // console.log(feedbacks)

    
     

     


     
     const handleView=(e)=>{
        //logic to view individual feedback
       // console.log(e.target.value)
        setVal(e.target.value);
        setToggleView(true)
       
        
     }

     const handleGOBack=()=>{
        
        setToggleView(false)
        setVal(-1);
     }

     const handleSubmitFeedback=()=>{
            
        setViewSubmit(true);

     }

     // setting margine for view feedback
     var mar=400;
     if(toggleView)
     {
        mar=100
     }
     
     let canSubmit=false;

   
    if(user)
   {
   
     if(user.student&&val>0)
    {
      // console.log(feedbacks[val-1].submittedBy);
       // console.log(user.student);

        for(const stud of feedbacks[val-1].submittedBy)
        {
              if(stud._id===user.student._id)
              {
                    canSubmit=true;
              }
        }

       //console.log(canSubmit)
      
    } 
       
   }
    
    

    return (
        
      <div className="backgrd">
        {!viewSubmit&&<div className='viewFeedbacks' style={{marginLeft:mar}}>
            {!toggleView&&<h1>All Feedback Forms</h1>} 
             <div className='feeds'>
             
              {!toggleView&&feedbacks.length>0&&feedbacks.map((feedback,i)=>{
                return(
                   
                    <div key={i} className="feedback">
                        <li className='SRNO'>{feedback.branch_id.branch}</li>
                        <li className='subject'>
                        {feedback.subject}
                        </li>
                        <li className='teacher'>
                            {feedback.teacher.name}
                        </li>
                        <li className='teacher'>
                            {new Date(feedback.createdAt).toLocaleString('en-GB',{timeZone:'IST'})}
                        </li>
                        {user&&<button value={i+1} onClick={handleView}>view</button>}
                        
                    </div>
                     
                )
               })}
               
               {!toggleView&&feedbacks.length==0&&
               <div>
                <div className='feedback'>No feedback available</div>
                
                </div>}

               {toggleView&&<div className='fedd'> <div className="feedback" style={{width:"600px",height:"600px",marginLeft:"420px"}}>
              
                <h2>Subject Name: {feedbacks[val-1].subject}</h2>   
                <h2>Teacher Name:{feedbacks[val-1].teacher.name}</h2>   
                <div><ul>
                    {feedbacks[val-1].question.map((ele,ind)=>{
                        return <div className="quesInp" key={ind}>
                            <input type="text" value={ele.question}></input>
                           
                        </div>
                    })}
                    </ul>
                </div>
                <button  onClick={handleGOBack}>go back</button>
                {user&&user.student&&!canSubmit&&<button  onClick={handleSubmitFeedback}>submit feedback</button>}
                </div>
                
                </div>}  
             </div>
       
        </div> }
        {viewSubmit&&<SubmitFeedback feedbacks={feedbacks} val={val} setViewSubmit={setViewSubmit} setToggleView={setToggleView}></SubmitFeedback>}

      </div>
      

        
       
    );
     
}

export default ViewAllFeedbacks  