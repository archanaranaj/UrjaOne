import React, { useState, useEffect } from "react";
import logo from './image/logo.png';
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  DeploymentUnitOutlined,
  ContactsOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
  CustomerServiceOutlined,
  ReadOutlined,
  DatabaseOutlined,
  SafetyCertificateOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Drawer,
  Badge,
  Tooltip,
} from "antd";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import axios from "axios";


const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const navigate = useNavigate();
 // Redirect to SignIn if no token found
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signIn", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setCollapsed(mobile);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://13.201.150.234/t2/api/admin/logout",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    localStorage.clear(); // remove token and user
    navigate("/SignIn");
  } catch (error) {
    console.error("Logout failed", error);
    alert("Error logging out");
  }
};


  const menuContent = (
    <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1" icon={<HomeOutlined />}><Link to="/dashboard">Dashboard</Link></Menu.Item>
      <SubMenu key="sub1" icon={<UserOutlined />} title="App Users">
        <Menu.Item key="2"><Link to="/appuser">App Users</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/useraddress">User Address</Link></Menu.Item>
      <Menu.Item key="4" ><Link to="/solarplant">Solar Plants Registered</Link></Menu.Item>

      </SubMenu>
      <SubMenu key="sub2" icon={<TeamOutlined />} title="App Vendors">
        <Menu.Item key="5"><Link to="/vendortable">Vendors List</Link></Menu.Item>
        <Menu.Item key="6"><Link to="/vendorcompany">Vendor Company Details</Link></Menu.Item>
        <Menu.Item key="7"><Link to="/vendoraddress">Vendor Addresses</Link></Menu.Item>
        <Menu.Item key="8"><Link to="/vendorkyc">KYC Apparel</Link></Menu.Item>
        <Menu.Item key="9"><Link to="/kycapparel"> Vendor KYC</Link></Menu.Item>
        <Menu.Item key="10"><Link to="/branding">Vendor Branding</Link></Menu.Item>
        <Menu.Item key="11"><Link to="/catalogue">Vendor Holiday</Link></Menu.Item>
        <Menu.Item key="12"><Link to="/businessservices">Vendor Business Categories</Link></Menu.Item>
        <Menu.Item key="13"><Link to="/businesstiming">Vendor Business Timings</Link></Menu.Item>
        <Menu.Item key="14"><Link to="/rating">Vendor Reviews & Ratings</Link></Menu.Item>
        <Menu.Item key="15"><Link to="/vendorservice">Popular Services</Link></Menu.Item>
        {/* <Menu.Item key="16"><Link to="/vendorspecs">Vendor Services Approval</Link></Menu.Item> */}
      </SubMenu>
      <Menu.Item key="16" icon={<ContactsOutlined />}><Link to="/businessleads">Business Leads</Link></Menu.Item>
 <SubMenu key="sub3" icon={<ShoppingOutlined />} title="Product Catalogue">
       <Menu.Item key="17"><Link to="/servicemaster">Services Master</Link></Menu.Item>
        <Menu.Item key="18"><Link to="/unitmaster">Service Unit Master</Link></Menu.Item>
        <Menu.Item key="19"><Link to="/specsmaster">Service Specs Master</Link></Menu.Item>
        </SubMenu>
     
        <Menu.Item key="20" icon={<ListAltOutlinedIcon/>}><Link to="/orders">Orders</Link></Menu.Item>
      
      <Menu.Item key="21" icon={<ProfileOutlined />}><Link to="/subscription">Manage Subscription</Link></Menu.Item>
      <SubMenu key="sub4" icon={<CustomerServiceOutlined />} title="Support Tickets">
        <Menu.Item key="22"><Link to="/ticketvendor">Vendor</Link></Menu.Item>
        <Menu.Item key="23"><Link to="/ticketuser">User</Link></Menu.Item>
        <Menu.Item key="24"><Link to="/ticketcategories">Ticket Categories</Link></Menu.Item>
      </SubMenu>
      <Menu.Item key="25" icon={<ReadOutlined />}><Link to="/blog">Blog</Link></Menu.Item>
      <SubMenu key="sub5" icon={<DatabaseOutlined />} title="Master">
        <Menu.Item key="26"><Link to="/majorcategories">Major Categories</Link></Menu.Item>
        <Menu.Item key="27"><Link to="/minorcategories">Minor Categories</Link></Menu.Item>
        <Menu.Item key="28"><Link to="/planttype">Plant Type</Link></Menu.Item>
        <Menu.Item key="29"><Link to="/panelbrands">Panel Brands</Link></Menu.Item>
        <Menu.Item key="30"><Link to="/inverterbrands">Inverter Brands</Link></Menu.Item>
        <Menu.Item key="31"><Link to="/plantstructure">Plant Structure Type</Link></Menu.Item>
        <Menu.Item key="32"><Link to="/plantcategory">Plant Category</Link></Menu.Item>
        <Menu.Item key="33"><Link to="/discommaster">Discom Master</Link></Menu.Item>
        <Menu.Item key="34"><Link to="/faquser">FAQ User</Link></Menu.Item>
        <Menu.Item key="35"><Link to="/faqvendor">FAQ Vendor</Link></Menu.Item>
        <Menu.Item key="36"><Link to="/annual">Annual Holiday</Link></Menu.Item>
       
      </SubMenu>
      <SubMenu key="sub6" icon={<SafetyCertificateOutlined />} title="Access Management">
        <Menu.Item key="37"><Link to="/users">Users List</Link></Menu.Item>
        <Menu.Item key="38"><Link to="/roles">Role Permissions</Link></Menu.Item>
        <Menu.Item key="39"><Link to="/audit">Audit Trail</Link></Menu.Item>
      </SubMenu>
      <SubMenu key="sub7" icon={<BellOutlined />} title="Notifications">
        <Menu.Item key="40"><Link to="/vendornotification">Vendor</Link></Menu.Item>
        <Menu.Item key="41"><Link to="/usernotification">User</Link></Menu.Item>
      </SubMenu>
      <SubMenu key="sub8" icon={<SettingOutlined />} title="Settings">
        {/* <Menu.Item key="43"><Link to="/about">About Us</Link></Menu.Item>
        <Menu.Item key="44"><Link to="/privacy">Privacy Policy</Link></Menu.Item>
        <Menu.Item key="45"><Link to="/terms">Terms Of User</Link></Menu.Item> */}
         <Menu.Item key="42"><Link to="/website">Website URL</Link></Menu.Item>
        <Menu.Item key="43"><Link to="/payment">Payment API</Link></Menu.Item>
        <Menu.Item key="44"><Link to="/whatsapp">Whatsapp API</Link></Menu.Item>
       
      </SubMenu>
      <Menu.Item key="45" icon={<ChatBubbleOutlineOutlined />}><Link to="/chat">Chat</Link></Menu.Item>
      <Menu.Item key="46" icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh", overflowX: "hidden" }}>
      {isMobile ? (
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
          bodyStyle={{ padding: 0 }}
          width={300}
        >
          <div style={{ padding: 16, background: "#001529", textAlign: "center" }}>
            <img src={logo} alt="Logo" style={{ height: "60px", width: "auto" }} />
          </div>
          {menuContent}
        </Drawer>
      ) : (
        <Sider
          width={250}
          collapsible
          collapsed={collapsed}
          trigger={null}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            background: "white",
            overflow: "hidden",
             flexDirection: "column", 
          }}
        >
          {/* Fixed Logo Header */}
          <div
            style={{
              height: 64,
              padding: "16px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "start",
              borderBottom: "1px solid #f0f0f0",
              background: "white",
              zIndex: 1,
            }}
          >
            {collapsed ? (
              <MenuUnfoldOutlined style={{ fontSize: "20px", color: "#000" }} onClick={() => setCollapsed(false)} />
            ) : (
              <>
                <MenuFoldOutlined style={{ fontSize: "20px", color: "#000" }} onClick={() => setCollapsed(true)} />
                <img src={logo} alt="Logo" style={{ height: "40px", width: "auto" }} />
              </>
            )}
          </div>

          {/* Scrollable Menu */}
          <div
            style={{
              height: "calc(100% - 64px)",
              overflowY: "auto",
              scrollbarWidth: "4px",
              paddingRight: "4px",
            }}
          >
            {menuContent}
          </div>
        </Sider>
      )}

      <Layout style={{ marginLeft: isMobile ? 0 : collapsed ? 80 : 250, transition: "all 0.2s" }}>
        <Header
          style={{
            position: "fixed",
            top: 0,
            left: isMobile ? 0 : collapsed ? 80 : 250,
            right: 0,
            zIndex: 100,
            background: "white",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.2s",
          }}
        >
          {isMobile ? (
            <MenuUnfoldOutlined style={{ fontSize: "20px", color: "black" }} onClick={() => setDrawerVisible(true)} />
          ) : (
            <div style={{ width: 20 }}></div>
          )}

          <div style={{ display: "flex", gap: "24px", alignItems: "center", marginRight: "16px" }}>
            <Tooltip title="Notifications">
              <Badge count={5} size="small">
                <BellOutlined
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={() => navigate("/notifications")}
                />
              </Badge>
            </Tooltip>
            <Tooltip title="Support Tickets">
              <Badge count={2} size="small">
                <CustomerServiceOutlined
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={() => navigate("/tickets")}
                />
              </Badge>
            </Tooltip>
            <Tooltip title="Orders">
              <Badge count={3} size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={() => navigate("/subscription")}
                />
              </Badge>
            </Tooltip>
          </div>
        </Header>

        <Content
          style={{
            marginTop: 64,
            padding: 24,
            height: "calc(100vh - 64px - 70px)",
            overflow: "auto",
            backgroundColor: "#f0f2f5",
          }}
        >
          <Outlet />
        </Content>

        <Footer style={{ textAlign: "center" }}>
          © 2025 UrjaOne. All Rights Reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
