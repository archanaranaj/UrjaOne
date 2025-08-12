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

const ViewVendorCatalogue = () => {
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
        <p>No vendor record found</p>
      </div>
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", padding: 0 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button
          type="text"
          icon={<ArrowBackIos style={{ fontSize: 20 }} />}
          onClick={() => navigate(-1)}
        />
        <Title level={4} style={{ margin: 0 }}>Vendor Holiday</Title>
      </div>

      {/* Summary */}
      <Card bodyStyle={{ paddingTop: 16 }}>
        <Title level={5} style={{ marginBottom: 0 }}>{record.name}</Title>
        <p style={{ marginBottom: 0 }}>Holiday ID: {record.holiday_id}</p>
      </Card>

      {/* Details */}
      <Card
        title="Holiday Details"
        bordered
        style={{ borderRadius: 12 }}
        headStyle={{ paddingBottom: 8, paddingTop: 16 }}
      >
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="Vendor ID">{record.vendorId}</Descriptions.Item>
          <Descriptions.Item label="Vendor Name">{record.name}</Descriptions.Item>
          <Descriptions.Item label="Year">{record.year}</Descriptions.Item>
          <Descriptions.Item label="Holiday ID">{record.holiday_id}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag
              color={record.status === "Active" ? "green" : "red"}
              style={{ border: "none" }}
            >
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

export default ViewVendorCatalogue;
