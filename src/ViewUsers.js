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

const ViewUsers = () => {
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
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", padding: "0px", borderRadius: "10px" }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button
          type="text"
          icon={<ArrowBackIos style={{ fontSize: 20 }} />}
          onClick={() => navigate(-1)}
          style={{ padding: 0 }}
        />
        <Title level={4} style={{ margin: 0 }}>
          User Details
        </Title>
      </div>

      {/* Summary Card */}
      <Card style={{ position: "relative" }} bodyStyle={{ paddingTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Title level={5} style={{ marginBottom: 0 }}>{record.name}</Title>
        </div>

        <Space direction="vertical" size="small" style={{ marginTop: 12 }}>
          <div><strong>User ID:</strong> <span style={{ color: "#555" }}>{record.id}</span></div>
          <div><strong>Email:</strong> <span style={{ color: "#555" }}>{record.email}</span></div>
        </Space>
      </Card>

      {/* Full Details */}
      <Card
        title="Full User Details"
        bordered
        style={{ borderRadius: 12 }}
        headStyle={{ marginBottom: 0, paddingBottom: 8, paddingTop: 16 }}
      >
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="Name">{record.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{record.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{record.phone || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Role">
            <Tag color="blue">{record.role}</Tag>
          </Descriptions.Item>
         <Descriptions.Item label="Permissions">
            {Array.isArray(record.permission) && record.permission.length > 0 ? (
              record.permission.map((perm, index) => (
                <Tag key={index} color="blue">{perm}</Tag>
              ))
            ) : (
              <Tag color="red">No Permissions</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={record.status === "Active" ? "#2fb344" : "#d63939"}>
              {record.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Created Date">{record.created_date || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Updated Date">{record.updated_date || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Updated By">{record.updated_by || "admin"}</Descriptions.Item>
        </Descriptions>
      </Card>
    </Space>
  );
};

export default ViewUsers;
