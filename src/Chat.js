import React from "react";
import { Table, Tag, Button, Typography, Input } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const chatData = [
  {
    Chat_Ticket_ID: 1,
    Chat_Ticket_No:"CT-001",
    Chat_Lead_ID: 101,
    Chat_User_Name: "jimmy",
    Chat_Company_Name: "Tech Innovations",
    Chat_Initiated_By: "User",
    Chat_Start_Date: "2023-09-15",
    Status: "Active",
    chat: [
      { from: "user", type: "text", message: "Hi, I have an issue with my order." },
      { from: "vendor", type: "text", message: "Hello! Please share your order ID." },
    ],
  },
  {
    Chat_Ticket_ID: 2,
    Chat_Ticket_No:"CT-002",
    Chat_Lead_ID: 102,
   Chat_User_Name: "jeet",
    Chat_Company_Name: "Tech Solutions",
    Chat_Initiated_By: "Vendor",
    Chat_Start_Date: "2023-10-01",
    Status: "Blocked",
    chat: [
      { from: "user", type: "text", message: "Thanks for the quick support!" },
      { from: "vendor", type: "image", message: "./image/login-bg.jpg" },
    ],
  },
];

const Chat = () => {
  const navigate = useNavigate();
  const { Title, Text } = Typography;
const [searchText, setSearchText] = React.useState("");


  const columns = [
    {
      title: "Chat Ticket ID",
      dataIndex: "Chat_Ticket_ID",
      key: "Chat_Ticket_ID",
      render: (text) => <Text strong>{text}</Text>,
    },
    {      title: "Chat Ticket No",
      dataIndex: "Chat_Ticket_No",  
      key: "Chat_Ticket_No",},
    {
      title: "Lead ID",
      dataIndex: "Chat_Lead_ID",
      key: "Chat_Lead_ID",
    },
    {
      title: "User Name",
      dataIndex: "Chat_User_Name",
      key: "Chat_User_Name",
    },
    {
      title: "Company Name",
      dataIndex: "Chat_Company_Name",
      key: "Chat_Company_Name",
    },
    {
      title: "Initiated By",
      dataIndex: "Chat_Initiated_By",
      key: "Chat_Initiated_By",
    },
    {
      title: "Start Date",
      dataIndex: "Chat_Start_Date",
      key: "Chat_Start_Date",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (status) => {
        const colorMap = {
          Active: "#2fb344",
          Blocked: "#d63939",
          Inactive: "#d63939",
        };
        return (
          <Tag color={colorMap[status] || "gray"} style={{ color: "white" }}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
           style={{
                  backgroundColor: "#F0720B",
                  borderColor: "#F0720B",
                  color: "#fff",
                }}
          onClick={() => navigate(`/chat/view/${record.Chat_Ticket_ID}`, { state: record })}
          type="link"
        />
      ),
    },
  ];

return (
  <div
    style={{
      background: "#fff",
      padding: 20,
      borderRadius: 8,
      boxShadow: "0 0 10px rgba(0,0,0,0.05)",
    }}
  >
    {/* Header with title and search box aligned horizontally */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <Typography.Title level={4} style={{ margin: 0, color: "#333" }}>
        Chat List
      </Typography.Title>

      <Input.Search
        placeholder="Search..."
        allowClear
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          width: 200,
          height: 32,
          borderColor: "#206bc4",
          borderRadius: 4,
        }}
        className="custom-search"
      />
    </div>

    <Table
      dataSource={chatData.filter((item) =>
        item.Chat_User_Name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.Chat_Company_Name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.Chat_Ticket_No.toLowerCase().includes(searchText.toLowerCase())
      )}
      columns={columns}
      rowKey="Chat_Ticket_ID"
      pagination={{ pageSize: 5 }}
    />
  </div>
);
};

export default Chat;
