import { useState, useEffect } from "react";
import "./styles/createFeedback.css"
import { Navigate } from "react-router-dom";

//mui changes 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//end mui changes

import {useAuthContext} from "../hooks/useAuthContext"

const optionList=["Agree","Strongly Agree","Disagree","Strongly Disagree"]
var id='6430786566212bc52c87640b';

var demoQ=[{
    question:"Overall outcome of the course was good ",
    options:optionList
},
{
    question:"Workload of the course is appropriate",
    options:optionList
},
{
    question:"Course is Well Organised",
    options:optionList
},
{
    question:"Faculty taught good material and ran the course as well as possible ",
    options:optionList
},
{
    question:"Course is relevant for my studies on the goal",
    options:optionList
},
{
    question:"Faculty is solving problems related to the course in an effective manner",
    options:optionList
}

]


const CreateFeedback = () => {

    const [branch, setBranch] = useState('CSE');
    const [flag,setFlag]=useState(false)
   
    const handleBranchChange = (event) => {
        setBranch(event.target.value);
       // console.log(event.target.value)
      };

    const [allBranches,setAllBranches]=useState([])
    
    var baseUrl='https://studentfeedback-backend-mu.vercel.app'
    var url='https://studentfeedback-backend-mu.vercel.app/getAllClasses'
    useEffect(()=>{
         
        const getBranches=async()=>{
            const branches=await fetch(`${baseUrl}/getAllClasses`);
            // const branches=await fetch(url)
            const data=await branches.json();
              setAllBranches(data.classes)
              
              setFlag(true)
            //console.log(data)
        }

         getBranches();

    },[])
    
    const [navigate,setNavigate]=useState(false)
    const [addingQ, setAddingQ] = useState(false);
    const [question, setQuestion] = useState("");
    const [questionList, setQuestionList] = useState(demoQ);
   // const [questionList, setQuestionList] = useState(demoQ);
    const [subject,setSubject]=useState("");  

    
    const {user,dispatchs}=useAuthContext();
    
    const handleQuestion = (e) => {
      
        setQuestion(e.target.value);
    }
   
    const addQuestion = () => {
        setQuestionList((state) => {
            const que={
                question:question,
                options:optionList
            }
             const questions=[];
             questions.push(...state);
             //questions.push(question) 
             questions.push(que) 
           return questions
        })

        setQuestion("");
        setAddingQ(false);
    }

    const handleAddingQ = () => {
        setAddingQ(true);
    }

    const handleSubject=(e)=>{
          setSubject(e.target.value)
    }

    const submitForm=()=>{

        //logic to submit form
       
        // change this formData and take teacher id from localstorage and subject from input
            /* const formData={
                teacher:"63cd366c2487a07278e6c1ef",
                subject:"Graph theory",
                questions:questionList
            }; */

            const formData={
                teacher:user.teacher._id,
                subject:subject,
                questions:questionList,
                branch_id:"CSE"
            }
          console.log(formData)
          //  console.log(cdata);

            const subForm=async()=>{
              
                var url='https://studentfeedback-backend-mu.vercel.app/feedback';

                const res=await fetch(`${baseUrl}/feedback`,{
                    method:'POST',
                    body: JSON.stringify(formData),
                    headers:{
                        'Content-Type': 'application/json'
                      }
                })

                const data=await res.json();
                console.log(data);
            }
        
           subForm();
          
            // change this below method and use the method to redirect to different page using react
           // window.location.href='/viewFeedbacks'
           setNavigate(true)  

        
    }


    return (

        <div>
        <div className="createFeedback">
            
            <h1 className="heading">Create Feedback</h1>
            <label for="subj">subject name</label>
            <input type="text" id="subj" className="int" onChange={handleSubject}/>
            
            <FormControl sx={{ ml: 0.8, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Branch</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          className="branch"
          value="CSE"
          onChange={handleBranchChange}
          autoWidth
          label="branch"
        >
         {!allBranches.length&&<p>loading</p>}   
         {allBranches.length&&allBranches.map((bran)=>{
            return <MenuItem value={bran._id}>{bran.branch}</MenuItem>
         })} 
         {/*  <MenuItem value={id}>IT20</MenuItem>
          <MenuItem value={'52'}>IT21</MenuItem> */}
          
        </Select>
      </FormControl>
           

            <div className="allQuestions">
           {questionList.map((ques,i)=>{
            return (
                <div className="Question">
                <div key={i}>
                 {ques.question}
                </div>
                <div>
                    <select name="options" id="options">
                        <option value={ques.options[0]}>{ques.options[0]}</option>
                        <option value={ques.options[1]}>{ques.options[1]}</option>
                        <option value={ques.options[2]}>{ques.options[2]}</option>
                        <option value={ques.options[3]}>{ques.options[3]}</option>
                    </select>
                </div>
                </div>
            )
           })}</div>


            <div className="sub">
                {addingQ && <div >
                    <input type="text" onChange={handleQuestion}></input>
                    <button onClick={addQuestion}>submit</button>
                </div>}
                
                {!addingQ &&<div> <button onClick={handleAddingQ}>Add question</button></div>}
                
                {questionList.length>0&&
                 <div className="lastSubmit">
                    <button onClick={submitForm}>submit created feedback</button>
                 
                  </div>}
               
               
            </div>

        </div>
        {navigate&&<Navigate to="/viewFeedbacks"></Navigate>}
        </div>
    );
}

export default CreateFeedback;