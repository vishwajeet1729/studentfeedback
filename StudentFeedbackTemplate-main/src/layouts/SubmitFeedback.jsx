import "./styles/submitFeedback.css"
import { useAuthContext } from '../hooks/useAuthContext'
import {useState,useEffect} from 'react'
import { Navigate } from "react-router-dom";
import { WindowSharp } from "@mui/icons-material";

const optionList = ["Agree", "Strongly Agree", "Disagree", "Strongly Disagree"]

const answers = []

const SubmitFeedback = ({ feedbacks, val, setViewSubmit, setToggleView }) => {

     const [text, setText]=useState("");
     const [navigate,setNavigate]=useState(false)

    const { user, dispatchs } = useAuthContext();

useEffect(()=>{
    for (let que of feedbacks[val - 1].question) {
        const obj = {
            question: que._id,
            selectedOption: "Agree"
        }
        answers.push(obj)
    }

   //  console.log(answers)

},[])
    

    const handleOptionChange = (e) => {

        // console.dir(e.target.id);
        answers[e.target.id].selectedOption = e.target.value;
      //  console.log(answers)
    }

    const handleSubmitFeedback = () => {

       //  console.log(text)
        const data = {
            studentId: user.student._id,
            feedbackId: feedbacks[val - 1]._id,
            answers: answers,
            text:text
        }

        // console.log(data)


         var baseUrl='https://studentfeedback-backend-mu.vercel.app'

        const sendSubmitFeedback = async () => {

               var url='http://localhost:3005/feedback/submitFeedback'

             const res = await fetch(`${baseUrl}/feedback/submitFeedback`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const getData = await res.json() 
           //  console.log(getData)
          
             
           window.location.href="/viewFeedbacks"
            

        }

       sendSubmitFeedback();

        //setViewSubmit(false)
        //setToggleView(false)
       
      //  window.location.href="/viewFeedbacks"
      //setNavigate(true);

    }

    const handleGOBack = () => {
        setViewSubmit(false);
    }

    //console.log(answers)

    const handleTextArea=(e)=>{
          
       // console.log(e.target.value)
           setText(e.target.value);

    }

    return (
        <div className="viewFeedbacks">
            <h1>Submit Feedback</h1>
            <div className="feedback" style={{ width: "700px", maxHeight: "1800px", marginLeft: "420px" }}>
                <h2>Subject Name: {feedbacks[val - 1].subject}</h2>
                <h2>Teacher Name:{feedbacks[val - 1].teacher.name}</h2>
                <div><ul>
                    {feedbacks[val - 1].question.map((ele, ind) => {
                        return (<div className="quesInp" key={ind}>
                            <input type="text" value={ele.question}></input>
                            <div>
                                <select name="options" className="selectOpt" id={ind} onChange={handleOptionChange}>
                                    <option value={optionList[0]} >{optionList[0]}</option>
                                    <option value={optionList[1]} >{optionList[1]}</option>
                                    <option value={optionList[2]} >{optionList[2]}</option>
                                    <option value={optionList[3]} >{optionList[3]}</option>
                                </select>
                            </div>
                        </div>)
                    })}
                   <div style={{marginTop:'5px'}}> 
                    <label for='sugg'>Feedback about teaching :</label>
                   <textarea id='sugg' onChange={handleTextArea}></textarea>
                   </div>
                </ul>
                </div>
                <button onClick={handleSubmitFeedback}>Submit </button>
                <button onClick={handleGOBack}>go back </button>

            </div>
            {navigate&&<Navigate to="/viewFeedbacks"></Navigate>}
        </div>
    )
}


export default SubmitFeedback