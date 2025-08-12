import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Image, Button, Space, Typography, Tag, Spin, message } from "antd";
import { ArrowBackIos } from "@mui/icons-material";

const { Title } = Typography;

const API_BASE_URL = "http://13.201.150.234/t2/api/";
// Replace with your actual token
const AUTH_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjE5ZjM0ZTliMmEwMzQ3MjFlOTQ0YTczZDI0YzFjZTlmMDQ0OTEyMDZkODA4MDQzNGZmY2I2OGJjM2VkZjExYjUzODUzNDRlZTQ4ODMwOTYiLCJpYXQiOjE3NTQ5MDQ0NDcuOTU3NjcyLCJuYmYiOjE3NTQ5MDQ0NDcuOTU3Njc2LCJleHAiOjE3ODY0NDA0NDcuOTQ4NjU2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.mSsd8LNCVa4aUWDz86bBsFt_yJO-KTy0Dvuo2xXS9NpVMXbaxeSyia65eYUiO0qKyh5zuzgTit7SVGbfUEv5bFo8OOB1ERBXnA5KygvmOK3I-XBw-V2NlXuOR5fQvwOJDjRtZwpafeXwyjuxkA4mhbRH5XwHZ6slXSvS3bcP2YabmIfiPkbRuC6ey7Vl6vxAEjmFMBn7yrKBD1GPA1gQKFYdQ2b5yykXejBVnToxBPEMvMxo_jOtfpOb2p2CYYWu911de88xVmtMsE3HQje9tjxRJHfC8PliE1GWC-FwKUdyol5LY9ZghMZHT7TJP5baZDgFreIwNOLZn_yJNKiBqe93ay8PYZ52nJxLCggmx94-LvzdFxmSeiP0eGTvQUSbSugp91jbkGYz2xLVlTKEWYunNlsZd64F3xdDxqk3wjoDampOAIqlinZDF1GLngyxsP3WS4P0kqQcplK5g5-csQp6ekSXRGQaO6Uyei_YgfhFu1V1JaXy1LAsQ6Aj7ZLaNm7BLYBWy3AFFQKUHCy8lIZmRE66EPtauG7hqEMy-bBnVoJeqRJjT3rtHbXje3ZXdP61ZeLn8XOTWBxB13kJeuCRvphc3nWV3ze1BmvLgLGbDam_2vtUi3aHiX0Q5pla2ToC2mtiqchJPPrhFJockoUQhETCpC8NOHdcI23SCtw";


const VendorDetails = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   const fetchVendor = async () => {
  setLoading(true);
  try {
    const res = await fetch(`${API_BASE_URL}admin/vendortab/vendor?search=${vendorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    if (!res.ok) throw new Error("Vendor not found");

    const result = await res.json();
    console.log(result); // see what exactly comes

    if (result.success && Array.isArray(result.data) && result.data.length > 0) {
      setVendor(result.data[0]);
    } else if (result.success && result.data.data && result.data.data.length > 0) {
      setVendor(result.data.data[0]);
    } else {
      message.error(result.message || "Vendor not found");
      setVendor(null);
    }
  } catch (error) {
    message.error(error.message);
    setVendor(null);
  } finally {
    setLoading(false);
  }
};

    fetchVendor();
  }, [vendorId]);

  if (loading) return <Spin tip="Loading vendor details..." style={{ padding: 20 }} />;

  if (!vendor) {
    return (
      <div style={{ padding: 20 }}>
        <Button
          type="text"
          icon={<ArrowBackIos style={{ fontSize: 20 }} />}
          onClick={() => navigate(-1)}
          style={{ padding: 0 }}
        />
        <p>Vendor not found</p>
      </div>
    );
  }

  // Map data from API to your component fields for display

  const company = vendor.company && vendor.company.length > 0 ? vendor.company[0] : {};

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", padding: 20, borderRadius: "10px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button
          type="text"
          icon={<ArrowBackIos style={{ fontSize: 20 }} />}
          onClick={() => navigate(-1)}
          style={{ padding: 0 }}
        />
        <Title level={4} style={{ margin: 0 }}>Vendor Details</Title>
      </div>

      {/* Company Banner */}
      {company.company_banner && (
        <Card title="Company Banner" style={{ borderRadius: 12 }}>
          <Image
            src={`${API_BASE_URL}${company.company_banner}`}
            width="100%"
            height={150}
            style={{ objectFit: "cover", borderRadius: 8, marginBottom: 16 }}
            alt="Company Banner"
          />
        </Card>
      )}

      {/* Summary Card */}
      <Card style={{ position: "relative" }} bodyStyle={{ paddingTop: 16 }}>
        {company.company_logo && (
          <Image
            src={`${API_BASE_URL}${company.company_logo}`}
            width={100}
            height={100}
            style={{ borderRadius: "50%", objectFit: "cover", marginBottom: 12 }}
            alt="Company Logo"
          />
        )}

        <Space direction="vertical" size="small" style={{ marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Title level={5} style={{ marginBottom: 0 }}>{vendor.company_name || company.company_name}</Title>
          </div>
          <div><strong>Vendor ID:</strong> <span style={{ color: "#555" }}>{vendor.vendor_id}</span></div>
          <div><strong>Mobile:</strong> <span style={{ color: "#555" }}>{vendor.mobile || "N/A"}</span></div>
          <div><strong>Email:</strong> <span style={{ color: "#555" }}>{vendor.email || "N/A"}</span></div>
          <div><strong>Name:</strong> <span style={{ color: "#555" }}>{vendor.name || "N/A"}</span></div>
          <div><strong>Status:</strong> <Tag color={vendor.status_code === 1 ? "#2fb344" : "#d63939"}>
            {vendor.status_text}
          </Tag></div>
        </Space>
      </Card>

      {/* Full Details Card */}
      <Card
        title="Full Vendor Information"
        bordered
        style={{ borderRadius: 12 }}
        headStyle={{ marginBottom: 0, paddingBottom: 8, paddingTop: 16 }}
      >
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="Company Type">{company.company_type || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Establishment Year">{company.established_year || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Annual Turnover">{company.annual_turnover || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Manpower">{company.manpower || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Website URL">
            {company.website_url ? (
              <a href={company.website_url} target="_blank" rel="noopener noreferrer">
                {company.website_url}
              </a>
            ) : (
              "N/A"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Alternate Mobile">{company.alternate_number || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Alternate Email">{company.alternate_email || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Created Date">{vendor.registration_date?.split("T")[0] || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Updated Date">{vendor.last_updated?.split("T")[0] || "N/A"}</Descriptions.Item>
        </Descriptions>
      </Card>
    </Space>
  );
};

export default VendorDetails;
