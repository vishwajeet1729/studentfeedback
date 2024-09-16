import { useAuthContext } from '../hooks/useAuthContext';
import "./styles/logout.css"
import man from "../images/man_sitting.jpg"
import { Navigate } from "react-router-dom";
import {useState} from 'react'

const Logout = () => {

  const { dispatchs } = useAuthContext();
  const [navigate,setNavigate]=useState(false)


  const handleLogout = () => {

    //  console.log('logging out')

    localStorage.removeItem('user')
    dispatchs({ type: 'LOGOUT' })

   

   // window.location.href = '/'
   setNavigate(true);

  }

  const handleCancel=()=>{
    setNavigate(true);
  }
  
  return (
    <>
      <div className="text-center2 card">
        <div>
          <div className='img'>
            <img src={man} className="img-man"/>
          </div>

         {/*  <div className="headingLOG">Comeback Soon !! </div> */}

          <div className='desc2'>
            Are You sure You want to Logout?
          </div>
          <button className="cancel btn" onClick={handleCancel}>Cancel</button>
          <button className="logout btn" onClick={handleLogout}>Yes, Logout</button>
        </div>
      </div>
      {navigate&&<Navigate to="/viewFeedbacks"></Navigate>}
    </>
  );
}
export default Logout