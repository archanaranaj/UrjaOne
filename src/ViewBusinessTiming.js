


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Descriptions,
  Button,
  Space,
  Typography,
  Tag,
  message,
} from "antd";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import dayjs from "dayjs";
import axios from "axios";

const { Title } = Typography;

const ViewBusinessTiming = () => {
  const { state: recordFromNav } = useLocation(); // Expecting vendorId or record
  const navigate = useNavigate();

  const [record, setRecord] = useState(recordFromNav || null);
  const [loading, setLoading] = useState(false);

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (!recordFromNav || !recordFromNav.vendorId) {
      // No vendorId in navigation state, cannot fetch
      if (!recordFromNav) setRecord(null);
      return;
    }

    const fetchVendorTiming = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        // If you have numeric vendor ID, use it, else try parsing vendorId (like 'VND002' -> 2)
        // Here assuming vendorId is numeric or you know how to get numeric id
        const vendorIdNumeric =
          recordFromNav.vendorIdNum ||
          (typeof recordFromNav.vendorId === "string"
            ? recordFromNav.vendorId.replace(/\D/g, "") // extract digits
            : recordFromNav.vendorId) ||
          2; // fallback to 2

        const response = await axios.get(`${baseURL}/admin/vendortab/listVendorTimings`, {
          params: { vendor_id: vendorIdNumeric },
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success && response.data.data.length > 0) {
          setRecord(response.data.data[0]);
        } else {
          message.error("Vendor timings not found.");
          setRecord(null);
        }
      } catch (error) {
        console.error("Error fetching vendor timings:", error);
        message.error("Failed to fetch vendor timings");
        setRecord(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorTiming();
  }, [recordFromNav, baseURL]);

  if (loading) {
    return (
      <div style={{ padding: 20 }}>
        <Button
          type="text"
          icon={<ArrowBackIos style={{ fontSize: 20 }} />}
          onClick={() => navigate(-1)}
          style={{ padding: 0 }}
        />
        <p>Loading vendor timings...</p>
      </div>
    );
  }

  if (!record) {
    return (
      <div style={{ padding: 20 }}>
        <Button
          type="text"
          icon={<ArrowBackIos style={{ fontSize: 20 }} />}
          onClick={() => navigate(-1)}
          style={{ padding: 0 }}
        />
        <p>Record not found.</p>
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
          Vendor Business Timing Details
        </Title>
      </div>

      {/* Summary Card */}
      <Card style={{ position: "relative" }} bodyStyle={{ paddingTop: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Title level={5} style={{ marginBottom: 0 }}>
            Vendor ID: {record.vendor_id || record.vendor_company_id || "N/A"}
          </Title>
        </div>

        <Space direction="vertical" size="small" style={{ marginTop: 12 }}>
          <div>
            <strong>Status:</strong>{" "}
            <Tag
              color={record.status === "Active" ? "#2fb344" : "#d63939"}
              style={{ marginLeft: 8 }}
            >
              {record.status}
            </Tag>
          </div>
          <div>
            <strong>Open Time:</strong>{" "}
            <span style={{ color: "#555" }}>{record.open_time}</span>
          </div>
          <div>
            <strong>Close Time:</strong>{" "}
            <span style={{ color: "#555" }}>{record.close_time}</span>
          </div>
        </Space>
      </Card>

      {/* Full Details */}
      <Card
        title="Weekly Business Schedule"
        bordered
        style={{ borderRadius: 12 }}
        headStyle={{ marginBottom: 0, paddingBottom: 8, paddingTop: 16 }}
      >
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="Monday">{record.mon}</Descriptions.Item>
          <Descriptions.Item label="Tuesday">{record.tue}</Descriptions.Item>
          <Descriptions.Item label="Wednesday">{record.wed}</Descriptions.Item>
          <Descriptions.Item label="Thursday">{record.thu}</Descriptions.Item>
          <Descriptions.Item label="Friday">{record.fri}</Descriptions.Item>
          <Descriptions.Item label="Saturday">{record.sat}</Descriptions.Item>
          <Descriptions.Item label="Sunday">{record.sun}</Descriptions.Item>

          <Descriptions.Item label="Updated Date">
            {record.updated_at
              ? dayjs(record.updated_at, "DD/MM/YYYY, hh:mm a").format(
                  "DD-MM-YYYY HH:mm"
                )
              : "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Space>
  );
};

export default ViewBusinessTiming;
