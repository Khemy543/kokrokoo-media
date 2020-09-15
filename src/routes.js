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
import ViewRateCards from "views/Rate/ViewRateCard.js";
import ViewSubscription from 'views/Subscription/ViewSubscription.js';
import PrintRateDetails from "views/Rate/PrintRateCardDetails.js";
import Preview from "views/Rate/Preview.js";
import VideoPreview from "views/Rate/VideoPreview.js";
import CreateNewTitle from "views/Rate/CreateNewTitle";
import ViewRateCardDetails from "views/Rate/ViewRateCardDetails";
import ViewRateCardDetailsPrint from "views/Rate/ViewRateCardDetailsPrint.js";
import EditRateTitle from "views/Rate/EditRateTitle.js";
import SubscriptionDetails from "views/Subscription/SubscriptionDetails";
import PendingSubscriptions from "views/Subscription/PendingSubscriptions";
import ActiveSubscriptions from "views/Subscription/ActiveSubscriptions";
import ApprovedSubscriptions from "views/Subscription/ApprovedSubscriptions";
import RejectedSubscriptions from "views/Subscription/RejectedSubscriptions";
import CompanyProfile from "views/examples/CompanyProfile.js";


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
    path: "/new-title",
    name: "New Title",
    invisible:true,
    header:"rate",
    component: CreateNewTitle,
    layout: "/media"
  },
  {
    path: "/view-ratecards",
    name: "Manage RateCards",
    header:"rate",
    component: ViewRateCards,
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
    path: "/print-rate-details",
    name: "Enter Rate Card Details",
    invisible:true,
    component: PrintRateDetails,
    layout: "/media"
  },
  {
    path: "/edit-ratecards/print",
    name: "Edit Details",
    invisible:true,
    component: Preview,
    layout: "/media"
  },
  {
    path: "/edit-ratecard-title",
    name: "Manage RateCards",
    invisible:true,
    header:"rate",
    component: EditRateTitle,
    layout: "/media"
  },
  {
    path: "/edit-ratecards",
    name: "Edit Details",
    invisible:true,
    component: VideoPreview,
    layout: "/media"
  },
  {
    path: "/view-details",
    name: "Details",
    invisible:true,
    component: ViewRateCardDetails,
    layout: "/media"
  },
  {
    path: "/print/view-details",
    name: "Details",
    invisible:true,
    component: ViewRateCardDetailsPrint,
    layout: "/media"
  },
  {
    
    path: "/view-subscription",
    name: "All Subscriptions",
    header:"subscriptions",
    component: ViewSubscription,
    layout: "/media"
  },
  {
    
    path: "/pending-subscription",
    name: "Pending Subscriptions",
    header:"subscriptions",
    component: PendingSubscriptions,
    layout: "/media"
  },
  {
    
    path: "/active-subscription",
    name: "Active Subscriptions",
    header:"subscriptions",
    component: ActiveSubscriptions,
    layout: "/media"
  },
  {
    
    path: "/approved-subscription",
    name: "Apporved Subscriptions",
    header:"subscriptions",
    component: ApprovedSubscriptions,
    layout: "/media"
  },
  {
    
    path: "/rejected-subscription",
    name: "Rejected Subscriptions",
    header:"subscriptions",
    component: RejectedSubscriptions,
    layout: "/media"
  },
  {
    
    path: "/subscription-details",
    name: "Subscriptions",
    header:"subscriptions",
    invisible:true,
    component: SubscriptionDetails,
    layout: "/media"
  },
  {
    path: "/transactions",
    name: "Transactions",
    header:"transactions",
    component: Index,
    layout: "/media"
  }, 
  {
    path: "/daily-reports",
    name: "Daily Reports",
    header:"report",
    component: Index,
    layout: "/media"
  },
  {
    path: "/general-report",
    name: "General Report",
    header:"report",
    component: Index,
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
    name:"User Profile",
    header:"profile",
    component: Profile,
    layout: "/media"
  },
  {
    path: "/company-profile",
    name:"Company Profile",
    header:"profile",
    component: CompanyProfile,
    layout: "/media"
  }
];
export default routes;
