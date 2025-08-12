// ViewSubscription.js
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';


const { Title } = Typography;

const ViewSubscription = () => {
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
        <p>Subscription not found</p>
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
        <Title level={4} style={{ margin: 0 }}>Subscription Plan Details</Title>
      </div>

      {/* Summary Card */}
      <Card style={{ position: "relative" }} bodyStyle={{ paddingTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Title level={5} style={{ marginBottom: 0 }}>{record.plan_name}</Title>
        </div>

        <Space direction="vertical" size="small" style={{ marginTop: 12 }}>
          <div><strong>Plan ID:</strong> <span style={{ color: "#555" }}>{record.plan_id}</span></div>
          <div><strong>Sequence:</strong> <span style={{ color: "#555" }}>{record.plan_sequence}</span></div>
          
        </Space>
      </Card>

      {/* Full Details */}
      <Card
        title="Full Subscription Details"
        bordered
        style={{ borderRadius: 12 }}
        headStyle={{ marginBottom: 0, paddingBottom: 8, paddingTop: 16 }}
      >
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="Business Listing">{record.business_listing || "No"}</Descriptions.Item>
          <Descriptions.Item label="Dedicated Page">{record.dedicated_page || "No"}</Descriptions.Item>
          <Descriptions.Item label="Leads Category">{record.leads_category?.join(", ") || "None"}</Descriptions.Item>
          <Descriptions.Item label="Leads Count">{record.leads_count || 0}</Descriptions.Item>
          <Descriptions.Item label="Leads Region">{record.leads_region || 0}</Descriptions.Item>
          <Descriptions.Item label="Category Allowed">{record.category_allowed || 0}</Descriptions.Item>
          <Descriptions.Item label="Solar Plants Data">{record.solar_plants_data || 0}</Descriptions.Item>
          <Descriptions.Item label="Consumers List">{record.consumers_list || 0}</Descriptions.Item>
          <Descriptions.Item label="Premium Listing">{record.premium_listing || "No"}</Descriptions.Item>
          <Descriptions.Item label="Verified Badge">{record.verified_badge || "No"}</Descriptions.Item>
          <Descriptions.Item label="Premium Support">{record.premium_support || "No"}</Descriptions.Item>
          <Descriptions.Item label="Chat">{record.chat || "No"}</Descriptions.Item>
          <Descriptions.Item label="Leads Whatsapp">{record.leads_whatsapp || "No"}</Descriptions.Item>
          <Descriptions.Item label="Online Catalogue">{record.online_catalogue || "No"}</Descriptions.Item>

          <Descriptions.Item label="Quarterly Price">{record.qtr_price}</Descriptions.Item>
          <Descriptions.Item label="Half-Yearly Price">{record.hy_price}</Descriptions.Item>
          <Descriptions.Item label="Yearly Price">{record.year_price}</Descriptions.Item>

          <Descriptions.Item label="Qtr Price Discount">{record.qtr_price_discount || "0%"}</Descriptions.Item>
          <Descriptions.Item label="HY Price Discount">{record.hy_price_discount || "0%"}</Descriptions.Item>
          <Descriptions.Item label="Year Price Discount">{record.year_price_discount || "0%"}</Descriptions.Item>
          <Descriptions.Item label="GST">{record.gst || "18%"}</Descriptions.Item>

          <Descriptions.Item label="Created Date">{record.created_date || "25-07-2023"}</Descriptions.Item>
          <Descriptions.Item label="Updated Date">{record.updated_date || "26-06-2025"}</Descriptions.Item>
          <Descriptions.Item label="Updated By">{record.updated_by || "admin"}</Descriptions.Item>
         <Descriptions.Item label="Status">
  <Tag color={record.status === "Active" ? "#2fb344" : "#d63939"}>
    {record.status || "Active"}
  </Tag>
</Descriptions.Item>

        </Descriptions>
      </Card>
    </Space>
  );
};

export default ViewSubscription;
