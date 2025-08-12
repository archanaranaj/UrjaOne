// // ViewVendorAddress.js
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Card,
//   Descriptions,
//   Button,
//   Space,
//   Typography,
//   Tag,
// } from "antd";
// import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
// import dayjs from "dayjs";

// const { Title } = Typography;

// const ViewVendorAddress = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const record = state?.record;

//   if (!record) {
//     return (
//       <div style={{ padding: 20 }}>
//         <Button
//           type="text"
//           icon={<ArrowBackIos style={{ fontSize: 20 }} />}
//           onClick={() => navigate(-1)}
//           style={{ padding: 0 }}
//         />
//         <p>Vendor Address not found</p>
//       </div>
//     );
//   }

//   return (
//     <Space direction="vertical" size="large" style={{ width: "100%", padding: 0 }}>
//       {/* Header */}
//       <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//         <Button
//           type="text"
//           icon={<ArrowBackIos style={{ fontSize: 20 }} />}
//           onClick={() => navigate(-1)}
//           style={{ padding: 0 }}
//         />
//         <Title level={4} style={{ margin: 0 }}>Vendor Address Details</Title>
//       </div>

//       {/* Summary Card */}
//       <Card bodyStyle={{ paddingTop: 16 }}>
//         <Title level={5} style={{ marginBottom: 0 }}>{record.name}</Title>
//         <p style={{ marginBottom: 0 }}>{record.company}</p>
//       </Card>

//       {/* Detailed Info */}
//       <Card
//         title="Address Information"
//         bordered
//         style={{ borderRadius: 12 }}
//         headStyle={{ paddingBottom: 8, paddingTop: 16 }}
//       >
//         <Descriptions bordered column={1} size="small">
//           <Descriptions.Item label="Vendor ID">{record.vendorId}</Descriptions.Item>
//           <Descriptions.Item label="Vendor Name">{record.name}</Descriptions.Item>
//           <Descriptions.Item label="Company Name">{record.company}</Descriptions.Item>
//           <Descriptions.Item label="Address Type">{record.addressType}</Descriptions.Item>
//           <Descriptions.Item label="State Name">{record.stateName}</Descriptions.Item>
//           <Descriptions.Item label="City Name">{record.cityName}</Descriptions.Item>
//           <Descriptions.Item label="Pin Code">{record.pinCode}</Descriptions.Item>
//           <Descriptions.Item label="Geo-Location">{record.geoLocation}</Descriptions.Item>
//           <Descriptions.Item label="Address Text">{record.addressText}</Descriptions.Item>
//           <Descriptions.Item label="Status">
//             <Tag color={record.status === "Active" ? "#2fb344" : "#d63939"}>
//               {record.status}
//             </Tag>
//           </Descriptions.Item>
//           <Descriptions.Item label="Created Date">
//             {dayjs(record.createdDate).format("DD-MM-YYYY HH:mm")}
//           </Descriptions.Item>
//           <Descriptions.Item label="Updated Date">
//             {dayjs(record.updatedDate).format("DD-MM-YYYY HH:mm")}
//           </Descriptions.Item>
//           <Descriptions.Item label="Updated By">{record.updatedBy}</Descriptions.Item>
//         </Descriptions>
//       </Card>
//     </Space>
//   );
// };

// export default ViewVendorAddress;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Descriptions,
  Button,
  Space,
  Typography,
  Tag,
  Spin,
  message,
} from "antd";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import dayjs from "dayjs";
import axios from "axios";

const { Title } = Typography;

const ViewVendorAddress = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [record, setRecord] = useState(state?.record || null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const baseURL = process.env.REACT_APP_API_BASE_URL || "http://13.201.150.234/t2/api";

  // Fetch single vendor address by ID by fetching all and filtering (replace if single API exists)
  const fetchVendorAddressById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${baseURL}/admin/vendortab/alladdresses`,
        { vendor_id: "1" }, // You can add filters if needed, or adjust vendor_id
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        const item = res.data.data.find((addr) => addr.id === id);
        if (item) {
          setRecord({
            key: item.id,
            vendorId: item.vendor_company_id,
            name: item.vendor_company?.company_name || "N/A",
            company: item.vendor_company?.company_name || "N/A",
            addressType: item.address_type,
            stateName: item.state,
            cityName: item.city,
            pinCode: item.zip_code,
            geoLocation: `${item.latitude}°, ${item.longitude}°`,
            addressText: `${item.address_line_1}, ${item.address_line_2}`,
            status: item.status === 1 ? "Active" : item.status === 0 ? "Inactive" : "Rejected",
            createdDate: item.created_at,
            updatedDate: item.updated_at,
            updatedBy: "-", // update if you have this info
          });
        } else {
          message.error("Vendor Address not found.");
          navigate(-1);
        }
      } else {
        message.error("Failed to fetch vendor address.");
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
      message.error("Error fetching vendor address.");
      navigate(-1);
    }
    setLoading(false);
  };

  useEffect(() => {
    // If no record passed via state, try to fetch by ID from state or route params (here using record.key)
    if (!record && state?.record?.key) {
      fetchVendorAddressById(state.record.key);
    }
  }, [record, state]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <Spin size="large" />
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
        <p>Vendor Address not found</p>
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
        <Title level={4} style={{ margin: 0 }}>
          Vendor Address Details
        </Title>
      </div>

      {/* Summary Card */}
      <Card bodyStyle={{ paddingTop: 16 }}>
        <Title level={5} style={{ marginBottom: 0 }}>
          {record.name}
        </Title>
        <p style={{ marginBottom: 0 }}>{record.company}</p>
      </Card>

      {/* Detailed Info */}
      <Card
        title="Address Information"
        bordered
        style={{ borderRadius: 12 }}
        headStyle={{ paddingBottom: 8, paddingTop: 16 }}
      >
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="Vendor ID">{record.vendorId}</Descriptions.Item>
          <Descriptions.Item label="Vendor Name">{record.name}</Descriptions.Item>
          <Descriptions.Item label="Company Name">{record.company}</Descriptions.Item>
          <Descriptions.Item label="Address Type">{record.addressType}</Descriptions.Item>
          <Descriptions.Item label="State Name">{record.stateName}</Descriptions.Item>
          <Descriptions.Item label="City Name">{record.cityName}</Descriptions.Item>
          <Descriptions.Item label="Pin Code">{record.pinCode}</Descriptions.Item>
          <Descriptions.Item label="Geo-Location">{record.geoLocation}</Descriptions.Item>
          <Descriptions.Item label="Address Text">{record.addressText}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={record.status === "Active" ? "#2fb344" : "#d63939"}>{record.status}</Tag>
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

export default ViewVendorAddress;
