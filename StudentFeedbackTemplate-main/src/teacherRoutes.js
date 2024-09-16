import Dashboard from "layouts/dashboard";

import Billing from "layouts/billing";

import Notifications from "layouts/notifications";
import Profile from "layouts/profile";

import Icon from "@mui/material/Icon";
import CreateFeedback from "layouts/CreateFeedback";
import ViewAllFeedbacks from "layouts/ViewAllFeedbacks";

import Logout from "layouts/Logout";

import MyFeedbacks from "layouts/MyFeedbacks";
import BranchWiseFeedbacks from "layouts/BranchWiseFeedbacks";


const teacherRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Create Feedbacks",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <CreateFeedback />,
  },
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
  } , 
  {
    type: "collapse",
    name: "My Feedbacks",
    key: "MyFeedbacks",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/myFeedbacks",
    component: <MyFeedbacks />,
  } ,
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

export default teacherRoutes;
