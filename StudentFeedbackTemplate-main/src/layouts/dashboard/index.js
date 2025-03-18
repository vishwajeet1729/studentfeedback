

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
/* import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData"; */

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react'
import MDTypography from "components/MDTypography";
import {useAuthContext} from "../../hooks/useAuthContext"

function Dashboard() {
  /* const { sales, tasks } = reportsLineChartData; */

  const [branch,setBranch]=useState('CSE')

  const [students,setStudents]=useState()
  const [allTeachers,setAllTeachers]=useState()
  
  const {user}=useAuthContext()
  
  const isAdmin=user&&user.teacher&&user.teacher.email==='Admin@gmail.com'
    

  var baseUrl='https://studentfeedback-backend-mu.vercel.app'

   
  const handleBranch=(e)=>{
       setBranch(e.target.value)
  }

  const handleClick=()=>{

    //console.log(branch)
     
    const data={
      branch
    }
    
    const sendReq=async()=>{
              var url='https://studentfeedback-backend-mu.vercel.app//createClass'
    //   const res=await fetch(`${baseUrl}/createClass`,{
    //     method:'POST',
    //     body: JSON.stringify(data),
    //     headers:{
    //         'Content-Type': 'application/json'
    //       }
    // })
    const res=await fetch(url,{
      method:'POST',
      body: JSON.stringify(data),
      headers:{
          'Content-Type': 'application/json'
        }
  })

    }

    sendReq();
    
    setBranch('');
  }


  useEffect(()=>{

      
      const getData=async()=>{
         
        var url='https://studentfeedback-backend-mu.vercel.app/dataForDashboard'
        // const res=await fetch(`${baseUrl}/dataForDashboard`)
        const res=await fetch(url)
        const data=await res.json();
       
        setStudents(data.student_count) 
        setAllTeachers(data.teachers)

      }

      getData()

      
     
      
      
         
  },[])

  return (

    
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Total Students"
                count={students}
                ele="true"
                teacher="false"
                
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {/* <ComplexStatisticsCard
                icon="leaderboard"
                title="Create Branch"
                count={500}
                ele="false"
              /> */}
               {isAdmin&& <Box component="form"
                     sx={{'& > :not(style)': { m: 1, width: '25ch' }, }}
                    noValidate
                    autoComplete="off"
                    >
                  <TextField id="filled-basic" label="Create Branch" variant="filled" value="CSE" onChange={handleBranch} />
                  <Stack spacing={2} direction="row">
                <Button variant="contained" color="success"  onClick={handleClick}> Create</Button>
      
                </Stack>
                </Box>}
               
              
            </MDBox>
          </Grid>
        </Grid>
        
       { isAdmin&&<MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
             
              <MDBox mb={1.5} mt={5}>
                {/* <MDTypography variant="h6" gutterBottom sx={{mb:5}}>Teachers Leaderboard</MDTypography> */}
               <ComplexStatisticsCard
                color="dark"
                icon="leaderboard"
                title="Teachers"
                ele="false"
                teacher="true"
                allTeachers={allTeachers}
              />
               
              </MDBox>
              
            </Grid>
            
          </Grid>
          
          
        </MDBox>}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
