import {useState,useEffect} from 'react'
import "./styles/branchWiseFeedbacks.css"
import ViewAllFeedbacks from './ViewAllFeedbacks';

const BranchWiseFeedbacks=()=> {
   
    
     const [allBranches,setAllBranches]=useState([]);
     const [curr,setCurrBranch]=useState('');
     const [viewFeedbackToggle,setViewFeedbackToggle]=useState(false);

     var baseUrl='https://student-feedback-portal-pyoeyxxmi-shankar9834.vercel.app'

    useEffect(()=>{
         
      const getBranches=async()=>{
           const branches=await fetch('http://studentfeedback-five.vercel.app/getAllClasses'); 
          // const branches=await fetch(`${baseUrl}/getAllClasses`); 
          const data=await branches.json();
          
         // console.log(data.classes)
          setAllBranches(data.classes)
         
      }
       
      getBranches();

  },[])

    
    const handleViewForm = (e) => {
      
      setCurrBranch(e.target.value);
      setViewFeedbackToggle(true);
     
    };

   
      return (
        <>
        {!viewFeedbackToggle&&<div className="container12">
        <h1 className="heading12">Feedback Forms</h1>
        <div className="cardContainer12">
          {allBranches.map(branch => (
            <div key={branch._id} className="card12">
              <h2 className="cardHeading12">{branch.branch}</h2>
              <p className="cardText12">feedback forms for {branch.branch}.</p>
              <button className="viewButton12" value={branch._id} onClick={handleViewForm}>View Feedback Forms</button>
            </div>
          ))}
        </div>
      </div>}

      {viewFeedbackToggle&&<ViewAllFeedbacks curr={curr}/>}

      </>
      );
    
    

    
  
            }
    
     


export default BranchWiseFeedbacks