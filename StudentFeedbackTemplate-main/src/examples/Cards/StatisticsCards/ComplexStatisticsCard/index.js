/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Button from '@mui/material/Button';
import { Grid } from "@mui/material";
import { Navigate } from "react-router-dom";
import {useState} from 'react'
import MyFeedbacks from "layouts/MyFeedbacks";

function ComplexStatisticsCard({ color, title, count, percentage, icon ,ele,teacher,allTeachers}) {

  var isEle=(ele=='true')
  var isTeacher=(teacher=='true')
 // console.log('all',allTeachers)
 const [navigate,setNavigate]=useState(false)
  const [teacherId,setTeacherId]=useState('')

 const handleClick=(e)=>{

  //console.log(e.target.id)
  setTeacherId(e.target.id);
  setNavigate(true)

 }

  return (
    <>
    {!navigate&&<div>
    {!isTeacher&&<Card>
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <MDBox
          variant="gradient"
          bgColor={color}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </MDBox>
        <MDBox textAlign="right" lineHeight={1.25}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {title}
          </MDTypography>
          {isEle&&<MDTypography variant="h4">{count}</MDTypography>}
         
        </MDBox>
      </MDBox>
      <Divider />
      <MDBox pb={2} px={2}>
        <MDTypography component="p" variant="button" color="text" display="flex">
          <MDTypography
            component="span"
            variant="button"
            fontWeight="bold"
            color={percentage.color}
          >
            {percentage.amount}
          </MDTypography>
          &nbsp;{percentage.label}
        </MDTypography>
      </MDBox>
    </Card>}
    {isTeacher&&<Card>
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <MDBox
          variant="gradient"
          bgColor={color}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </MDBox>
        <MDBox textAlign="right" lineHeight={1.25}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {title}
          </MDTypography>
          {isEle&&<MDTypography variant="h4">{count}</MDTypography>}
         
        </MDBox>
      </MDBox>
      <Divider />
      
      {allTeachers&&allTeachers.map(teacher=>{
        return (
          <MDBox pb={2} px={2} >
          <MDTypography component="p" variant="button" color="text" display="flex">
          <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
             
            <MDTypography
              component="span"
              variant="button"
              fontWeight="bold"
              color={percentage.color}
              
            >
              {teacher.name}
            </MDTypography>
            </MDBox>
            
            
            
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
            <Button variant="contained" color="success" sx={{ml:20}} id={teacher._id} onClick={handleClick}> View Feedbacks</Button>
            </MDBox>
        
          </Grid>
          
          </Grid>
           
            
          </MDTypography>
        </MDBox>)
       })}
    
    </Card>}
    
    </div>}
   
   
    <Card>
   
    {navigate&&<MyFeedbacks teacherId={teacherId} flag="true"></MyFeedbacks>}
    </Card>

    </>
  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default ComplexStatisticsCard;
