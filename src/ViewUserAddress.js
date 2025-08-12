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

const ViewUserAddress = () => {
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
        <p>User Address not found</p>
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
        <Title level={4} style={{ margin: 0 }}>User Address Details</Title>
      </div>

      {/* Summary Card */}
      <Card style={{ position: "relative" }} bodyStyle={{ paddingTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Space>
           
            <div>
              <Title level={5} style={{ marginBottom: 0 }}>{record.userName}</Title>
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
          <Descriptions.Item label="User Name">{record.userName}</Descriptions.Item>
          <Descriptions.Item label="Address Type">{record.addressType}</Descriptions.Item>
          <Descriptions.Item label="State Name">{record.stateName}</Descriptions.Item>
          <Descriptions.Item label="Pin Code">{record.pinCode}</Descriptions.Item>
          <Descriptions.Item label="City Name">{record.cityName}</Descriptions.Item>
          <Descriptions.Item label="Geo-Location">{record.geoLocation}</Descriptions.Item>
          <Descriptions.Item label="Address Text">{record.addressText}</Descriptions.Item>
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

export default ViewUserAddress;
