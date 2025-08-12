import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
// import UserTable from "./UserTable";
import AppUser from "./AppUser";
import StaffTable from "./StaffTable";
import AddStaff from "./AddStaff";
import RolesTable from "./RolesTable";
import AddRole from "./AddRole";
// import GameTable from "./GameTable";
import AddGame from "./AddGame";
import TransactionTable from "./TransactionTable";
import DiscountTable from "./DiscountTable";
import AddCoupon from "./AddCoupon";
import NotificationTable from "./NotificationTable";
import AddNotification from "./AddNotification";

import AgentTable from "./AgentTable";
import SolarPlant from "./SolarPlant";
import AgentDetail from "./AgentDetail";
import BannerTables from "./BannerTables";
import AddBanner from "./AddBanner";
import AddSetting from "./AddSetting";
import Login from "./AdminLogin";
import MajorCategories from "./majorcategories";
import MinorCategories from "./minorcategories";
import PlantType from "./PlantType";
import PanelBrands from "./PanelBrands";
import InverterBrands from "./InverterBrands";
import PlantStructure from "./PlantStructure";
import PlantCategory from "./PlantCategory";
import DiscomMaster from "./DiscomMaster";
import UserDetails from "./UserDetails"; 
import SignIn from "./components/SignIn";
import VendorTable from "./VendorTable";
import VendorDetails from "./VendorDetails";
import VendorAddress from "./VendorAddress";
import VendorKyc from "./VendorKyc";
import VendorBranding from "./VendorBranding";
import VendorCatalogue from "./VendorCatalogue";
import VendorBusiness from "./VendorBusiness";
import BusinessTiming from "./BusinessTiming";
import Dashboard from "./Dashboard"; // Import the Dashboard component
import Subscription from "./Subscription";
import FaqUser from "./FaqUser";
import FaqVendor from "./FaqVendor";
import TicketVendor from "./TicketVendor";
import TicketUser from "./TicketUser";
import TicketCategories from "./TicketCategories";
import AnnualHoliday from "./AnnualHoliday";
import UserAddress from "./UserAddress"; 
import ProductCatalogue from "./ProductCatalogue";
import ServiceMaster from "./ServiceMaster";
import UnitMaster from "./UnitMaster";
import SpecsMaster from "./SpecsMaster";
import Blog from "./Blog";
import AddSubscription from "./AddSubscription";
import ViewSubscription from "./ViewSubscription";
import BusinessLeads from "./BusinessLeads";
import About from "./About";
import BusinessDetails from "./BusinessDetails";
import VendorRating from "./VendorRating";
import VendorCompany from "./VendorCompany";
import VendorService from "./VendorService";
import VendorSpecs from "./VendorSpecs";
import UsersList from "./UsersList";
import Roles from "./Roles";
import TermsCondition from "./TermsCondition";
import Privacy from "./Privacy";
import AuditTrail from "./AuditTrail"; 
import Chat from "./Chat";
import ViewChat from "./ViewChat";
import UserNotification from "./UserNotification";
import VendorNotification from "./VendorNotification";
import ViewUsers from "./ViewUsers";
import ViewAppUser from "./ViewAppUser";
import ViewVendorCompany from "./ViewVendorCompany";
import KycApparel from "./KycApparel";
import ServiceForm from "./ServiceForm";
import ViewBusinessTiming from "./ViewBusinessTiming";
import Orders from "./Orders";
import Website from "./Website";
import Whatsapp from "./Whatsapp";
import Payment from "./Payment";
import ViewLead from "./ViewLead";
import ViewTicket from "./ViewTicket";
import ViewUser from "./ViewUser";
import EditSubscription from "./EditSubscription";
import ViewVendorAddress from "./ViewVendorAddress";
import ViewVendorKyc from "./ViewVendorKyc";
import ViewKycApparel from "./ViewKycApparel";
import ViewVendorBranding from "./ViewVendorBranding";
import ViewVendorCatalogue from "./ViewVendorCatalogue";
import ViewVendorService from "./ViewVendorService";
import ViewVendorBusiness from "./ViewVendorBusiness";
import ViewSpecs from "./ViewSpecs";
import ViewVendorRating from "./ViewVendorRating";
import ViewUserAddress from "./ViewUserAddress";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/signin" replace />;
};


const App = () => {
  return (
    <Router>
      <Routes>
      
         <Route path="/signin" element={<SignIn/>}/>
   
           <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />

          {/* <Route path="users" element={<UserTable />} /> */}
          <Route path="appuser" element={<AppUser />} />
          <Route path="addstaff" element={<AddStaff />} />
          <Route path="stafftable" element={<StaffTable />} />
          <Route path="roletable" element={<RolesTable />} />
          <Route path="addrole" element={<AddRole />} />
          {/* <Route path="gametable" element={<GameTable />} /> */}
          <Route path="addgame" element={<AddGame />} />
          <Route path="transactiontable" element={<TransactionTable />} />
          <Route path="discounttable" element={<DiscountTable />} />
          <Route path="addcoupon" element={<AddCoupon />} />
          <Route path="notificationtable" element={<NotificationTable />} />
          <Route path="addnotification" element={<AddNotification />} />
          <Route path="agenttable" element={<AgentTable />} />
          <Route path="solarplant" element={<SolarPlant />} />
          <Route path="/agentdetail/:id" element={<AgentDetail />} />
          <Route path="bannertables" element={<BannerTables />} />
          <Route path="addbanner" element={<AddBanner />} />
          <Route path="addsetting" element={<AddSetting />} />
          <Route path="majorcategories" element={<MajorCategories />} />
          <Route path="minorcategories" element={<MinorCategories />} />
          <Route path="planttype" element={<PlantType />} />
          <Route path="panelbrands" element={<PanelBrands />} />
          <Route path="inverterbrands" element={<InverterBrands />} />
          <Route path="plantstructure" element={<PlantStructure />} />
          <Route path="plantcategory" element={<PlantCategory />} />
          <Route path="discommaster" element={<DiscomMaster />} />
           <Route path="/user/:userId" element={<UserDetails />} />
           <Route path="/vendortable" element={<VendorTable />} />
           <Route path="/vendors/view/:vendorId" element={<VendorDetails />} />
           <Route path="/vendoraddress" element={<VendorAddress />} />
           <Route path="/vendorkyc" element={<VendorKyc/>}/>
           <Route path="/branding" element={<VendorBranding />} />
           <Route path="/catalogue" element={<VendorCatalogue/>}/>
           <Route path="/businessservices" element={<VendorBusiness />} />
           <Route path="/businesstiming" element={<BusinessTiming />} />
           <Route path="/dashboard" element={<Dashboard/>}/>
           <Route path="/subscription" element={<Subscription/>}/>
           <Route path="/faquser" element={<FaqUser/>}/>
            <Route path="/faqvendor" element={<FaqVendor/>}/>
          <Route path="/ticketvendor" element={<TicketVendor/>}/>
          <Route path="/ticketuser" element={<TicketUser/>}/>
          <Route path="/ticketcategories" element={<TicketCategories/>}/>
          <Route path="/annual" element={<AnnualHoliday/>}/>
          <Route path="/useraddress" element={<UserAddress/>}/>
          <Route path="/productcatalogue" element={<ProductCatalogue/>}/>
          <Route path="/servicemaster" element={<ServiceMaster/>}/>
          <Route path="/unitmaster" element={<UnitMaster/>}/>
          <Route path="/specsmaster" element={<SpecsMaster/>}/>
          <Route path="/blog" element={<Blog/>}/>
          <Route path="/addsubscription" element={<AddSubscription />} />
          <Route path="/viewsubscription" element={<ViewSubscription />} />
          <Route path="/businessleads" element={<BusinessLeads />} />
          <Route path="/businessleads/:leadId" element={<BusinessDetails />} />
          <Route path="/rating" element={<VendorRating />} />
          <Route path="/vendorcompany" element={<VendorCompany />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/vendorservice" element={<VendorService />} />
          <Route path="/vendorspecs" element={<VendorSpecs />} />
           <Route path="/users" element={<UsersList />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/terms" element={<TermsCondition />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/audit" element={<AuditTrail />} />
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/chat/view/:id" element={<ViewChat />} />
          <Route path="/vendornotification" element={<VendorNotification/>}/>
          <Route path="/usernotification" element={<UserNotification/>}/>
          <Route path="/viewusers" element={<ViewUsers/>}/>
          <Route path="/viewappuser" element={<ViewAppUser/>}/>
          <Route path="/viewvendorcompany" element={<ViewVendorCompany/>}/>
          <Route path="/kycapparel" element={<KycApparel/>}/>
          <Route path="/addservice" element={<ServiceForm/>}/>
          <Route path="/viewbusinesstiming/:vendorId" element={<ViewBusinessTiming/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/website" element={<Website/>}/>
          <Route path="/whatsapp" element={<Whatsapp/>}/>
          <Route path="/payment" element={<Payment/>}/>
            <Route path="/viewlead/:id" element={<ViewLead />} />
          <Route path="/viewticket" element={<ViewTicket />} />
          <Route path="/viewuser" element={<ViewUser/>}/>
          <Route path="/editsubscription" element={<EditSubscription/>}/>
          <Route path="/viewvendoraddress" element={<ViewVendorAddress/>}/>
          <Route path="/viewvendorkyc" element={<ViewVendorKyc/>}/>
          <Route path="/viewkycapparel" element={<ViewKycApparel/>}/>
          <Route path="/viewbranding" element={<ViewVendorBranding/>}/>
          <Route path="/viewcatalogue" element={<ViewVendorCatalogue/>}/>
          <Route path="/viewvendorservice" element={<ViewVendorService/>}/>
          <Route path="/viewvendorbusiness" element={<ViewVendorBusiness/>}/>
          <Route path="/viewspecs" element={<ViewSpecs />} />
          <Route path="/viewvendorrating" element={<ViewVendorRating />} />
          <Route path="/viewuseraddress" element={<ViewUserAddress/>}/>
   </Route>

        
      </Routes>
    </Router>
  );
};

export default App;
