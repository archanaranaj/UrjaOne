import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Image, Button, Space, Typography, Tag } from "antd";
import { ArrowBackIos } from "@mui/icons-material";
import moment from "moment";

const { Title } = Typography;


const initialLeads = [
  {
    key: "1",
    leadId: "UL00000001",
    userId: "U001",
    addressId: "ADDR001",
    addressCategory: "Home",
    state: "Karnataka",
    city: "Bangalore",
    leadType: "Generic",
    vendorId: "",
    vendorName: "SunPower Pvt Ltd",
    vendorServiceId: "",
    serviceName: "Solar Installation",
    majorCategoryCode: "MC001",
    minorCategoryCode: "m001",
    description: "Need solar panel installation",
    image: "/solar1.jpg",
    leadDate: "2025-07-29",
    leadPeriod: "3 months",
    leadStatus: "Open",
    status: "Active",
    createdDate: "2025-07-29",
    updatedDate: "2025-07-29",
    updatedBy: "admin",
  },
];


const BusinessDetails = () => {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    const found = initialLeads.find((l) => l.leadId === leadId);
    setLead(found || null);
  }, [leadId]);

  if (!lead) {
    return (
      <div style={{ padding: 20 }}>
        <Button
          type="text"
          icon={<ArrowBackIos style={{ fontSize: 20 }} />}
          onClick={() => navigate(-1)}
          style={{ padding: 0 }}
        />
        <p>Lead not found</p>
      </div>
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", padding: "0px", borderRadius: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button type="text" onClick={() => navigate(-1)} style={{ fontSize: 20, padding: 0 }}>
          {"<"}
        </Button>
        <Title level={4} style={{ margin: 0 }}>Business Lead Details</Title>
      </div>

      <Card style={{ position: "relative" }} bodyStyle={{ paddingTop: 16 }}>
        <Title level={5} style={{ marginBottom: 0 }}>{lead.description}</Title>
        <Space direction="vertical" size="small" style={{ marginTop: 12 }}>
          <div><strong>Lead ID:</strong> <span style={{ color: "#555" }}>{lead.leadId}</span></div>
          <div><strong>User ID:</strong> <span style={{ color: "#555" }}>{lead.userId}</span></div>
          <div><strong>City:</strong> <span style={{ color: "#555" }}>{lead.city}</span></div>
          <div><strong>Lead Type:</strong> <span style={{ color: "#555" }}>{lead.leadType}</span></div>
        </Space>
      </Card>

      <Card title="Full Lead Information" bordered style={{ borderRadius: 12 }}>
      <Descriptions bordered column={1} size="small">
  <Descriptions.Item label="Address ID">{lead.addressId}</Descriptions.Item>
  <Descriptions.Item label="Address Category">{lead.addressCategory}</Descriptions.Item>
  <Descriptions.Item label="State">{lead.state}</Descriptions.Item>
  <Descriptions.Item label="Vendor ID">{lead.vendorId || "N/A"}</Descriptions.Item>
  <Descriptions.Item label="Vendor Service ID">{lead.vendorServiceId || "N/A"}</Descriptions.Item>
  <Descriptions.Item label="Major Category Code">{lead.majorCategoryCode}</Descriptions.Item>
  <Descriptions.Item label="Minor Category Code">{lead.minorCategoryCode}</Descriptions.Item>
  <Descriptions.Item label="Vendor Name">{lead.vendorName || "N/A"}</Descriptions.Item>
<Descriptions.Item label="Service Name">{lead.serviceName || "N/A"}</Descriptions.Item>
  <Descriptions.Item label="Lead Date">{moment(lead.leadDate).format("YYYY-MM-DD")}</Descriptions.Item>
  <Descriptions.Item label="Lead Period">{lead.leadPeriod}</Descriptions.Item>
  <Descriptions.Item label="Lead Status">{lead.leadStatus}</Descriptions.Item>
  <Descriptions.Item label="Status">
    <Tag color={lead.status === "Active" ? "#2fb344" : "#d63939"}>
      {lead.status}
    </Tag>
  </Descriptions.Item>
  <Descriptions.Item label="Created Date">{lead.createdDate}</Descriptions.Item>
  <Descriptions.Item label="Updated Date">{lead.updatedDate}</Descriptions.Item>
  <Descriptions.Item label="Updated By">{lead.updatedBy}</Descriptions.Item>
  <Descriptions.Item label="Description">{lead.description || "N/A"}</Descriptions.Item>
  <Descriptions.Item label="Attachment">
    {lead.image ? (
      <Image src={lead.image} width={100} />
    ) : (
      <span style={{ color: "#999" }}>No image uploaded</span>
    )}
  </Descriptions.Item>
</Descriptions>

      </Card>
    </Space>
  );
};

export default BusinessDetails;
