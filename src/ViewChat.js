import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Typography, Button, Image } from "antd";
import { ArrowBackIos } from "@mui/icons-material";

const { Text, Title } = Typography;

const ViewChat = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const chat = state?.chat ?? [];
  const userName = state?.Chat_User_Name ?? "User";
  const companyName = state?.Chat_Company_Name ?? "Company";
  const ticketNo = state?.Chat_Ticket_No ?? "Unknown";

  return (
    <div style={{ padding: "2px 2px", background: "#f0f2f5", minHeight: "100vh" }}>
      <div style={{ background: "#fff", borderRadius: 8, padding: 20 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <Button
            type="text"
            icon={<ArrowBackIos style={{ fontSize: 20 }} />}
            onClick={() => navigate(-1)}
            style={{ padding: 0 }}
          />
          <Title level={3} style={{ margin: 0, marginLeft: 10 }}>
            Chat Details
          </Title>
        </div>

        {/* Ticket Info */}
        <Card style={{ marginBottom: 16 }}>
          <Text strong>Ticket No:</Text> {ticketNo} <br />
          <Text strong>User Name:</Text> {userName} <br />
          <Text strong>Company Name:</Text> {companyName}
        </Card>

        {/* Chat Box */}
        <Card style={{ background: "#fff", minHeight: 300 }}>
          <Title level={4}>Chat</Title>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {chat.length > 0 ? (
              chat.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: item.from === "user" ? "#e6f7ff" : "#f9f0ff",
                    padding: 10,
                    borderRadius: 8,
                    marginBottom: 16,
                    maxWidth: "70%",
                    alignSelf: "flex-start",
                    wordBreak: "break-word",
                  }}
                >
                  <Text strong>{item.from === "user" ? userName : "Vendor"}</Text>
                  <div style={{ marginTop: 6 }}>
                    {item.type === "text" && <Text>{item.message}</Text>}
                    {item.type === "image" && (
                      <Image
                        src={
                          item.message.startsWith("http")
                            ? item.message
                            : `${window.location.origin}${item.message}`
                        }
                        width={120}
                        alt="chat-image"
                        style={{ marginTop: 6, borderRadius: 4 }}
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <Text type="secondary">No chat messages available.</Text>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ViewChat;
