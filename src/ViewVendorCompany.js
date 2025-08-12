

// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Card,
//   Descriptions,
//   Button,
//   Space,
//   Typography,
//   Image,
// } from "antd";
// import ArrowBackIos from "@mui/icons-material/ArrowBackIos";

// const { Title } = Typography;

// const ViewVendorCompany = () => {
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
//         <p>Company not found</p>
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
//         <Title level={4} style={{ margin: 0 }}>Company Details</Title>
//       </div>

//       {/* Company Summary Card with vertical layout */}
//       <Card bodyStyle={{ paddingTop: 16 }}>
//         {/* Banner on Top */}
//         <Card title="Company Banner" style={{ borderRadius: 12, marginBottom: 16 }}>
//           <Image
//             src={record.banner}
//             width="100%"
//             height={150}
//             style={{ objectFit: "cover", borderRadius: 8 }}
//             alt="Company Banner"
//           />
//         </Card>

//         {/* Logo and Info */}
//         {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}> */}
//          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//   <Image
//     src={record.logo}
//     width={100}
//     height={100}
//     style={{ borderRadius: "50%", objectFit: "cover" }}
//     alt="Company Logo"
//   />
//   <div>
//     <Title level={5} style={{ marginBottom: 4 }}>{record.companyName}</Title>
//     <a href={record.website} target="_blank" rel="noopener noreferrer" style={{ color: "#555" }}>
//       {record.website}
//     </a>
//   </div>
// </div>

//       </Card>

//       {/* Detailed Info */}
//       <Card
//         title="Company Information"
//         bordered
//         style={{ borderRadius: 12 }}
//         headStyle={{ paddingBottom: 8, paddingTop: 16 }}
//       >
//         <Descriptions bordered column={1} size="small">
//           <Descriptions.Item label="Company Name">{record.companyName}</Descriptions.Item>
//           <Descriptions.Item label="Company Type">{record.companyType}</Descriptions.Item>
//           <Descriptions.Item label="Employees">{record.employees}</Descriptions.Item>
//           <Descriptions.Item label="Website">
//             <a href={record.website} target="_blank" rel="noopener noreferrer">
//               {record.website}
//             </a>
//           </Descriptions.Item>
//           <Descriptions.Item label="Established">{record.established}</Descriptions.Item>
//           <Descriptions.Item label="Turnover">{record.turnover}</Descriptions.Item>
//           <Descriptions.Item label="Alt. Email">{record.altEmail}</Descriptions.Item>
//           <Descriptions.Item label="Alt. Mobile">{record.altMobile}</Descriptions.Item>
//         </Descriptions>
//       </Card>
//     </Space>
//   );
// };

// export default ViewVendorCompany;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Descriptions,
  Button,
  Space,
  Typography,
  Image,
  Spin,
  message,
} from "antd";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import axios from "axios";

const { Title } = Typography;

const ViewVendorCompany = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // If record passed via state, use it first
  const passedRecord = state?.record;

  // If you want to fetch fresh from API, get ID either from passed record or from route param (adjust if using route params)
  const companyId = passedRecord?.key || passedRecord?.originalDetails?.id;

  const [record, setRecord] = useState(passedRecord || null);
  const [loading, setLoading] = useState(!passedRecord);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const baseURL = process.env.REACT_APP_API_BASE_URL || "http://13.201.150.234/t2/api";

  // Fetch company details from API if no record passed
  useEffect(() => {
    if (!record && companyId) {
      setLoading(true);
      axios
        .get(`${baseURL}/admin/vendortab/companies`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { status: "", company_name: "", vendor_name: "", state: "", city: "" },
        })
        .then((res) => {
          if (res.data.success) {
            // Find the company with the matching ID
            const companyData = res.data.data.data.find(
              (item) => item.details?.id === companyId
            );
            if (companyData) {
              const details = companyData.details;
              setRecord({
                key: details.id,
                name: details.vendor?.name || "",
                companyName: details.company_name || "",
                companyType: details.company_type || "",
                employees: details.manpower || "",
                website: details.website_url || "",
                established: details.established_year || "",
                turnover: details.annual_turnover || "",
                altEmail: details.alternate_email || "",
                altMobile: details.alternate_number || "",
                logo: details.company_logo ? `${res.data.path}/${details.company_logo}` : "",
                banner: details.company_banner ? `${res.data.path}/${details.company_banner}` : "",
                status: companyData.status_text || "",
                originalDetails: details,
              });
            } else {
              setError("Company not found");
            }
          } else {
            setError("Failed to fetch company details");
          }
        })
        .catch(() => setError("Error fetching company details"))
        .finally(() => setLoading(false));
    }
  }, [companyId, record, token, baseURL]);

  if (loading) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error || !record) {
    return (
      <div style={{ padding: 20 }}>
        <Button
          type="text"
          icon={<ArrowBackIos style={{ fontSize: 20 }} />}
          onClick={() => navigate(-1)}
          style={{ padding: 0 }}
        />
        <p>{error || "Company not found"}</p>
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
          Company Details
        </Title>
      </div>

      {/* Company Summary Card with vertical layout */}
      <Card bodyStyle={{ paddingTop: 16 }}>
        {/* Banner on Top */}
        <Card title="Company Banner" style={{ borderRadius: 12, marginBottom: 16 }}>
          {record.banner ? (
            <Image
              src={record.banner}
              width="100%"
              height={150}
              style={{ objectFit: "cover", borderRadius: 8 }}
              alt="Company Banner"
            />
          ) : (
            <p>No banner available</p>
          )}
        </Card>

        {/* Logo and Info */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {record.logo ? (
            <Image
              src={record.logo}
              width={100}
              height={100}
              style={{ borderRadius: "50%", objectFit: "cover" }}
              alt="Company Logo"
            />
          ) : (
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                backgroundColor: "#eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#aaa",
                fontSize: 14,
              }}
            >
              No Logo
            </div>
          )}
          <div>
            <Title level={5} style={{ marginBottom: 4 }}>
              {record.companyName}
            </Title>
            {record.website ? (
              <a href={record.website} target="_blank" rel="noopener noreferrer" style={{ color: "#555" }}>
                {record.website}
              </a>
            ) : (
              <span>No website</span>
            )}
          </div>
        </div>
      </Card>

      {/* Detailed Info */}
      <Card
        title="Company Information"
        bordered
        style={{ borderRadius: 12 }}
        headStyle={{ paddingBottom: 8, paddingTop: 16 }}
      >
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="Company Name">{record.companyName}</Descriptions.Item>
          <Descriptions.Item label="Company Type">{record.companyType}</Descriptions.Item>
          <Descriptions.Item label="Employees">{record.employees}</Descriptions.Item>
          <Descriptions.Item label="Website">
            {record.website ? (
              <a href={record.website} target="_blank" rel="noopener noreferrer">
                {record.website}
              </a>
            ) : (
              "N/A"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Established">{record.established}</Descriptions.Item>
          <Descriptions.Item label="Turnover">{record.turnover}</Descriptions.Item>
          <Descriptions.Item label="Alt. Email">{record.altEmail}</Descriptions.Item>
          <Descriptions.Item label="Alt. Mobile">{record.altMobile}</Descriptions.Item>
        </Descriptions>
      </Card>
    </Space>
  );
};

export default ViewVendorCompany;
