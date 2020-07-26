/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import CreateRateCard from "views/Rate/CreateRateCard.js";
import RateCardDetails from "views/Rate/RateCardDetails.js";
import CreateUser from "views/Users/CreateUser.js";
import ViewUser from "views/Users/ViewUsers.js";
import CreateFromExisting from "views/Rate/CreateFromExisting.js";
import AdminDetails from "views/Users/AdminDetails.js";
import EditUser from "views/Users/EditUsers.js";



import Maps from "views/examples/Maps.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Subscription from "views/examples/Subscription.js";
import PublishedCompanies from "./views/PublishedCompanies.js";
import RateCards from "./views/RateCards.js";
import CreateSubscription from "views/createSubscription/CreateSubscription.js";
import CreateRateCards from "views/createSubscription/CreateSubRateCardDetails.js";
import UploadFile from "views/createSubscription/UploadMediaFile.js";
import CreatePublishedCompanies from "views/createSubscription/CreatePublishedCompanies.js";
import Calender from "views/createSubscription/calender.js";
import Cart from "views/Cart";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    header:"dashboard",
    component: Index,
    layout: "/media"
  },
  {
    path: "/create-ratecards",
    name: "Create Rate Card",
    header:"rate",
    component: CreateRateCard,
    layout: "/media"
  },
  {
    path: "/view-ratecards",
    name: "View RateCards",
    header:"rate",
    component: Subscription,
    layout: "/media"
  },
  {
    path: "/create-from-existing",
    name: "Create From Existing",
    header:"rate",
    component: CreateFromExisting,
    layout: "/media"
  },
  {
    path: "/rate-details",
    name: "Enter Rate Card Details",
    invisible:true,
    component: RateCardDetails,
    layout: "/media"
  },
  {
    
    path: "/my-subscription",
    name: "View Subscriptions",
    header:"subscriptions",
    component: Cart,
    layout: "/media"
  },
  {
    path: "/maps",
    name: "Transactions",
    header:"transactions",
    component: Maps,
    layout: "/media"
  }, 
  {
    path: "/cart",
    name: "Daily Reports",
    header:"report",
    component: Cart,
    layout: "/media"
  },
  {
    path: "/user-profile",
    name: "General Report",
    header:"report",
    component: Profile,
    layout: "/media"
  },
  {
    path: "/view-users",
    name: "View Users",
    header:"user",
    component: ViewUser,
    layout: "/media"
  },
  {
    path: "/create-user",
    name: "Create New Users",
    header:"user",
    component: CreateUser,
    layout: "/media"
  },
  {
    path: "/create-sub-rate-cards",
    name: "Users Activities",
    header:"user",
    component: CreateRateCards,
    layout: "/media"
  },{
    path: "/admin-details",
    name: "Admin Details",
    invisible:true,
    component: AdminDetails,
    layout: "/media"
  },{
    path: "/edit-admin",
    name: "Admin Details",
    invisible:true,
    component: EditUser,
    layout: "/media"
  },
  {
    path: "/user-profile",
    name:"Profile",
    header:"profile",
    component: RateCardDetails,
    layout: "/media"
  },
  {
    path: "/upload-file",
    name: "File Upload",
    invisible:true,
    component: UploadFile,
    layout: "/media"
  },
  {
    path: "/published-companies-create",
    name: "Media Houses",
    invisible:true,
    component: CreatePublishedCompanies,
    layout: "/media"
  },
  {
    path: "/calender",
    name: "Calender",
    invisible:true,
    component: Calender,
    layout: "/media"
  }
];
export default routes;
