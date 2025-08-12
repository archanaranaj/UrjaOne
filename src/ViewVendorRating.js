// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Descriptions,
//   Card,
//   Button,
//   Space,
//   Typography,
//   Tag,
// } from "antd";
// import ArrowBackIos from "@mui/icons-material/ArrowBackIos";

// const { Title } = Typography;

// const ViewVendorRating = () => {
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
//         />
//         <p>No vendor rating record found.</p>
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
//         />
//         <Title level={4} style={{ margin: 0 }}>
//           Vendor Rating & Review Details
//         </Title>
//       </div>

//       {/* Summary */}
//       <Card bodyStyle={{ paddingTop: 16 }}>
//         <Title level={5} style={{ marginBottom: 0 }}>
//           Vendor: {record.vendorId} - {record.name}
//         </Title>
//         <p style={{ marginBottom: 0 }}>
//           {record.userName} (User ID: {record.userId})
//         </p>
//       </Card>

//       {/* Details */}
//       <Card
//         title="Review Details"
//         bordered
//         style={{ borderRadius: 12 }}
//         headStyle={{ paddingBottom: 8, paddingTop: 16 }}
//       >
//         <Descriptions bordered column={1} size="small">
//           <Descriptions.Item label="Vendor ID">{record.vendorId}</Descriptions.Item>
//           <Descriptions.Item label="Vendor Name">{record.name}</Descriptions.Item>
//           <Descriptions.Item label="Rating">{record.rating}</Descriptions.Item>
//           <Descriptions.Item label="Remarks">{record.remarks}</Descriptions.Item>
//           <Descriptions.Item label="User ID">{record.userId}</Descriptions.Item>
//           <Descriptions.Item label="User Name">{record.userName}</Descriptions.Item>
//           <Descriptions.Item label="State">{record.state}</Descriptions.Item>
//           <Descriptions.Item label="City">{record.city}</Descriptions.Item>
//           <Descriptions.Item label="Status">
//             <Tag
//               color={record.status === "Active" ? "green" : "red"}
//               style={{ border: "none" }}
//             >
//               {record.status}
//             </Tag>
//           </Descriptions.Item>
//           <Descriptions.Item label="Review Date">{record.reviewDate}</Descriptions.Item>
//           <Descriptions.Item label="Inserted Date">{record.insertedDate}</Descriptions.Item>
//         </Descriptions>
//       </Card>
//     </Space>
//   );
// };

// export default ViewVendorRating;
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Descriptions, Card, Button, Space, Typography, Tag, message } from "antd";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import axios from "axios";

const { Title } = Typography;

const ViewVendorRating = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [record, setRecord] = useState(state?.record || null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const baseURL = process.env.REACT_APP_API_BASE_URL || "http://13.201.150.234/t2/api";

  // Optional: Fetch fresh details if no record in state or want updated info
  useEffect(() => {
    if (!record && state?.record?.id) {
      const fetchDetails = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `${baseURL}/admin/vendortab/listRatings`,
            { vendor_id: "" }, // or vendor_id as needed
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (res.data.success) {
            // Find the record by id from response
            const found = res.data.data.find(item => item.id === state.record.id);
            if (found) {
              setRecord({
                id: found.id,
                vendorId: found.vendor?.id?.toString() || "",
                name: found.vendor?.name || "",
                rating: found.rating,
                remarks: found.review_text || "",
                userId: found.user?.id?.toString() || "",
                userName: found.user?.name || "",
                status: found.status === 1 ? "Active" : "Inactive",
                reviewDate: found.created_at ? found.created_at.split("T")[0] : "",
                insertedDate: found.updated_at ? found.updated_at.split("T")[0] : "",
              });
            } else {
              message.error("Record not found");
              navigate(-1);
            }
          } else {
            message.error("Failed to fetch rating details");
          }
        } catch (error) {
          message.error("Error fetching rating details");
          console.error(error);
        }
        setLoading(false);
      };
      fetchDetails();
    }
  }, [record, state, token, baseURL, navigate]);

  if (!record) {
    return (
      <div style={{ padding: 20 }}>
        <Button
          type="text"
          icon={<ArrowBackIos style={{ fontSize: 20 }} />}
          onClick={() => navigate(-1)}
        />
        <p>No vendor rating record found.</p>
      </div>
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", padding: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button
          type="text"
          icon={<ArrowBackIos style={{ fontSize: 20 }} />}
          onClick={() => navigate(-1)}
        />
        <Title level={4} style={{ margin: 0 }}>
          Vendor Rating & Review Details
        </Title>
      </div>

      <Card bodyStyle={{ paddingTop: 16 }}>
        <Title level={5} style={{ marginBottom: 0 }}>
          Vendor: {record.vendorId} - {record.name}
        </Title>
        <p style={{ marginBottom: 0 }}>
          {record.userName} (User ID: {record.userId})
        </p>
      </Card>

      <Card
        title="Review Details"
        bordered
        style={{ borderRadius: 12 }}
        headStyle={{ paddingBottom: 8, paddingTop: 16 }}
      >
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="Vendor ID">{record.vendorId}</Descriptions.Item>
          <Descriptions.Item label="Vendor Name">{record.name}</Descriptions.Item>
          <Descriptions.Item label="Rating">{record.rating}</Descriptions.Item>
          <Descriptions.Item label="Remarks">{record.remarks}</Descriptions.Item>
          <Descriptions.Item label="User ID">{record.userId}</Descriptions.Item>
          <Descriptions.Item label="User Name">{record.userName}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag
              color={record.status === "Active" ? "green" : "red"}
              style={{ border: "none" }}
            >
              {record.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Review Date">{record.reviewDate}</Descriptions.Item>
          <Descriptions.Item label="Inserted Date">{record.insertedDate}</Descriptions.Item>
        </Descriptions>
      </Card>
    </Space>
  );
};

export default ViewVendorRating;
