// ViewUser.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Descriptions,
  Button,
  Space,
  Typography,
  Tag,
} from "antd";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";

const { Title } = Typography;

const ViewAppUser = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const record = state?.record;

  if (!record) {
    return (
      <div style={{ padding: 20 }}>
        <Button
          type="text"
          icon={<ArrowBackIos style={{ fontSize: 20 }} />}
          onClick={() => navigate(-1)}
          style={{ padding: 0 }}
        />
        <p>User not found</p>
      </div>
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", padding: "0px", borderRadius: "10px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button
          type="text"
          icon={<ArrowBackIos style={{ fontSize: 20 }} />}
          onClick={() => navigate(-1)}
          style={{ padding: 0 }}
        />
        <Title level={4} style={{ margin: 0 }}>User Details</Title>
      </div>

      {/* Summary Card */}
      <Card style={{ position: "relative" }} bodyStyle={{ paddingTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Space>
            {record.photo && (
              <img src={record.photo} alt="User" style={{ width: 60, height: 60, borderRadius: "50%" }} />
            )}
            <div>
              <Title level={5} style={{ marginBottom: 0 }}>{record.name}</Title>
              <div style={{ color: "#555" }}>{record.userId}</div>
            </div>
          </Space>
        </div>
      </Card>

      {/* Full Details */}
      <Card
        title="Full User Details"
        bordered
        style={{ borderRadius: 12 }}
        headStyle={{ marginBottom: 0, paddingBottom: 8, paddingTop: 16 }}
      >
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="User ID">{record.userId}</Descriptions.Item>
          <Descriptions.Item label="User Name">{record.name}</Descriptions.Item>
          <Descriptions.Item label="Mobile">{record.mobile}</Descriptions.Item>
          <Descriptions.Item label="Email">{record.email}</Descriptions.Item>
          <Descriptions.Item label="Gender">{record.gender}</Descriptions.Item>
          <Descriptions.Item label="Language">{record.language}</Descriptions.Item>
          <Descriptions.Item label="Creation Date">{record.creationDate}</Descriptions.Item>
          <Descriptions.Item label="Updation Date">{record.updationDate}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={record.status === "active" ? "#2fb344" : "#d63939"}>{record.status}</Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Space>
  );
};

export default ViewAppUser;
