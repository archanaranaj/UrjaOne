// import React from "react";
// import { Row, Col, Card, Typography, Button } from "antd";
// import { UserOutlined } from "@ant-design/icons";
// import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
// import { Link } from "react-router-dom";

// import GroupAddIcon from '@mui/icons-material/GroupAdd';
// import StoreIcon from '@mui/icons-material/Store';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// import SolarPowerIcon from '@mui/icons-material/SolarPower';
// import GppMaybeIcon from '@mui/icons-material/GppMaybe';

// const { Title, Text } = Typography;

// const sessionData = [...Array(30)].map((_, i) => {
//   const fluctuation = (i % 2 === 0 ? -1 : 1) * (Math.random() * 1000);
//   return {
//     date: `Jul ${i + 1}`,
//     users: 3000 + i * 200 + fluctuation,
//     conversions: 2000 + i * 150 + fluctuation * 0.8,
//     revenue: 1500 + i * 120 + fluctuation * 0.6,
//   };
// });

// const barData = [
//   { name: "Jan", views: 4000, downloads: 2400 },
//   { name: "Feb", views: 3000, downloads: 1398 },
//   { name: "Mar", views: 2000, downloads: 9800 },
//   { name: "Apr", views: 2780, downloads: 3908 },
//   { name: "May", views: 1890, downloads: 4800 },
//   { name: "Jun", views: 2390, downloads: 3800 },
// ];

// const cards = [
//   {
//     title: "Total Users",
//     value: "14k",
//     icon: <UserOutlined />,
//     color: "#3b82f6",
//     chartColor: "#3b82f6",
//     chartData: sessionData.map((d) => ({ value: d.users })),
//     link: "/appuser",
//   },
//   {
//     title: "Total Vendors",
//     value: "$12k",
//     icon: <StoreIcon />,
//     color: "#22c55e",
//     chartColor: "#22c55e",
//     chartData: sessionData.map((d) => ({ value: d.revenue })),
//     link: "/vendortable",
//   },
//   {
//     title: "Total Leads",
//     value: "500",
//     icon: <GroupAddIcon />,
//     color: "#f97316",
//     chartColor: "#f97316",
//     chartData: sessionData.map((d) => ({ value: d.conversions })),
//     link: "/businessleads",
//   },
//   {
//     title: "Total Revenue",
//     value: "300",
//     icon: <AttachMoneyIcon />,
//     color: "#16f9dbff",
//     chartColor: "#16f9dbff",
//     chartData: sessionData.map((d) => ({ value: d.conversions })),
//     link: "/appusers",
//   },
//   {
//     title: "Pending Support Tickets",
//     value: "100",
//     icon: <SupportAgentIcon />,
//     color: "#e4c547ff",
//     chartColor: "#e4c547ff",
//     chartData: sessionData.map((d) => ({ value: d.conversions })),
//     link: "/ticketvendor",
//   },
//   {
//     title: "Solar Plant Registrations",
//     value: "400",
//     icon: <SolarPowerIcon />,
//     color: "#eb7fd9ff",
//     chartColor: "#eb7fd9ff",
//     chartData: sessionData.map((d) => ({ value: d.conversions })),
//     link: "/solarplant",
//   },
//   {
//     title: "KYC Pending",
//     value: "120",
//     icon: <GppMaybeIcon />,
//     color: "#90e694ff",
//     chartColor: "#90e694ff",
//     chartData: sessionData.map((d) => ({ value: d.conversions })),
//     link: "/vendorkyc",
//   },
//   {
//     custom: true,
//     content: (
//       <>
//         <Title level={5}>Explore your data</Title>
//         <Text>
//           Uncover performance and visitor insights with our data wizardry.
//         </Text>
//         <Button type="primary" size="small" style={{ marginTop: 12 }}>
//           Get insights
//         </Button>
//       </>
//     ),
//   },
// ];

// const Dashboard = () => {
//   return (
//     <div style={{ padding: '0 1px' }}>
//       <Row gutter={[16, 16]}>
//         {cards.map((card, index) => (
//           <Col xs={24} sm={12} md={12} lg={6} key={index}>
//             {card.custom ? (
//               <Card style={{ height: "100%", borderRadius: 8 }} bodyStyle={{ padding: 20 }}>
//                 {card.content}
//               </Card>
//             ) : (
//               <Link to={card.link} style={{ textDecoration: 'none' }}>
//                 <Card hoverable style={{ height: "100%", borderRadius: 8 }} bodyStyle={{ padding: 20 }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
//                     <div>
//                       <Title level={5} style={{ margin: 0 }}>{card.title}</Title>
//                       <Title level={2} style={{ margin: 0, color: "#111827" }}>{card.value}</Title>
//                     </div>
//                     <div style={{ fontSize: 36, color: card.color }}>{card.icon}</div>
//                   </div>
//                   <ResponsiveContainer width="100%" height={50}>
//                     <AreaChart data={card.chartData}>
//                       <defs>
//                         <linearGradient id={`color-${index}`} x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor={card.chartColor} stopOpacity={0.6} />
//                           <stop offset="95%" stopColor={card.chartColor} stopOpacity={0} />
//                         </linearGradient>
//                       </defs>
//                       <Area
//                         type="linear"
//                         dataKey="value"
//                         stroke={card.chartColor}
//                         fill={`url(#color-${index})`}
//                         strokeWidth={2}
//                       />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </Card>
//               </Link>
//             )}
//           </Col>
//         ))}
//       </Row>

//       {/* Charts Section */}
//       <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
//         <Col xs={24} md={12}>
//           <Card title="Sessions" style={{ height: 400, borderRadius: 8 }}>
//             <ResponsiveContainer width="100%" height={320}>
//               <AreaChart data={sessionData}>
//                 <defs>
//                   <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
//                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <Tooltip />
//                 <Area
//                   type="linear"
//                   dataKey="users"
//                   stroke="#3b82f6"
//                   fillOpacity={1}
//                   fill="url(#colorUsers)"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </Card>
//         </Col>

//         <Col xs={24} md={12}>
//           <Card title="Page views and downloads" style={{ height: 400, borderRadius: 8 }}>
//             <ResponsiveContainer width="100%" height={320}>
//               <BarChart data={barData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <Bar dataKey="views" fill="#0ea5e9" />
//                 <Bar dataKey="downloads" fill="#22d3ee" />
//               </BarChart>
//             </ResponsiveContainer>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, Typography, Spin, Alert } from "antd";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, BarChart, Bar
} from "recharts";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import StoreIcon from '@mui/icons-material/Store';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';

const { Title, Text } = Typography;

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://13.201.150.234/t2/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success) {
          setData(res.data.data);
        } else {
          throw new Error(res.data.message || "Failed to load dashboard");
        }
      } catch (err) {
        setError(err.message || "API error");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <Spin tip="Loading dashboard..." />;
  if (error) return <Alert message="Error" description={error} type="error" />;

  const cards = [
    { title: "Total Users", value: data.total_users, icon: <GroupAddIcon />, color: "#3b82f6", link: "/appuser" },
    { title: "Total Vendors", value: data.total_vendors, icon: <StoreIcon />, color: "#22c55e", link: "/vendortable" },
    { title: "Total Leads", value: data.total_leads, icon: <GroupAddIcon />, color: "#f97316", link: "/businessleads" },
    { title: "Total Revenue", value: data.total_revenue, icon: <AttachMoneyIcon />, color: "#16f9dbff", link: "/subscription" },
    { title: "Pending Support Tickets", value: data.pending_support_tickets, icon: <SupportAgentIcon />, color: "#e4c547ff", link: "/ticketvendor" },
    { title: "Solar Plant Registrations", value: data.solar_plant_registrations, icon: <SolarPowerIcon />, color: "#eb7fd9ff", link: "/solarplant" },
    { title: "KYC Pending", value: data.kyc_pending, icon: <GppMaybeIcon />, color: "#90e694ff", link: "/vendorkyc" },
  ];

  return (
    <div style={{ padding: '2px 2px' }}>
      <Row gutter={[16, 16]}>
        {cards.map((c, idx) => (
          <Col xs={24} sm={12} md={12} lg={6} key={idx}>
            <Link to={c.link} style={{ textDecoration: 'none' }}>
              <Card hoverable style={{ borderRadius: 8 }} bodyStyle={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div>
                    <Title level={5} style={{ margin: 0 }}>{c.title}</Title>
                    <Title level={2} style={{ margin: 0, color: "#111827" }}>{c.value}</Title>
                  </div>
                  <div style={{ fontSize: 36, color: c.color }}>{c.icon}</div>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12}>
          <Card title="Sessions Over Time" style={{ height: 400, borderRadius: 8 }}>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={data.sessions_chart_data}>
                <defs>
                  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#colorSessions)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Page Views & Downloads" style={{ height: 400, borderRadius: 8 }}>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={data.page_views_downloads_chart_data}>
                <XAxis dataKey="label" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Bar dataKey="value" name="Value" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
