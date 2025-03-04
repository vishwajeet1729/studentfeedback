import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Table from './Table';
import { display } from '@mui/system';
import { position } from 'stylis';
import { Navigate } from "react-router-dom";
import {useState} from 'react'
import { WindowSharp } from '@mui/icons-material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';

ChartJS.register(ArcElement, Tooltip, Legend);


  

const ShowChart=({handleShowChart,ind,feedbacks,dataForChart,dataForTable,margs1})=>{

  const [isActiveForm,setIsActiveForm]=useState(feedbacks[ind].isActive)
  const [navigate,setNavigate]=useState(false)


  //setting margins when requested from admin dashboard 
  var marg=300
  var mG=350
  if(margs1==0)
  {
      marg=0
      mG=0
  }


    const btnStyles={
        fontSize: '16px',
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#333',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    marginTop: '40px',
    marginLeft:mG,
    position:'relative',
    top:'-300px',
    left:'400px'
    }
  
    const closeBtnStyles={
      fontSize: '16px',
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#333',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    marginTop: '40px',
    marginLeft:'350px',
    position:'relative',
    top:'-300px',
    left:'100px'

    }


    const summaryStyle={
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'start',
      paddingTop:'10px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease-in-out',
      marginTop: '10px',
      marginBottom: '40px',
      margineRight:'50px',
      cursor: 'pointer' ,
      maxHeight:'200px'
       }

    const handleCloseForm=()=>{

      // console.log(feedbacks[ind]._id)
      var baseUrl='https://student-feedback-portal-pyoeyxxmi-shankar9834.vercel.app';
      var url=`http://localhost:3005/feedback/active/${feedbacks[ind]._id}`
      
      const sendReq=async()=>{
           const res=await fetch(`${baseUrl}/feedback/active/${feedbacks[ind]._id}`)
           
           if(res.ok)
           {
             feedbacks[ind].isActive=!feedbacks[ind].isActive;
             setIsActiveForm(feedbacks[ind].isActive);

            // window.location.href='/myFeedbacks'
              
             setNavigate(true);
            // console.log(feedbacks[ind].isActive)
           }
           

       }

       sendReq();

    } 
    

    //console.log(dataForChart);
     var agree=dataForChart.agree
     var disagree=dataForChart.disagree
     var stronglyAgree=dataForChart.stronglyAgree
     var stronglyDisagree=dataForChart.stronglyDisagree
    
 

    const data = {

        labels: ['Agree','Strongly Agree','Disagree',  'Strogly Disagree'],
        datasets: [
          {
            label: 'No of students',
            data: [agree,stronglyAgree, disagree,  stronglyDisagree],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              
              
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 99, 132, 1)'
              
            ],
            borderWidth: 1,
          },
        ],
      };
   
     
    const handleBtn=()=>{

       // console.log('clickkinng gg', ind)
        handleShowChart();
    }
   // console.log('showing chart for', ind)
    return (
      <div style={{marginLeft:marg}}>
        <div style={{width:'400px' , height:'400px',marginLeft:"260px",marginTop:'50px'}}>
    <Pie data={data} />
    
   
    </div>
    <div>
    <Typography variant="h4" sx={{ ml: 35,mt:5,mb:5 }} gutterBottom>
        This Feedback is Submitted by {feedbacks[ind].submission.length} Students
      </Typography>
    </div>
    <div style={{width:'500px',marginLeft:'230px'}}>
      <Table data={dataForTable}></Table>

    </div>
    <button onClick={handleBtn} style={btnStyles}>go back</button>

    {isActiveForm&&<button onClick={handleCloseForm} style={closeBtnStyles}>Close Form</button>}
    {!isActiveForm&&<button onClick={handleCloseForm} style={closeBtnStyles}>Open Form</button>}
   {/*  {!isActiveForm&&<p style={{marginLeft:'100px',marginBottom:'100px'}}>summary:- {feedbacks[ind].summary}</p>} */}
    {!isActiveForm&&
    <div>
        <h1 style={{marginLeft:'20px'}}>summary</h1>
    <div style={summaryStyle} >
    
    <Typography variant="h5"  sx={{ml:30,mb:10}}>
      {feedbacks[ind].summary}
    </Typography></div></div>}
    {navigate&&<Navigate to="/viewFeedbacks"></Navigate>}
    </div>
    
    )
}


export default ShowChart


