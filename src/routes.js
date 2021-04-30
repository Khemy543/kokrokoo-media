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
import ApprovedSubscriptions from "views/Subscription/ApprovedSubscriptions";
import RejectedSubscriptions from "views/Subscription/RejectedSubscriptions";
import CompanyProfile from "views/examples/CompanyProfile.js";
import RejectionMessages from "views/Subscription/RejectionMessages";
import VolumeDiscount from "views/VolumeDiscount/VolumeDiscount";
import ApprovedDetails from "views/Subscription/ApprovedDetails";
import ChangePassword from "views/ChangePassword/ChangePassword";
import RegistrationPayment from "views/Payment/RegistrationPayment";
import PaymentVerification from "views/Payment/PaymentStatus";
import Transactions from "views/Transactions/Transactions";
import TransactionDetails from "views/Transactions/TransactionDetails";
import ActiveSubscriptions from "views/Tracker/ActiveSubscriptions";
import EditVideo from "views/Rate/Edit/EditVideo";
import EditPrint from "views/Rate/Edit/EditPrint";
import EditPrintDetails from "views/Rate/Edit/EditPrintDetails";
import EditRateCardDetails from "views/Rate/Edit/EditRateCardDetails";
import CompletedCampaigns from "views/Subscription/CompletedCampaigns";
import CompletedDetails from "views/Subscription/CompletedDetails";
import RejectedDetails from "views/Subscription/RejectedDetails";


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
    name: "Manage Rate Card",
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
    path: "/preview/print",
    name: "Edit Details",
    invisible:true,
    component: Preview,
    layout: "/media"
  },
  {
    path: "/edit-ratecard-title",
    name: "Manage Rate Card",
    invisible:true,
    header:"rate",
    component: EditRateTitle,
    layout: "/media"
  },
  {
    path: "/edit/print",
    name: "Manage Rate Card",
    invisible:true,
    header:"rate",
    component: EditPrint,
    layout: "/media"
  },
  {
    path: "/edit/video",
    name: "Manage Rate Card",
    invisible:true,
    header:"rate",
    component: EditVideo,
    layout: "/media"
  },
  {
    path: "/edit/details/print",
    name: "Manage Rate Card",
    invisible:true,
    header:"rate",
    component: EditPrintDetails,
    layout: "/media"
  },
  {
    path: "/edit/details/video",
    name: "Manage Rate Card",
    invisible:true,
    header:"rate",
    component: EditRateCardDetails,
    layout: "/media"
  },
  {
    path: "/preview/video",
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
/*   {
    
    path: "/view-subscription",
    name: "All Campaigns",
    header:"subscriptions",
    component: ViewSubscription,
    layout: "/media"
  }, */
  {
    
    path: "/pending-subscription",
    name: "Pending Campaigns",
    header:"subscriptions",
    component: PendingSubscriptions,
    layout: "/media"
  },
  {
    
    path: "/active-subscription",
    name: "Ad Schedule Tracker",
    header:"tracker",
    component: ActiveSubscriptions,
    layout: "/media"
  },
  {
    
    path: "/approved-subscription",
    name: "Approved Campaigns",
    header:"subscriptions",
    component: ApprovedSubscriptions,
    layout: "/media"
  },
  {
    
    path: "/volume-discount",
    name: "Volume Discount",
    header:"volume",
    component: VolumeDiscount,
    layout: "/media"
  },
  {
    
    path: "/rejected-subscription",
    name: "Rejected Campaigns",
    header:"subscriptions",
    component: RejectedSubscriptions,
    layout: "/media"
  },
   {
    
    path: "/completed-subscription",
    name: "Completed Campaigns",
    header:"subscriptions",
    component: CompletedCampaigns,
    layout: "/media"
  },
  {
    
    path: "/completed-details",
    name: "Completed Campaigns",
    header:"subscriptions",
    component: CompletedDetails,
    invisible:true,
    layout: "/media"
  },
  {
    
    path: "/subscription-details",
    name: "Campaigns",
    header:"subscriptions",
    invisible:true,
    component: SubscriptionDetails,
    layout: "/media"
  },
  {
    
    path: "/approved-details",
    name: "Campaigns",
    header:"subscriptions",
    invisible:true,
    component: ApprovedDetails,
    layout: "/media"
  },
  {
    
    path: "/rejected-campaign-details",
    name: "Campaigns",
    header:"subscriptions",
    invisible:true,
    component: RejectedDetails,
    layout: "/media"
  },
  {
    
    path: "/rejected-messages",
    name: "Reject Campaign",
    header:"subscriptions",
    invisible:true,
    component: RejectionMessages,
    layout: "/media"
  },
  {
    path: "/transactions",
    name: "Transactions",
    header:"transactions",
    component: Transactions,
    layout: "/media"
  }, 
  {
    path: "/transaction-details",
    name: "Transactions",
    header:"transactions",
    invisible:true,
    component: TransactionDetails,
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
    path: "/change-password",
    name: "Change Password",
    header:"profile",
    component: ChangePassword,
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
  },
  {
    path: "/payment/registration-payment",
    name:"Payment",
    header:"payment",
    component: RegistrationPayment,
    layout: "/media"
  },
  {
    path: "/payment/status",
    name:"Payment",
    header:"payment",
    invisible:true,
    component: PaymentVerification,
    layout: "/media"
  }
];
export default routes;
