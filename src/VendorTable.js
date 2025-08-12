
// import React, { useState } from "react";
// import {
//   Table,
//   Tag,
//   Button,
//   Input,
//   Space,
//   Select,
//   Tooltip,
// } from "antd";
// import {
//   EyeOutlined,
//   ReloadOutlined,
//   EditOutlined,
//   CheckOutlined,
//   CloseOutlined,
//   FileExcelOutlined,
// } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import * as XLSX from "xlsx"; // <-- Import XLSX

// const { Option } = Select;

// const VendorTable = () => {
//   const vendorData = [
//     {
//       key: "1",
//       vendorId: "AV0000001",
//       name: "Bhushan Kumar",
//       mobile: "9876543210",
//       email: "bhushan@example.com",
//       emailVerified: "Verified",
//       companyName: "URJAONE Pvt Ltd",
//       companyLogo: "https://via.placeholder.com/80",
//       companyTypeCode: "CT001",
//       establishmentYear: "2018",
//       manpowerCode: "MP005",
//       websiteURL: "https://urjaone.in",
//       turnoverCode: "TUR03",
//       companyBanner: "https://via.placeholder.com/150x50",
//       altMobile: "9123456789",
//       altEmail: "alt.archana@example.com",
//       altEmailVerified: "Yes",
//       status: "Pending",
//       createdDate: "2023-01-15",
//       updatedDate: "2024-07-22",
//       updatedBy: "user_101",
//     },
//     {
//       key: "2",
//       vendorId: "AV0000002",
//       name: "Ravi Sharma",
//       mobile: "9765432109",
//       email: "ravi@vendor.com",
//       emailVerified: "Non-Verified",
//       companyName: "SolarTek Solutions",
//       companyLogo: "https://via.placeholder.com/80",
//       companyTypeCode: "CT002",
//       establishmentYear: "2020",
//       manpowerCode: "MP003",
//       websiteURL: "https://solartek.com",
//       turnoverCode: "TUR02",
//       companyBanner: "https://via.placeholder.com/150x50",
//       altMobile: "9988776655",
//       altEmail: "alt.ravi@vendor.com",
//       altEmailVerified: "No",
//       status: "Pending",
//       createdDate: "2023-02-01",
//       updatedDate: "2024-07-10",
//       updatedBy: "user_102",
//     },
//   ];

//   const [searchText, setSearchText] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [filteredData, setFilteredData] = useState(vendorData);
//   const [data, setData] = useState(vendorData);
//   const [editingApprovalKey, setEditingApprovalKey] = useState(null);
//   const [editingKey, setEditingKey] = useState(null);
//   const [editingStatus, setEditingStatus] = useState("");

//   const handleSearch = (value) => {
//     setSearchText(value);
//     applyFilters(value, statusFilter);
//   };

//   const handleStatusChange = (value) => {
//     setStatusFilter(value);
//     applyFilters(searchText, value);
//   };

//   const handleReload = () => {
//     setSearchText("");
//     setStatusFilter("");
//     setFilteredData(vendorData);
//   };

//   const applyFilters = (searchVal, statusVal) => {
//     const filtered = vendorData.filter((vendor) => {
//       const matchesSearch =
//         vendor.name.toLowerCase().includes(searchVal.toLowerCase()) ||
//         vendor.mobile.includes(searchVal);

//       const matchesStatus = statusVal ? vendor.status === statusVal : true;

//       return matchesSearch && matchesStatus;
//     });

//     setFilteredData(filtered);
//   };

//   const highlightText = (text, search) => {
//     if (!search) return text;
//     const regex = new RegExp(`(${search})`, "gi");
//     return text.split(regex).map((part, index) =>
//       part.toLowerCase() === search.toLowerCase() ? (
//         <span key={index} style={{ backgroundColor: "yellow" }}>
//           {part}
//         </span>
//       ) : (
//         part
//       )
//     );
//   };

//   const handleApprovalChange = (vendorId, newStatus) => {
//     const updatedData = data.map((item) =>
//       item.vendorId === vendorId ? { ...item, approvalStatus: newStatus } : item
//     );
//     setData(updatedData);
//     setFilteredData(updatedData);
//     setEditingApprovalKey(null);
//   };

//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(vendorData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Vendors");
//     XLSX.writeFile(workbook, "Vendor_List.xlsx");
//   };

//   const columns = [
//     {
//       title: "Vendor ID",
//       dataIndex: "vendorId",
//       key: "vendorId",
//       sorter: (a, b) => a.vendorId.localeCompare(b.vendorId),
//     },
//     {
//       title: "Vendor Name",
//       dataIndex: "name",
//       key: "name",
//       sorter: (a, b) => a.name.localeCompare(b.name),
//       render: (text) => highlightText(text, searchText),
//     },
//     {
//       title: "Mobile No",
//       dataIndex: "mobile",
//       key: "mobile",
//       render: (text) => highlightText(text, searchText),
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Company Name",
//       dataIndex: "companyName",
//       key: "companyName",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status, record) => {
//         const isEditing = editingKey === record.key;
//         const statusColors = {
//           Pending: "#d63939",
//           Active: "#2fb344",
//           Inactive: "#d63939",
//         };

//         return isEditing ? (
//           <Space>
//             <Select
//               value={editingStatus}
//               onChange={(value) => setEditingStatus(value)}
//               style={{ width: 120 }}
//               options={[
//                 { label: "Pending", value: "Pending" },
//                 { label: "Active", value: "Active" },
//                 { label: "Inactive", value: "Inactive" },
//               ]}
//             />
//             <Tooltip title="Save">
//               <CheckOutlined
//                 style={{ color: "green", cursor: "pointer" }}
//                 onClick={() => {
//                   const updated = filteredData.map((item) =>
//                     item.key === record.key
//                       ? { ...item, status: editingStatus }
//                       : item
//                   );
//                   setFilteredData(updated);
//                   setEditingKey(null);
//                 }}
//               />
//             </Tooltip>
//             <Tooltip title="Cancel">
//               <CloseOutlined
//                 style={{ color: "gray", cursor: "pointer" }}
//                 onClick={() => setEditingKey(null)}
//               />
//             </Tooltip>
//           </Space>
//         ) : (
//           <Space>
//             <Tag
//               style={{
//                 backgroundColor: statusColors[status] || "#888",
//                 color: "#fff",
//                 border: "none",
//               }}
//             >
//               {status}
//             </Tag>
//             <Tooltip title="Edit Status">
//               <EditOutlined
//                 style={{ cursor: "pointer" }}
//                 onClick={() => {
//                   setEditingKey(record.key);
//                   setEditingStatus(status);
//                 }}
//               />
//             </Tooltip>
//           </Space>
//         );
//       },
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Link to={`/vendors/view/${record.vendorId}`}>
//           <Button type="link">
//             <span
//               style={{
//                 backgroundColor: "#F0720B",
//                 padding: "6px",
//                 borderRadius: "4px",
//                 display: "inline-flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <EyeOutlined style={{ color: "white" }} />
//             </span>
//           </Button>
//         </Link>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: "20px", background: "#fff", borderRadius: "10px" }}>
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "space-between",
//           alignItems: "center",
//           gap: "10px",
//           marginBottom: "16px",
//         }}
//       >
//         <span style={{ fontSize: 20, fontWeight: 600 }}>Vendor List</span>
//         <Space wrap>
//           <Input
//             placeholder="Search Name or Mobile"
//             onChange={(e) => handleSearch(e.target.value)}
//             value={searchText}
//             style={{ width: 200 }}
//             allowClear
//           />
//           <Select
//             placeholder="Filter by Status"
//             onChange={handleStatusChange}
//             value={statusFilter || undefined}
//             allowClear
//             style={{ width: 160 }}
//           >
//             <Option value="Active">Active</Option>
//             <Option value="Inactive">Inactive</Option>
//           </Select>
//           <Button icon={<ReloadOutlined />} onClick={handleReload}>
//             Reload
//           </Button>
//           <Button
//             icon={<FileExcelOutlined />}
//             type="primary"
//             style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
//             onClick={exportToExcel}
//           >
//             Export to Excel
//           </Button>
//         </Space>
//       </div>

//       <Table
//         columns={columns}
//         dataSource={filteredData}
//         scroll={{ x: "max-content" }}
//         pagination={{ pageSize: 10 }}
//         rowClassName={(_, index) =>
//           index % 2 === 0 ? "table-row-white" : "table-row-gray"
//         }
//       />
//     </div>
//   );
// };

// export default VendorTable;

import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Button,
  Input,
  Space,
  Select,
  Tooltip,
  message,
  Spin,
} from "antd";
import {
  EyeOutlined,
  ReloadOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

const { Option } = Select;

// Add trailing slash after API base URL to fix 404 error
const API_BASE_URL = "http://13.201.150.234/t2/api/";

// Replace with your actual token
const AUTH_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjE5ZjM0ZTliMmEwMzQ3MjFlOTQ0YTczZDI0YzFjZTlmMDQ0OTEyMDZkODA4MDQzNGZmY2I2OGJjM2VkZjExYjUzODUzNDRlZTQ4ODMwOTYiLCJpYXQiOjE3NTQ5MDQ0NDcuOTU3NjcyLCJuYmYiOjE3NTQ5MDQ0NDcuOTU3Njc2LCJleHAiOjE3ODY0NDA0NDcuOTQ4NjU2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.mSsd8LNCVa4aUWDz86bBsFt_yJO-KTy0Dvuo2xXS9NpVMXbaxeSyia65eYUiO0qKyh5zuzgTit7SVGbfUEv5bFo8OOB1ERBXnA5KygvmOK3I-XBw-V2NlXuOR5fQvwOJDjRtZwpafeXwyjuxkA4mhbRH5XwHZ6slXSvS3bcP2YabmIfiPkbRuC6ey7Vl6vxAEjmFMBn7yrKBD1GPA1gQKFYdQ2b5yykXejBVnToxBPEMvMxo_jOtfpOb2p2CYYWu911de88xVmtMsE3HQje9tjxRJHfC8PliE1GWC-FwKUdyol5LY9ZghMZHT7TJP5baZDgFreIwNOLZn_yJNKiBqe93ay8PYZ52nJxLCggmx94-LvzdFxmSeiP0eGTvQUSbSugp91jbkGYz2xLVlTKEWYunNlsZd64F3xdDxqk3wjoDampOAIqlinZDF1GLngyxsP3WS4P0kqQcplK5g5-csQp6ekSXRGQaO6Uyei_YgfhFu1V1JaXy1LAsQ6Aj7ZLaNm7BLYBWy3AFFQKUHCy8lIZmRE66EPtauG7hqEMy-bBnVoJeqRJjT3rtHbXje3ZXdP61ZeLn8XOTWBxB13kJeuCRvphc3nWV3ze1BmvLgLGbDam_2vtUi3aHiX0Q5pla2ToC2mtiqchJPPrhFJockoUQhETCpC8NOHdcI23SCtw";

const VendorTable = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editingStatus, setEditingStatus] = useState("");

const fetchVendors = async (filters = {}) => {
  setLoading(true);
  try {
    // Build query params string from filters
    const params = new URLSearchParams();
    if (filters.name) params.append("name", filters.name);
    if (filters.email) params.append("email", filters.email);
    if (filters.mobile) params.append("mobile", filters.mobile);
    if (filters.status) {
      // Your API probably expects numeric status codes
      const statusMap = { Active: "1", Inactive: "0", Pending: "0", Rejected: "3" };
      params.append("status", statusMap[filters.status] || "");
    }
    if (filters.search) params.append("search", filters.search);

    const url = `${API_BASE_URL}admin/vendortab/vendor?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });

    const result = await response.json();

    if (result.success) {
      const vendors = result.data.data.map((vendor) => ({
        key: vendor.vendor_id.toString(),
        vendorId: vendor.vendor_id.toString(),
        name: vendor.name || "",
        mobile: vendor.mobile || "",
        email: vendor.email || "",
        companyName:
          vendor.company && vendor.company.length > 0
            ? vendor.company[0].company_name
            : vendor.company_name || "",
        status:
          vendor.status_code === 1
            ? "Active"
            : vendor.status_code === 0
            ? "Pending"
            : vendor.status_code === 3
            ? "Rejected"
            : "Inactive",
        createdDate: vendor.registration_date
          ? vendor.registration_date.split("T")[0]
          : "",
        updatedDate: vendor.last_updated ? vendor.last_updated.split("T")[0] : "",
      }));

      setData(vendors);
      setFilteredData(vendors);
    } else {
      message.error("Failed to fetch vendors");
    }
  } catch (error) {
    console.error("Error fetching vendors:", error);
    message.error("Error fetching vendors");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchVendors();
  }, []);

  const applyFilters = (searchVal, statusVal) => {
    const filtered = data.filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        vendor.mobile?.includes(searchVal);

      const matchesStatus = statusVal ? vendor.status === statusVal : true;

      return matchesSearch && matchesStatus;
    });

    setFilteredData(filtered);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    applyFilters(value, statusFilter);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    applyFilters(searchText, value);
  };

  const handleReload = () => {
    setSearchText("");
    setStatusFilter("");
    fetchVendors();
  };

  const highlightText = (text, search) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const exportToExcel = () => {
    if (!filteredData.length) {
      message.info("No data to export");
      return;
    }

    const exportData = filteredData.map(
      ({
        vendorId,
        name,
        mobile,
        email,
        companyName,
        status,
        createdDate,
        updatedDate,
      }) => ({
        "Vendor ID": vendorId,
        Name: name,
        Mobile: mobile,
        Email: email,
        "Company Name": companyName,
        Status: status,
        "Created Date": createdDate,
        "Updated Date": updatedDate,
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vendors");
    XLSX.writeFile(workbook, "Vendor_List.xlsx");
  };

  const updateVendorStatus = async (vendorId, statusCode) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}admin/vendortab/vendor/${vendorId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
          body: JSON.stringify({ status: statusCode.toString() }),
        }
      );
      const result = await response.json();
      if (result.success) {
        message.success(result.message || "Vendor status updated");
        fetchVendors({ name: "", status: statusFilter, search: searchText });
      } else {
        message.error(result.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating vendor status:", error);
      message.error("Error updating vendor status");
    } finally {
      setEditingKey(null);
      setLoading(false);
    }
  };

  const statusTextToCode = {
    Pending: 0,
    Active: 1,
    Inactive: 0,
    Rejected: 3,
  };

  const columns = [
    {
      title: "Vendor ID",
      dataIndex: "vendorId",
      key: "vendorId",
      sorter: (a, b) => a.vendorId.localeCompare(b.vendorId),
      width: 100,
    },
    {
      title: "Vendor Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => highlightText(text, searchText),
      width: 180,
    },
    {
      title: "Mobile No",
      dataIndex: "mobile",
      key: "mobile",
      render: (text) => highlightText(text || "", searchText),
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 180,
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      width: 180,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status, record) => {
        const isEditing = editingKey === record.key;
        const statusColors = {
          Pending: "#d63939",
          Active: "#2fb344",
          Inactive: "#d63939",
          Rejected: "#888",
        };

        return isEditing ? (
          <Space>
            <Select
              value={editingStatus}
              onChange={(value) => setEditingStatus(value)}
              style={{ width: 120 }}
              options={[
                { label: "Pending", value: "Pending" },
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
                { label: "Rejected", value: "Rejected" },
              ]}
            />
            <Tooltip title="Save">
              <CheckOutlined
                style={{ color: "green", cursor: "pointer" }}
                onClick={() => {
                  updateVendorStatus(
                    record.vendorId,
                    statusTextToCode[editingStatus]
                  );
                }}
              />
            </Tooltip>
            <Tooltip title="Cancel">
              <CloseOutlined
                style={{ color: "gray", cursor: "pointer" }}
                onClick={() => setEditingKey(null)}
              />
            </Tooltip>
          </Space>
        ) : (
          <Space>
            <Tag
              style={{
                backgroundColor: statusColors[status] || "#888",
                color: "#fff",
                border: "none",
              }}
            >
              {status}
            </Tag>
            <Tooltip title="Edit Status">
              <EditOutlined
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setEditingKey(record.key);
                  setEditingStatus(status);
                }}
              />
            </Tooltip>
          </Space>
        );
      },
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 120,
    },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      key: "updatedDate",
      width: 120,
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_, record) => (
        <Link to={`/vendors/view/${record.vendorId}`}>
          <Button type="link">
            <span
              style={{
                backgroundColor: "#F0720B",
                padding: "6px",
                borderRadius: "4px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EyeOutlined style={{ color: "white" }} />
            </span>
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", background: "#fff", borderRadius: "10px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <span style={{ fontSize: 20, fontWeight: 600 }}>Vendor List</span>
        <Space wrap>
          <Input
            placeholder="Search Name or Mobile"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            style={{ width: 200 }}
            allowClear
          />
          <Select
            placeholder="Filter by Status"
            onChange={handleStatusChange}
            value={statusFilter || undefined}
            allowClear
            style={{ width: 160 }}
          >
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
            <Option value="Pending">Pending</Option>
            <Option value="Rejected">Rejected</Option>
          </Select>
          <Button icon={<ReloadOutlined />} onClick={handleReload}>
            Reload
          </Button>
          <Button
            icon={<FileExcelOutlined />}
            type="primary"
            style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
            onClick={exportToExcel}
          >
            Export to Excel
          </Button>
        </Space>
      </div>

      {loading ? (
        <Spin tip="Loading..." style={{ width: "100%" }} />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredData}
          scroll={{ x: "max-content" }}
          pagination={{ pageSize: 10 }}
          rowClassName={(_, index) =>
            index % 2 === 0 ? "table-row-white" : "table-row-gray"
          }
        />
      )}
    </div>
  );
};

export default VendorTable;
