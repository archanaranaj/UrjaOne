import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Descriptions,
  Image,
  Card,
  Typography,
  Button,
  Space,
  Tag,
} from "antd";
import { ArrowBackIos } from "@mui/icons-material";

const { Title } = Typography;

const ViewLead = () => {
  const { leadId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    if (location.state?.lead) {
      setLead(location.state.lead);
    } else {
      setLead(null);
    }
  }, [location]);

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
    <div style={{ background: "#fff", padding: 24, borderRadius: 10 }}>
      {/* Header */}
      <Space direction="horizontal" align="center" style={{ marginBottom: 16 }}>
        <Button
          type="text"
          icon={<ArrowBackIos style={{ fontSize: 20 }} />}
          onClick={() => navigate(-1)}
          style={{ padding: 0 }}
        />
        <Title level={4} style={{ margin: 0 }}>
          Lead Details
        </Title>
      </Space>

      {/* Summary Card */}
      <Card style={{ marginBottom: 24 }}>
        <Title level={5} style={{ marginBottom: 8 }}>
          Lead ID: {lead.leadId}
        </Title>
        <div><strong>User ID:</strong> {lead.userId}</div>
        <div><strong>City:</strong> {lead.city}</div>
        <div><strong>State:</strong> {lead.state}</div>
        <div><strong>Lead Type:</strong> {lead.leadType}</div>
        <div><strong>Lead Status:</strong> <Tag color={lead.leadStatus === "Open" ? "blue" : "default"}>{lead.leadStatus}</Tag></div>
      </Card>

      {/* Full Details */}
      <Card title="Full Lead Information" bordered style={{ borderRadius: 12 }}>
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="User Address ID">{lead.addressId}</Descriptions.Item>
          <Descriptions.Item label="Address Category">{lead.addressCategory}</Descriptions.Item>
          <Descriptions.Item label="Vendor ID">{lead.vendorId}</Descriptions.Item>
          <Descriptions.Item label="Vendor Service ID">{lead.vendorServiceId}</Descriptions.Item>
          <Descriptions.Item label="Major Category">{lead.majorCategoryCode}</Descriptions.Item>
          <Descriptions.Item label="Minor Category">{lead.minorCategoryCode}</Descriptions.Item>
          <Descriptions.Item label="Description">{lead.description}</Descriptions.Item>
          <Descriptions.Item label="Image">
            <Image src={lead.image} width={100} />
          </Descriptions.Item>
          <Descriptions.Item label="Lead Date">{lead.leadDate}</Descriptions.Item>
          <Descriptions.Item label="Lead Period">{lead.leadPeriod}</Descriptions.Item>
          <Descriptions.Item label="Lead Status">
            <Tag color={lead.leadStatus === "Open" ? "#108ee9" : "#d9d9d9"}>{lead.leadStatus}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={lead.status === "Active" ? "#2fb344" : "#d63939"}>{lead.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Created Date">{lead.createdDate}</Descriptions.Item>
          <Descriptions.Item label="Updated Date">{lead.updatedDate}</Descriptions.Item>
          <Descriptions.Item label="Updated By">{lead.updatedBy}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default ViewLead;
