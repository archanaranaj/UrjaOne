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
import dayjs from "dayjs";

const { Title } = Typography;

const ViewKycApparel = () => {
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
        <p>KYC record not found</p>
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
          style={{ padding: 0 }}
        />
        <Title level={4} style={{ margin: 0 }}>Vendor KYC Document</Title>
      </div>

      {/* Vendor Summary */}
      <Card bodyStyle={{ paddingTop: 16 }}>
        <Title level={5} style={{ marginBottom: 0 }}>{record.name}</Title>
        <p style={{ marginBottom: 0 }}>{record.company}</p>
      </Card>

      {/* Detailed Info */}
      <Card
        title="KYC Details"
        bordered
        style={{ borderRadius: 12 }}
        headStyle={{ paddingBottom: 8, paddingTop: 16 }}
      >
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="Vendor ID">{record.vendorId}</Descriptions.Item>
          <Descriptions.Item label="Vendor Name">{record.name}</Descriptions.Item>
          <Descriptions.Item label="Company Name">{record.company}</Descriptions.Item>
          <Descriptions.Item label="KYC Document Code">{record.kyc_doc_code}</Descriptions.Item>
          <Descriptions.Item label="Document ID No">{record.doc_id_no}</Descriptions.Item>
          <Descriptions.Item label="Document Attachment">
            <a href={record.doc_attachment} target="_blank" rel="noopener noreferrer">
              <img
                src={record.doc_attachment}
                alt="Document"
                style={{ width: 100, height: 60, objectFit: "contain", borderRadius: 6 }}
              />
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag
              color={record.status === "Active" ? "green" : "red"}
              style={{ border: "none" }}
            >
              {record.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Remarks">
            {record.remarks ? record.remarks : "—"}
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

export default ViewKycApparel;
