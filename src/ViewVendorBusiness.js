import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Descriptions,
  Card,
  Button,
  Space,
  Typography,
  Tag,
} from "antd";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import dayjs from "dayjs";

const { Title } = Typography;

const ViewVendorBusiness = () => {
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
        />
        <p>No business service record found.</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Un-approved":
      case "Rejected":
      case "Inactive":
        return "red";
      default:
        return "blue";
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", padding: 0 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button
          type="text"
          icon={<ArrowBackIos style={{ fontSize: 20 }} />}
          onClick={() => navigate(-1)}
        />
        <Title level={4} style={{ margin: 0 }}>View Vendor Business Categories</Title>
      </div>

      {/* Summary */}
      <Card bodyStyle={{ paddingTop: 16 }}>
        <Title level={5} style={{ marginBottom: 0 }}>{record.name}</Title>
        <p style={{ marginBottom: 0 }}>{record.company}</p>
      </Card>

      {/* Details */}
      <Card
        title="Business Service Details"
        bordered
        style={{ borderRadius: 12 }}
        headStyle={{ paddingBottom: 8, paddingTop: 16 }}
      >
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="Vendor ID">{record.vendorId}</Descriptions.Item>
          <Descriptions.Item label="Vendor Name">{record.name}</Descriptions.Item>
          <Descriptions.Item label="Company Name">{record.company}</Descriptions.Item>
          <Descriptions.Item label="Major Category Code">{record.major_category_code}</Descriptions.Item>
          <Descriptions.Item label="Major Category Name">{record.major_category_name}</Descriptions.Item>
          <Descriptions.Item label="Minor Category Code">{record.minor_category_code}</Descriptions.Item>
          <Descriptions.Item label="Minor Category Name">{record.minor_category_name}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={getStatusColor(record.status)} style={{ border: "none" }}>
              {record.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Created Date">
            {dayjs(record.createdDate).format("DD-MM-YYYY HH:mm")}
          </Descriptions.Item>
          <Descriptions.Item label="Updated Date">
            {dayjs(record.updatedDate).format("DD-MM-YYYY HH:mm")}
          </Descriptions.Item>
          <Descriptions.Item label="Updated By">{record.updatedBy}</Descriptions.Item>
        </Descriptions>
      </Card>
    </Space>
  );
};

export default ViewVendorBusiness;
