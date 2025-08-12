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

const ViewVendorService = () => {
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
        <p>No vendor service record found.</p>
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
        <Title level={4} style={{ margin: 0 }}>View Vendor Service</Title>
      </div>

      {/* Summary */}
      <Card bodyStyle={{ paddingTop: 16 }}>
        <Title level={5} style={{ marginBottom: 0 }}>{record.vendorServiceName}</Title>
        <p style={{ marginBottom: 0 }}>{record.name} — {record.vendorId}</p>
      </Card>

      {/* Details */}
      <Card
        title="Service Details"
        bordered
        style={{ borderRadius: 12 }}
        headStyle={{ paddingBottom: 8, paddingTop: 16 }}
      >
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="Vendor Service ID">{record.vendorServiceId}</Descriptions.Item>
          <Descriptions.Item label="Vendor Name">{record.name}</Descriptions.Item>
          <Descriptions.Item label="Service ID">{record.serviceId}</Descriptions.Item>
          <Descriptions.Item label="Vendor ID">{record.vendorId}</Descriptions.Item>
          <Descriptions.Item label="Major Category ID">{record.majorCategoryId}</Descriptions.Item>
          <Descriptions.Item label="Minor Category ID">{record.minorCategoryId}</Descriptions.Item>

          <Descriptions.Item label="Service Banner">
            <img
              src={record.serviceBanner}
              alt="Service Banner"
              style={{ width: 100, height: 60, objectFit: "cover", borderRadius: 6 }}
            />
          </Descriptions.Item>

          <Descriptions.Item label="Service Image">
            <img
              src={record.serviceImage}
              alt="Service"
              style={{ width: 100, height: 60, objectFit: "cover", borderRadius: 6 }}
            />
          </Descriptions.Item>

          <Descriptions.Item label="Service Type">{record.serviceType}</Descriptions.Item>
          <Descriptions.Item label="Service Unit">{record.serviceUnit}</Descriptions.Item>
          <Descriptions.Item label="Description">{record.description}</Descriptions.Item>
          <Descriptions.Item label="Single Price Actual">₹{record.singlePriceActual}</Descriptions.Item>
          <Descriptions.Item label="Single Price Discounted">₹{record.singlePriceDiscounted}</Descriptions.Item>
          <Descriptions.Item label="Min Price">₹{record.minPrice}</Descriptions.Item>
          <Descriptions.Item label="Max Price">₹{record.maxPrice}</Descriptions.Item>

          <Descriptions.Item label="Attachment">
            <img
              src={record.attachment}
              alt="Attachment"
              style={{ width: 100, height: 60, objectFit: "cover", borderRadius: 6 }}
            />
          </Descriptions.Item>

          <Descriptions.Item label="Status">
            <Tag
              color={
                record.status === "Active"
                  ? "green"
                  : record.status === "Inactive"
                  ? "red"
                  : "orange"
              }
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

export default ViewVendorService;
