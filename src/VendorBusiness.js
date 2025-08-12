
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Table,
//   Tag,
//   Input,
//   Button,
//   Card,
//   Typography,
//   Space,
//   Modal,
//   Row,
//   Col,
//   message,
//   Spin,
// } from "antd";
// import dayjs from "dayjs";
// import axios from "axios";
// import { EyeOutlined, FilterOutlined, ReloadOutlined } from "@ant-design/icons";

// const { Title } = Typography;

// const VendorBusiness = () => {
//   const [searchText, setSearchText] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filtersVisible, setFiltersVisible] = useState(false);
//   const [vendorIdFilter, setVendorIdFilter] = useState(""); // for filtering vendor_id
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const baseURL = process.env.REACT_APP_API_BASE_URL || "http://13.201.150.234/t2/api";

//   // Fetch vendor timings from API
//   const fetchVendorTimings = async (vendor_id = "") => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseURL}/admin/vendortab/listVendorTimings`, {
//         params: { vendor_id },
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (res.data.success) {
//         // Map API response data to table data format
//         const apiData = res.data.data.map((item, index) => ({
//           key: index + 1,
//           vendorId: item.vendor_id,
//           name: item.vendor_name,
//           mon: item.mon,
//           tue: item.tue,
//           wed: item.wed,
//           thu: item.thu,
//           fri: item.fri,
//           sat: item.sat,
//           sun: item.sun,
//           openTime: item.open_time,
//           closeTime: item.close_time,
//           status: item.status,
//           updatedDate: item.updated_at,
//         }));

//         setFilteredData(apiData);
//       } else {
//         message.error("Failed to fetch vendor timings.");
//       }
//     } catch (error) {
//       message.error("Error fetching vendor timings.");
//       console.error(error);
//     }
//     setLoading(false);
//   };

//   // Initial fetch (all vendors)
//   useEffect(() => {
//     fetchVendorTimings();
//   }, []);

//   // Apply filters handler (filter by vendor_id)
//   const applyFilters = () => {
//     fetchVendorTimings(vendorIdFilter);
//     setFiltersVisible(false);
//   };

//   const handleReload = () => {
//     setSearchText("");
//     setVendorIdFilter("");
//     fetchVendorTimings();
//   };

//   // Filter search by vendorId or name locally
//   const handleSearch = (value) => {
//     setSearchText(value);
//     const filtered = filteredData.filter(
//       (item) =>
//         item.vendorId.toString().toLowerCase().includes(value.toLowerCase()) ||
//         item.name.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   const columns = [
//     {
//       title: "Vendor ID",
//       dataIndex: "vendorId",
//       key: "vendorId",
//     },
//     {
//       title: "Vendor Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Mon",
//       dataIndex: "mon",
//       key: "mon",
//     },
//     {
//       title: "Tue",
//       dataIndex: "tue",
//       key: "tue",
//     },
//     {
//       title: "Wed",
//       dataIndex: "wed",
//       key: "wed",
//     },
//     {
//       title: "Thu",
//       dataIndex: "thu",
//       key: "thu",
//     },
//     {
//       title: "Fri",
//       dataIndex: "fri",
//       key: "fri",
//     },
//     {
//       title: "Sat",
//       dataIndex: "sat",
//       key: "sat",
//     },
//     {
//       title: "Sun",
//       dataIndex: "sun",
//       key: "sun",
//     },
//     {
//       title: "Open Time",
//       dataIndex: "openTime",
//       key: "openTime",
//     },
//     {
//       title: "Close Time",
//       dataIndex: "closeTime",
//       key: "closeTime",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => {
//         const color = status === "Active" ? "#2fb344" : "#d63939";
//         return <Tag color={color}>{status}</Tag>;
//       },
//     },
//     {
//       title: "Updated Date",
//       dataIndex: "updatedDate",
//       key: "updatedDate",
//       render: (date) => dayjs(date).format("DD-MM-YYYY hh:mm A"),
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Button
//           type="link"
//           onClick={() => navigate("/viewvendorbusiness", { state: { record } })}
//         >
//           <span
//             style={{
//               backgroundColor: "#F0720B",
//               padding: "6px",
//               borderRadius: "4px",
//               display: "inline-flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <EyeOutlined style={{ color: "white" }} />
//           </span>
//         </Button>
//       ),
//     },
//   ];

//   const filtersStyle = {
//     maxHeight: filtersVisible ? 80 : 0,
//     overflow: "hidden",
//     transition: "max-height 0.4s ease",
//     background: "#f9f9f9",
//     padding: filtersVisible ? "12px 16px" : "0 16px",
//     marginBottom: filtersVisible ? 16 : 0,
//     borderRadius: 4,
//   };

//   return (
//     <Space
//       direction="vertical"
//       size="large"
//       style={{ width: "100%", padding: "0", borderRadius: "10px" }}
//     >
//       <Card
//         title={
//           <Row
//             gutter={[12, 12]}
//             align="middle"
//             justify="space-between"
//             style={{ rowGap: 16 }}
//           >
//             <Col xs={24} md={12}>
//               <Title level={5} style={{ margin: 0 }}>
//                 Vendor Business Categories
//               </Title>
//             </Col>
//             <Col
//               xs={24}
//               md={12}
//               style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
//             >
//               <Button
//                 icon={<FilterOutlined />}
//                 onClick={() => setFiltersVisible(!filtersVisible)}
//               >
//                 Filters
//               </Button>
//               <Input
//                 placeholder="Search Vendor ID or Name"
//                 onChange={(e) => handleSearch(e.target.value)}
//                 value={searchText}
//                 allowClear
//                 style={{ maxWidth: 240 }}
//               />
//               <Button icon={<ReloadOutlined />} onClick={handleReload}>
//                 Reload
//               </Button>
//             </Col>
//           </Row>
//         }
//         bordered
//         style={{ borderRadius: 12 }}
//         bodyStyle={{ paddingTop: 16 }}
//         headStyle={{ marginBottom: 0, paddingBottom: 8, paddingTop: 16, borderBottom: "none" }}
//       >
//         {filtersVisible && (
//           <div style={filtersStyle}>
//             <Row gutter={[16, 16]}>
//               <Col xs={24} sm={12} md={8}>
//                 <Input
//                   placeholder="Vendor ID"
//                   value={vendorIdFilter}
//                   onChange={(e) => setVendorIdFilter(e.target.value)}
//                   allowClear
//                 />
//               </Col>
//               <Col xs={24} sm={12} md={8} style={{ display: "flex", gap: 8 }}>
//                 <Button type="primary" onClick={applyFilters}>
//                   Apply Filters
//                 </Button>
//                 <Button onClick={handleReload}>Reset</Button>
//               </Col>
//             </Row>
//           </div>
//         )}

//         {loading ? (
//           <div style={{ textAlign: "center", padding: 20 }}>
//             <Spin size="large" />
//           </div>
//         ) : (
//           <Table
//             dataSource={filteredData}
//             columns={columns}
//             pagination={{ pageSize: 5 }}
//             rowClassName={(_, index) =>
//               index % 2 === 0 ? "table-row-white" : "table-row-gray"
//             }
//             style={{ border: "none" }}
//             scroll={{ x: "max-content" }}
//           />
//         )}
//       </Card>
//     </Space>
//   );
// };

// export default VendorBusiness;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Tag,
  Input,
  Button,
  Card,
  Typography,
  Space,
  Row,
  Col,
  message,
  Spin,
} from "antd";
import dayjs from "dayjs";
import axios from "axios";
import { EyeOutlined, FilterOutlined, ReloadOutlined } from "@ant-design/icons";

const { Title } = Typography;

const VendorBusiness = () => {
  const [searchText, setSearchText] = useState("");
  const [vendorIdFilter, setVendorIdFilter] = useState(""); // For API filter param
  const [data, setData] = useState([]); // Holds the original fetched data
  const [filteredData, setFilteredData] = useState([]); // Holds filtered/search results
  const [loading, setLoading] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const baseURL = process.env.REACT_APP_API_BASE_URL || "http://13.201.150.234/t2/api";

  // Fetch vendor timings from API
  const fetchVendorTimings = async (vendor_id = "") => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseURL}/admin/vendortab/listVendorTimings`, {
        params: { vendor_id },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        const apiData = res.data.data.map((item, index) => ({
          key: index + 1,
          vendorId: item.vendor_id.toString(),
          name: item.vendor_name,
          mon: item.mon,
          tue: item.tue,
          wed: item.wed,
          thu: item.thu,
          fri: item.fri,
          sat: item.sat,
          sun: item.sun,
          openTime: item.open_time,
          closeTime: item.close_time,
          status: item.status,
          updatedDate: item.updated_at,
        }));
        setData(apiData);
        setFilteredData(apiData); // Reset filtered data on fresh fetch
      } else {
        message.error("Failed to fetch vendor timings.");
        setData([]);
        setFilteredData([]);
      }
    } catch (error) {
      message.error("Error fetching vendor timings.");
      console.error(error);
      setData([]);
      setFilteredData([]);
    }
    setLoading(false);
  };

  // Initial fetch (all vendors)
  useEffect(() => {
    fetchVendorTimings();
  }, []);

  // Apply filters - calls API with vendor_id filter
  const applyFilters = () => {
    fetchVendorTimings(vendorIdFilter.trim());
    setFiltersVisible(false);
    setSearchText("");
  };

  // Reset filters and reload data
  const handleReload = () => {
    setSearchText("");
    setVendorIdFilter("");
    fetchVendorTimings();
  };

  // Local search on currently filtered data (by vendorId or name)
  const handleSearch = (value) => {
    setSearchText(value);
    if (!value) {
      setFilteredData(data);
      return;
    }
    const filtered = data.filter(
      (item) =>
        item.vendorId.toLowerCase().includes(value.toLowerCase()) ||
        item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const columns = [
    { title: "Vendor ID", dataIndex: "vendorId", key: "vendorId" },
    { title: "Vendor Name", dataIndex: "name", key: "name" },
    { title: "Mon", dataIndex: "mon", key: "mon" },
    { title: "Tue", dataIndex: "tue", key: "tue" },
    { title: "Wed", dataIndex: "wed", key: "wed" },
    { title: "Thu", dataIndex: "thu", key: "thu" },
    { title: "Fri", dataIndex: "fri", key: "fri" },
    { title: "Sat", dataIndex: "sat", key: "sat" },
    { title: "Sun", dataIndex: "sun", key: "sun" },
    { title: "Open Time", dataIndex: "openTime", key: "openTime" },
    { title: "Close Time", dataIndex: "closeTime", key: "closeTime" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Active" ? "#2fb344" : "#d63939";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      key: "updatedDate",
      render: (date) => dayjs(date).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => navigate("/viewvendorbusiness", { state: { record } })}
        >
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
      ),
    },
  ];

  const filtersStyle = {
    maxHeight: filtersVisible ? 80 : 0,
    overflow: "hidden",
    transition: "max-height 0.4s ease",
    background: "#f9f9f9",
    padding: filtersVisible ? "12px 16px" : "0 16px",
    marginBottom: filtersVisible ? 16 : 0,
    borderRadius: 4,
  };

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", padding: 0, borderRadius: "10px" }}
    >
      <Card
        title={
          <Row
            gutter={[12, 12]}
            align="middle"
            justify="space-between"
            style={{ rowGap: 16 }}
          >
            <Col xs={24} md={12}>
              <Title level={5} style={{ margin: 0 }}>
                Vendor Business Categories
              </Title>
            </Col>
            <Col
              xs={24}
              md={12}
              style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
            >
              <Button
                icon={<FilterOutlined />}
                onClick={() => setFiltersVisible(!filtersVisible)}
              >
                Filters
              </Button>
              <Input
                placeholder="Search Vendor ID or Name"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchText}
                allowClear
                style={{ maxWidth: 240 }}
              />
              <Button icon={<ReloadOutlined />} onClick={handleReload}>
                Reload
              </Button>
            </Col>
          </Row>
        }
        bordered
        style={{ borderRadius: 12 }}
        bodyStyle={{ paddingTop: 16 }}
        headStyle={{
          marginBottom: 0,
          paddingBottom: 8,
          paddingTop: 16,
          borderBottom: "none",
        }}
      >
        {filtersVisible && (
          <div style={filtersStyle}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8}>
                <Input
                  placeholder="Vendor ID"
                  value={vendorIdFilter}
                  onChange={(e) => setVendorIdFilter(e.target.value)}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={12} md={8} style={{ display: "flex", gap: 8 }}>
                <Button type="primary" onClick={applyFilters}>
                  Apply Filters
                </Button>
                <Button onClick={handleReload}>Reset</Button>
              </Col>
            </Row>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: 20 }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={filteredData}
            columns={columns}
            pagination={{ pageSize: 5 }}
            rowClassName={(_, index) =>
              index % 2 === 0 ? "table-row-white" : "table-row-gray"
            }
            style={{ border: "none" }}
            scroll={{ x: "max-content" }}
          />
        )}
      </Card>
    </Space>
  );
};

export default VendorBusiness;
