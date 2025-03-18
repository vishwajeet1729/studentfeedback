import {useState, useEffect} from 'react'

import {useAuthContext} from '../hooks/useAuthContext'
import "./styles/myFeedbacks.css"
import ShowChart from './ShowChart'


const MyFeedbacks=({teacherId,flag})=>{
    const [feedbacks,setFeedbacks]=useState([]);
    const [toggleView,setToggleView]=useState(false);
    const [viewChart,setViewChart]=useState(false);
    const [val,setVal]=useState(-1)

    const dataForChart=[];

    const dataForTable=[];

     const {user,dispatchs}=useAuthContext();
  
     var len=0;
     console.log('teacher id is',teacherId)
     if(teacherId&&teacherId.length>0)
     {
       
        len=teacherId.length
     }

     var baseUrl='https://studentfeedback-backend-mu.vercel.app'
    /*   const fetchUrl=len>0?`http://localhost:3005/feedback/myFeedbacks/${teacherId}`:`http://localhost:3005/feedback/myFeedbacks/${user.teacher._id}` */
     
    var url1=`https://studentfeedback-backend-mu.vercel.app/feedback/myFeedbacks/${teacherId}`
    var url2=`https://studentfeedback-backend-mu.vercel.app/feedback/myFeedbacks/${user.teacher._id}`

    const fetchUrl=len>0?url1:url2
    
   // console.log('fetcg ',fetchUrl)
    
      useEffect(()=>{

       // const fet=`http://localhost:3005/feedback/myFeedbacks/${user.teacher._id}`
       // console.log(fet)
        const fet=fetchUrl

        const getFeedbacks=async()=>{
            const res=await fetch(fet)
            const data=await res.json()
          
            setFeedbacks(data.allFeedbacks);
           //console.log(data.allFeedbacks)
          
          // console.log(data.allFeedbacks)
        }
        getFeedbacks();
       
      //  console.log(feedbacks)
        
     },[]) 

     
     const handleView=(e)=>{
        //logic to view individual feedback
      
      // console.log(e.target.value)
        setVal(e.target.value);
        setToggleView(true)
       
        
     }

     const handleShowChart=()=>{
   
          //  console.log(!viewChart)
        setViewChart(!viewChart);

     }

     const handleGOBack=()=>{
        
        setToggleView(false)
        setVal(-1);
     }

     // setting margine for view feedback
     var mar=400;
     var mar2=420;
     if(toggleView)
     {
        mar=100
     }
     
     let canSubmit=false;
   
   if(flag)
   {
    mar=0
    mar2=0
   }
    
   
  
     
    
       const calculateDataForTable=()=>{
          // console.log("ho")
            for(let i=0;i<feedbacks.length;i++)
            {
                    const data=[];
                     var len=feedbacks[i].question.length;

                     for(let i=0;i<len;i++)
                     {
                        data.push({
                            stronglyAgree:0,
                            agree:0,
                            stronglyDisagree:0,
                            disagree:0
                          })

                     }
                    // console.log(data)
                    // console.log(feedbacks[i].question.length)
                  
                    for(let sub=0;sub<feedbacks[i].submission.length;sub++)
                    {
                        
                       
                        console.log(feedbacks[i])
                           for(let ans=0;ans<feedbacks[i].submission[sub].answers.length;ans++)
                        {
                            

                            var selectedOption=feedbacks[i].submission[sub].answers[ans].selectedOption;
                           // console.log(selectedOption)
                            if(selectedOption=='Agree')
                            {
                                data[ans].agree++;
                               //const val=ans;
                               // console.log('printing',val,data[val])
                            }
                            else if(selectedOption=='Disagree')
                            {
                                data[ans].disagree++;
                            }
                            else if(selectedOption=='Strongly Agree')
                            {
                               data[ans].stronglyAgree++;
                            }
                            else if(selectedOption=='Strongly Disagree')
                            {
                                data[ans].stronglyDisagree++;
                            }

                        }  
                       
                    }
                     
                    // console.log(data);
                    dataForTable.push(data);
                              
            }
           // console.log(dataForTable)

          
       }

      
    
   

     const calculateDataForChart=()=>{

      // console.log(feedbacks)
        for(let feedback of feedbacks)
        {
            //console.log(feedback.submission)
            var agree=0;
            var disagree=0;
            var stronglyAgree=0;
            var stronglyDisagree=0;

            for(let sub of feedback.submission)
            {
               for(let ans of sub.answers)
               {
                 
                if(ans.selectedOption=='Disagree')
                {
                    disagree++;
                }
                else if(ans.selectedOption=='Agree')
                {
                    agree++;
                }
                else if(ans.selectedOption=='Strongly Disagree')
                {
                    stronglyDisagree++;
                }
                else if(ans.selectedOption=='Strongly Agree')
                {
                    stronglyAgree++
                }

               }
            }

            const data={
                agree,
                disagree,
                stronglyAgree,
                stronglyDisagree
            }

            dataForChart.push(data)
           
        }
       
     }

    
       calculateDataForTable();
       calculateDataForChart();

    
            
     
       
    

    // console.log(dataForChart)
   
    
    

    return (
        
      <div>
        {!viewChart&&<div className='myFeedbacks' style={{marginLeft:mar}}>
            {!toggleView&&<h1>My Feedback Forms</h1>} 
             <div className='feeds'>
             
              {!toggleView&&feedbacks.length>0&&feedbacks.map((feedback,i)=>{
                return(
                   
                    <div key={i} className="feedback">
                        <li className='SRNO'>{i+1}</li>
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
               {toggleView&&<div className='fedd'> <div className="feedback" style={{width:"600px",height:"600px",marginLeft:mar2}}>
              
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
                 <button  onClick={handleShowChart}>show chart</button>
                
                </div>
                
                </div>}  
             </div>
       
        </div> }
        {viewChart&&<ShowChart handleShowChart={handleShowChart} margs1={mar} ind={val-1} feedbacks={feedbacks} dataForTable={dataForTable[val-1]} dataForChart={dataForChart[val-1]}></ShowChart>}
        
      

      </div>
      

        
       
    );
     
}

export default MyFeedbacks  