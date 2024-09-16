

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";

import Billing from "layouts/billing";

import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
 //import SignIn from "layouts/authentication/sign-in";
 //import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

//by me

import ViewAllFeedbacks from "layouts/ViewAllFeedbacks";

import Logout from "layouts/Logout";

import BranchWiseFeedbacks from "layouts/BranchWiseFeedbacks";


const studentRoutes = [
  {
    type: "collapse",
    name: "Branch Wise Feedbacks",
    key: "branch",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/branchWise",
    component: <BranchWiseFeedbacks/>,
  }, 
  {
    type: "collapse",
    name: "View Feedbacks",
    key: "viewFeedbacks",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/viewFeedbacks",
    component: <ViewAllFeedbacks curr='All'/>,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
{
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/logout",
    component: <Logout>LOG OUT</Logout>,
  },
];

export default studentRoutes;
