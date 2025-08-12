
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Table,
//   Tag,
//   Input,
//   Button,
//   Card,
//   Typography,
//   Space,
//   Select,
//   Modal,
//   Row,
//   Col,
//   Tooltip,
//   DatePicker,
// } from "antd";
// import dayjs from "dayjs";
// import { ReloadOutlined, EyeOutlined, CloseOutlined,CheckOutlined,EditOutlined, FilterOutlined, FileExcelOutlined } from "@ant-design/icons";
// import * as XLSX from "xlsx"; 
// const { Title } = Typography;
// const { Option } = Select;
// const { RangePicker } = DatePicker;

// const dataSource = [
//   {
//     key: 1,
//     vendorId: "VND001",
//     name:"Rahul",
//     company:"Tech Innovations",
//     addressType: "Head Office",
//     stateName: "Maharashtra",
//     pinCode: "2345678",
//     cityName: "Mumbai",
//     geoLocation: "19.0760° N, 72.8777° E",
//     addressText: "123 Marine Drive, Mumbai",
//     pinCode: "400020",
//     status: "Pending",
//     createdDate: "2024-07-01T10:00:00",
//     updatedDate: "2024-07-20T12:30:00",
//     updatedBy: "admin001",
//   },
//   {
//     key: 2,
//     vendorId: "VND001",
//     name:"Rohit",
//     company:"Tech Solutions",
//     addressType: "Branch",
//     stateName: "Delhi",
//     pinCode: "345678",
//     cityName: "New Delhi",
//     geoLocation: "28.6139° N, 77.2090° E",
//     addressText: "Connaught Place, Delhi",
//     pinCode: "110001",
//     status: "Pending",
//     createdDate: "2024-06-15T09:20:00",
//     updatedDate: "2024-07-15T15:45:00",
//     updatedBy: "admin002",
//   },
// ];

// const VendorAddress = () => {
//   const [searchText, setSearchText] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [filteredData, setFilteredData] = useState(dataSource);
//   const [filtersVisible, setFiltersVisible] = useState(false);
//   const [dateRangeFilter, setDateRangeFilter] = useState(null);
//   const [stateFilter, setStateFilter] = useState("");
//   const [cityFilter, setCityFilter] = useState("");
//    const [editingKey, setEditingKey] = useState(null);
//         const [editingStatus, setEditingStatus] = useState("");
//          const [statusDropdownFilter, setStatusDropdownFilter] = useState("");
  
//   const navigate = useNavigate();
//   const [viewModalVisible, setViewModalVisible] = useState(false);
//  const [selectedRecord, setSelectedRecord] = useState(null);
//  const showViewModal = (record) => {
//    setSelectedRecord(record);
//    setViewModalVisible(true);
//  };
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
//     setStateFilter("");
//     setCityFilter("");
//     setFilteredData(dataSource);
//   };
  
//     const exportToExcel = () => {
//       const worksheet = XLSX.utils.json_to_sheet(dataSource);
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Vendor Address");
//       XLSX.writeFile(workbook, "Vendor_Address.xlsx");
//     };

//  const applyFilters = () => {
//      let filtered = [...dataSource];
 
//      if (stateFilter) {
//        filtered = filtered.filter((user) =>
//          user.state.toLowerCase().includes(stateFilter.toLowerCase())
//        );
//      }
    
//      if (cityFilter) {
//        filtered = filtered.filter(
//          (user) => user.plants[0]?.type === cityFilter
//        );
//      }
    
//      if (dateRangeFilter && dateRangeFilter.length === 2) {
//        const [start, end] = dateRangeFilter;
//        filtered = filtered.filter((user) => {
//          const creationDate = dayjs(user.creationDate);
//          return (
//            creationDate.isSameOrAfter(start, "day") &&
//            creationDate.isSameOrBefore(end, "day")
//          );
//        });
//      }
 
//      setFilteredData(filtered);
//      setFiltersVisible(false);
//    };

//    const filtersStyle = {
//     maxHeight: filtersVisible ? 240 : 0,
//     overflow: "hidden",
//     transition: "max-height 0.4s ease",
//     background: "#f9f9f9",
//     padding: filtersVisible ? "16px" : "0 16px",
//     marginBottom: filtersVisible ? 16 : 0,
//     borderRadius: 4,
//   };

//    const columns = [
//   {
//     title: "Vendor ID",
//     dataIndex: "vendorId",
//     key: "vendorId",
//   },
//   {
//     title: "Vendor Name",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "Company Name",
//     dataIndex: "company",
//     key: "company",
//   },
//   {
//     title: "Address Type",
//     dataIndex: "addressType",
//     key: "addressType",
//   },
//   {
//     title: "Geo Location",
//     dataIndex: "geoLocation",
//     key: "geoLocation",
//   },
//   {
//     title: "State Name",
//     dataIndex: "stateName",
//     key: "stateName",
//   },
//   {
//     title: "City Name",
//     dataIndex: "cityName",
//     key: "cityName",
//   },
//   {
//     title: "Pin Code",
//     dataIndex: "pinCode",
//     key: "pinCode",
//   },
//     {
//                title: "Status",
//                dataIndex: "status",
//                key: "status",
//                render: (status, record) => {
//                  const isEditing = editingKey === record.key;
//                  const statusColors = {
//                   Pending:"#d63939",
//                    Active: "#2fb344",
//                    Inactive: "#d63939",
                  
//                  };
         
//                  return isEditing ? (
//                    <Space>
//                      <Select
//                        value={editingStatus}
//                        onChange={(value) => setEditingStatus(value)}
//                        style={{ width: 120 }}
//                        options={[
//                         { label: "Pending", value: "Pending" },
//                          { label: "Active", value: "Active" },
//                          { label: "Inactive", value: "Inactive" },
                         
//                        ]}
//                      />
//                      <Tooltip title="Save">
//                        <CheckOutlined
//                          style={{ color: "green", cursor: "pointer" }}
//                          onClick={() => {
//                         const updated = filteredData.map((item) =>
//       item.key === record.key
//         ? { ...item, status: editingStatus }
      
//           : item
//       );
//       setFilteredData(updated);
//       setEditingKey(null);
      
      
                          
//                          }}
//                        />
//                      </Tooltip>
//                      <Tooltip title="Cancel">
//                        <CloseOutlined
//                          style={{ color: "gray", cursor: "pointer" }}
//                          onClick={() => setEditingKey(null)}
//                        />
//                      </Tooltip>
//                    </Space>
//                  ) : (
//                    <Space>
//                      <Tag
//                        style={{
//                          backgroundColor: statusColors[status] || "#888",
//                          color: "#fff",
//                          border: "none",
//                        }}
//                      >
//                        {status}
//                      </Tag>
//                      <Tooltip title="Edit Status">
//                        <EditOutlined
//                          style={{ cursor: "pointer" }}
//                          onClick={() => {
//                            setEditingKey(record.key);
//                            setEditingStatus(status);
//                          }}
//                        />
//                      </Tooltip>
//                    </Space>
//                  );
//                },
//              },
//   {
//     title: "Action",
//     key: "action",
//     render: (_, record) => (
//       <Button type="link" onClick={() => navigate("/viewvendoraddress", { state: { record } })}>
//         <span
//           style={{
//             backgroundColor: "#F0720B",
//             padding: "6px",
//             borderRadius: "4px",
//             display: "inline-flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <EyeOutlined style={{ color: "white" }} />
//         </span>
//       </Button>
//     ),
//   },
// ];


//   return (
//     <Space direction="vertical" size="large" style={{ width: "100%", padding: "0px", borderRadius: "10px" }}>
//       <Card
//         title={
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
//             <span style={{ fontSize: 20, fontWeight: 600 }}>Vendor Address</span>
//             <Space wrap>
//               <Input
//                 placeholder="Search Vendor ID or City"
//                 onChange={(e) => handleSearch(e.target.value)}
//                 value={searchText}
//                 allowClear
//                 style={{ width: 200 }}
//               />
//               <Button
//                          icon={<FilterOutlined />}
//                          onClick={() => setFiltersVisible(!filtersVisible)}
//                        >
//                          Filters
//                        </Button>
//               <Button icon={<ReloadOutlined />} onClick={handleReload}>
//                 Reload
//               </Button>
//                <Button
//                                 icon={<FileExcelOutlined />}
//                                 type="primary"
//                                 style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
//                                 onClick={exportToExcel}
//                               >
//                                 Export to Excel
//                               </Button>
//             </Space>
//           </div>
//         }
//         bordered
//         style={{ borderRadius: 12 }}
//         bodyStyle={{ paddingTop: 16 }}
//         headStyle={{ marginBottom: 0, paddingBottom: 8, paddingTop: 16, borderBottom: "none" }}
//       >
//           {/* Filters slide down panel */}
//               <div style={filtersStyle}>
//             <Row gutter={[16, 16]}>
//   <Col xs={24} sm={12} md={6}>
//     <Input
//       placeholder="State"
//       value={stateFilter || undefined}
//       onChange={(e) => setStateFilter(e.target.value)}
//       allowClear
//       style={{ width: "100%" }}
//     />
//   </Col>
//   <Col xs={24} sm={12} md={6}>
//     <Input
//       placeholder="City"
//       value={cityFilter || undefined}
//       onChange={(e) => setCityFilter(e.target.value)}
//       allowClear
//       style={{ width: "100%" }}
//     />
//   </Col>
//   <Col xs={24} sm={12} md={6}>
//     <RangePicker
//       style={{ width: "100%" }}
//       value={dateRangeFilter}
//       onChange={(dates) => setDateRangeFilter(dates)}
//       allowClear
//     />
//   </Col>
//   <Col xs={24} sm={12} md={6}>
//     <Select
//       placeholder="Status"
//       value={statusDropdownFilter || undefined}
//       onChange={(val) => setStatusDropdownFilter(val)}
//       allowClear
//       style={{ width: "100%" }}
//     >
//       <Option value="Pending">Pending</Option>
//       <Option value="Active">Active</Option>
//       <Option value="Inactive">Inactive</Option>
//     </Select>
//   </Col>
// </Row>

//                 {/* Apply Button */}
//                 <Row style={{ marginTop: 16 }}>
//                   <Col span={24} style={{ textAlign: "right" }}>
//                     <Button type="primary" onClick={applyFilters}>
//                       Apply Filters
//                     </Button>
//                   </Col>
//                 </Row>
//               </div>
//         <Table
//           dataSource={filteredData}
//           columns={columns}
//           pagination={{ pageSize: 5 }}
//           scroll={{ x: "max-content" }} 
//           rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")}
//           style={{ border: "none" }}
//         />
//          <Modal
//           title="Vendor Address"
//           open={viewModalVisible}
//           onCancel={() => setViewModalVisible(false)}
//           footer={null}
//         >
//           {selectedRecord && (
//             <Space direction="vertical" size="middle" style={{ marginTop: 12 }}>
//               <div>
//                 <strong>Created Date:</strong>{" "}
//                 {dayjs(selectedRecord.createdDate).format("DD-MM-YYYY HH:mm")}
//               </div>
//               <div>
//                 <strong>Updated By:</strong> {selectedRecord.updatedBy}
//               </div>
//             </Space>
//           )}
//         </Modal>
        
//       </Card>
//     </Space>
//   );
// };

// export default VendorAddress;

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
  Select,
  Modal,
  Row,
  Col,
  Tooltip,
  DatePicker,
  message,
  Spin,
} from "antd";
import dayjs from "dayjs";
import {
  ReloadOutlined,
  EyeOutlined,
  CloseOutlined,
  CheckOutlined,
  EditOutlined,
  FilterOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const VendorAddress = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState(null);
  const [statusDropdownFilter, setStatusDropdownFilter] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editingStatus, setEditingStatus] = useState("");
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const baseURL = process.env.REACT_APP_API_BASE_URL || "http://13.201.150.234/t2/api";
const buildParams = (filters) => {
  const params = {};
  if (filters.status) params.status = filters.status;
  if (filters.search) params.search = filters.search;
  if (filters.vendor_name) params.vendor_name = filters.vendor_name;
  if (filters.state) params.state = filters.state;
  if (filters.city) params.city = filters.city;
  if (filters.company_id) params.company_id = filters.company_id;
  if (filters.vendor_id) params.vendor_id = filters.vendor_id;
  return params;
};

// usage
const params = buildParams({
  status: statusDropdownFilter,
  search: searchText,
  vendor_name: "",       // or set if available
  state: stateFilter,
  city: cityFilter,
  company_id: "",        // or set if available
  vendor_id: "1",
});

  // Fetch vendor addresses from API
  const fetchVendorAddresses = async (filters = {}) => {
    setLoading(true);
    try {
      const params = {
        status: filters.status || "",
        search: filters.search || "",
        vendor_name: filters.vendor_name || "",
        state: filters.state || "",
        city: filters.city || "",
        company_id: filters.company_id || "",
        vendor_id: filters.vendor_id || "1", // default vendor_id 1, adjust if needed
      };

      const res = await axios.get(`${baseURL}/admin/vendortab/alladdresses`, {
  params: {
    status: filters.status || "",
    search: filters.search || "",
    vendor_name: filters.vendor_name || "",
    state: filters.state || "",
    city: filters.city || "",
    company_id: filters.company_id || "",
    vendor_id: filters.vendor_id || "1",
  },
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

      if (res.data.success) {
        // Map API response to your table format
        const apiData = res.data.data.map((item, index) => ({
          key: item.id,
          vendorId: item.vendor_company_id, // or item.vendor_id if available
          name: item.vendor_company?.company_name || "N/A",
          company: item.vendor_company?.company_name || "N/A",
          addressType: item.address_type || "",
          stateName: item.state || "",
          cityName: item.city || "",
          pinCode: item.zip_code || "",
          geoLocation: `${item.latitude}°, ${item.longitude}°`,
          addressText: `${item.address_line_1}, ${item.address_line_2}`,
          status: item.status === 1 ? "Active" : item.status === 0 ? "Inactive" : "Rejected",
          createdDate: item.created_at,
          updatedDate: item.updated_at,
          updatedBy: "-", // not available in response, update if you have
        }));

        setFilteredData(apiData);
      } else {
        message.error("Failed to fetch vendor addresses.");
      }
    } catch (error) {
      message.error("Error fetching vendor addresses.");
      console.error(error);
    }
    setLoading(false);
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchVendorAddresses();
  }, []);

  // Apply filters handler
  const applyFilters = () => {
    fetchVendorAddresses({
      status: statusDropdownFilter,
      search: searchText,
      state: stateFilter,
      city: cityFilter,
      // Add company_id or vendor_name filters if you want here
    });
    setFiltersVisible(false);
  };

  // Reload handler - clear filters and fetch again
  const handleReload = () => {
    setSearchText("");
    setStatusDropdownFilter("");
    setStateFilter("");
    setCityFilter("");
    setDateRangeFilter(null);
    fetchVendorAddresses();
  };

  // Export current filtered data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vendor Address");
    XLSX.writeFile(workbook, "Vendor_Address.xlsx");
  };

  const filtersStyle = {
    maxHeight: filtersVisible ? 240 : 0,
    overflow: "hidden",
    transition: "max-height 0.4s ease",
    background: "#f9f9f9",
    padding: filtersVisible ? "16px" : "0 16px",
    marginBottom: filtersVisible ? 16 : 0,
    borderRadius: 4,
  };

  const columns = [
    {
      title: "Vendor ID",
      dataIndex: "vendorId",
      key: "vendorId",
    },
    {
      title: "Vendor Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Company Name",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Address Type",
      dataIndex: "addressType",
      key: "addressType",
    },
    {
      title: "Geo Location",
      dataIndex: "geoLocation",
      key: "geoLocation",
    },
    {
      title: "State Name",
      dataIndex: "stateName",
      key: "stateName",
    },
    {
      title: "City Name",
      dataIndex: "cityName",
      key: "cityName",
    },
    {
      title: "Pin Code",
      dataIndex: "pinCode",
      key: "pinCode",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
                  // Update status locally (you should call an API here to save)
                  const updated = filteredData.map((item) =>
                    item.key === record.key ? { ...item, status: editingStatus } : item
                  );
                  setFilteredData(updated);
                  setEditingKey(null);
                  message.success("Status updated locally. Implement API update.");
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => navigate("/viewvendoraddress", { state: { record } })}
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

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", padding: "0px", borderRadius: "10px" }}
    >
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 600 }}>Vendor Address</span>
            <Space wrap>
              <Input
                placeholder="Search Vendor ID or City"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                allowClear
                style={{ width: 200 }}
              />
              <Button
                icon={<FilterOutlined />}
                onClick={() => setFiltersVisible(!filtersVisible)}
              >
                Filters
              </Button>
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
              <Button type="primary" onClick={applyFilters}>
                Apply Filters
              </Button>
            </Space>
          </div>
        }
        bordered
        style={{ borderRadius: 12 }}
        bodyStyle={{ paddingTop: 16 }}
        headStyle={{ marginBottom: 0, paddingBottom: 8, paddingTop: 16, borderBottom: "none" }}
      >
        {/* Filters slide down panel */}
        <div style={filtersStyle}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Input
                placeholder="State"
                value={stateFilter || undefined}
                onChange={(e) => setStateFilter(e.target.value)}
                allowClear
                style={{ width: "100%" }}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Input
                placeholder="City"
                value={cityFilter || undefined}
                onChange={(e) => setCityFilter(e.target.value)}
                allowClear
                style={{ width: "100%" }}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <RangePicker
                style={{ width: "100%" }}
                value={dateRangeFilter}
                onChange={(dates) => setDateRangeFilter(dates)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="Status"
                value={statusDropdownFilter || undefined}
                onChange={(val) => setStatusDropdownFilter(val)}
                allowClear
                style={{ width: "100%" }}
              >
                <Option value="1">Active</Option>
                <Option value="0">Inactive</Option>
                <Option value="3">Rejected</Option>
              </Select>
            </Col>
          </Row>
        </div>
        {loading ? (
          <div style={{ textAlign: "center", padding: 20 }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={filteredData}
            columns={columns}
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
            rowClassName={(_, index) =>
              index % 2 === 0 ? "table-row-white" : "table-row-gray"
            }
            style={{ border: "none" }}
          />
        )}
        <Modal
          title="Vendor Address"
          open={viewModalVisible}
          onCancel={() => setViewModalVisible(false)}
          footer={null}
        >
          {selectedRecord && (
            <Space direction="vertical" size="middle" style={{ marginTop: 12 }}>
              <div>
                <strong>Created Date:</strong>{" "}
                {dayjs(selectedRecord.createdDate).format("DD-MM-YYYY HH:mm")}
              </div>
              <div>
                <strong>Updated By:</strong> {selectedRecord.updatedBy}
              </div>
            </Space>
          )}
        </Modal>
      </Card>
    </Space>
  );
};

export default VendorAddress;
