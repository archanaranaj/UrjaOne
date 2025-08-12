

// import React, { useState } from "react";
// import {
//   Table,
//   Input,
//   Button,
//   Card,
//   Typography,
//   Space,
//   Row,
//   Col,
//   DatePicker,
//   Select,
//   Form,
//   Modal,
// } from "antd";
// import { ReloadOutlined, EyeOutlined, FilterOutlined, EditOutlined, FileExcelOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import dayjs from "dayjs";
// import { Option } from "antd/es/mentions";
// import * as XLSX from "xlsx"; // <-- Import XLSX
// const { Title } = Typography;

// const initialData = [
//   {
//     key: 1,
//     name:"Chanchal",
//     companyName: "SolarEdge Ltd.",
//     companyType: "Private",
//     employees: 250,
//     website: "https://solaredge.com",
//     established: 2010,
//     turnover: "5M USD",
//     altEmail: "info@solaredge.com",
//     altMobile: "+91 9876543210",
//     logo: "story.png",
//     banner: "story.png",
//   },
//   {
//     key: 2,
//     name:"Krish",
//     companyName: "GreenPower Inc.",
//     companyType: "Public",
//     employees: 1500,
//     website: "https://greenpower.com",
//     established: 2005,
//     turnover: "50M USD",
//     altEmail: "support@greenpower.com",
//     altMobile: "+91 9123456780",
//     logo: "story.png",
//     banner: "story.png",
//   },
// ];

// const VendorCompany = () => {
//   const [searchText, setSearchText] = useState("");
//   const [filteredData, setFilteredData] = useState(initialData);
//    const [filtersVisible, setFiltersVisible] = useState(false);
//    const [companyTypeFilter, setCompanyTypeFilter] = useState("");
//      const [turnoverFilter, setTurnoverFilter] = useState("");
//       const [statusDropdownFilter, setStatusDropdownFilter] = useState("");
//        const [dateRangeFilter, setDateRangeFilter] = useState([]);
//        const [isEditModalVisible, setIsEditModalVisible] = useState(false);
// const [editingRecord, setEditingRecord] = useState(null);
// const [form] = Form.useForm();

// const navigate =useNavigate();
//  const { RangePicker } = DatePicker;
//   const handleSearch = (value) => {
//     setSearchText(value);
//     const filtered = initialData.filter((item) =>
//       item.companyName.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };
// const applyFilters = () => {
//   let filtered = [...initialData];

  

//   if (turnoverFilter) {
//     filtered = filtered.filter(user =>
//       user.turnover.toLowerCase().includes(turnoverFilter.toLowerCase())
//     );
//   }

//   if (companyTypeFilter) {
//     filtered = filtered.filter(user =>
//       user.companyType.toLowerCase().includes(companyTypeFilter.toLowerCase())
//     );
//   }

//   if (dateRangeFilter?.length === 2) {
//     const [start, end] = dateRangeFilter;
//     filtered = filtered.filter(user => {
//       const userDate = dayjs(user.createdDate);
//       return userDate.isAfter(start.startOf("day")) && userDate.isBefore(end.endOf("day"));
//     });
//   }

//   if (statusDropdownFilter) {
//     filtered = filtered.filter(user =>
//       user.status.toLowerCase() === statusDropdownFilter.toLowerCase()
//     );
//   }

//   setFilteredData(filtered);
//   setFiltersVisible(false); // Hide filter panel
// };
// const filtersStyle = {
//   maxHeight: filtersVisible ? 240 : 0,
//   overflow: "hidden",
//   transition: "max-height 0.4s ease",
//   background: "#f9f9f9",
//   padding: filtersVisible ? "16px" : "0 16px",
//   marginBottom: filtersVisible ? 16 : 0,
//   borderRadius: 4,
// };
//   const handleReload = () => {
//     setSearchText("");
//     setTurnoverFilter("");
//     setCompanyTypeFilter("");
//     setStatusDropdownFilter("");
//     setDateRangeFilter([]);
//     setFilteredData(initialData);
//   };
// const handleEdit = (record) => {
//   setEditingRecord(record);
//   form.setFieldsValue(record); // Fill form with existing data
//   setIsEditModalVisible(true);
// };
// const handleUpdate = () => {
//   form.validateFields().then(values => {
//     const updatedData = filteredData.map(item =>
//       item.key === editingRecord.key ? { ...item, ...values } : item
//     );
//     setFilteredData(updatedData);
//     setIsEditModalVisible(false);
//   });
// };

//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(initialData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Vendor Company List");
//     XLSX.writeFile(workbook, "Vendor_Company.xlsx");
//   };

//   const columns = [
//      {
//       title: "Vendor Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Company Name",
//       dataIndex: "companyName",
//       key: "companyName",
//       responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
//     },
//     {
//       title: "Type",
//       dataIndex: "companyType",
//       key: "companyType",
//       responsive: ['md', 'lg', 'xl'],
//     },
//     {
//       title: "Employees",
//       dataIndex: "employees",
//       key: "employees",
//       responsive: ['lg', 'xl'],
//     },
//     {
//       title: "Website",
//       dataIndex: "website",
//       key: "website",
//       responsive: ['md', 'lg', 'xl'],
//       render: (url) => (
//         <a href={url} target="_blank" rel="noopener noreferrer">
//           {url}
//         </a>
//       ),
//     },
//     {
//       title: "Established",
//       dataIndex: "established",
//       key: "established",
//       responsive: ['lg', 'xl'],
//     },
//     {
//       title: "Turnover",
//       dataIndex: "turnover",
//       key: "turnover",
//       responsive: ['lg', 'xl'],
//     },
//     {
//       title: "Alt. Email",
//       dataIndex: "altEmail",
//       key: "altEmail",
//       responsive: ['xl'],
//     },
//     {
//       title: "Alt. Mobile",
//       dataIndex: "altMobile",
//       key: "altMobile",
//       responsive: ['xl'],
//     },
//      {
//       title: "Company Logo",
//       dataIndex: "logo",
//       key: "logo",
//       responsive: ['md', 'lg', 'xl'],
//       render: (img) => (
//         <img
//           src={`/${img}`}
//           alt="logo"
//           style={{
//             width: 80,
//             height: 50,
//             objectFit: "contain",
//             borderRadius: 4,
//           }}
//         />
//       ),
//     },
//     {
//       title: "Company Banner",
//       dataIndex: "banner",
//       key: "banner",
//       responsive: ['md', 'lg', 'xl'],
//       render: (img) => (
//         <img
//           src={`/${img}`}
//           alt="banner"
//           style={{
//             width: 80,
//             height: 50,
//             objectFit: "contain",
//             borderRadius: 4,
//           }}
//         />
//       ),
//     },
//    {
//   title: "Action",
//   key: "action",
//   render: (_, record) => (
//     <Space>
//       <Button
//         icon={<EyeOutlined />}
//         onClick={() => navigate("/viewvendorcompany", { state: { record } })}
//         style={{
//           backgroundColor: "#F0720B",
//           borderColor: "#F0720B",
//           color: "#fff",
//         }}
//       />
//       <Button
//         icon={<EditOutlined />}
//         onClick={() => handleEdit(record)}
//         style={{
//           backgroundColor: "#1890ff",
//           borderColor: "#1890ff",
//           color: "#fff",
//         }}
//       />
      
//     </Space>
//   ),
// }

//   ];

//   return (
//     <Space
//       direction="vertical"
//       size="large"
//       style={{ width: "100%", padding: "2px 2px" }}
//     >
       
//       <Card
//         bordered
//         style={{ borderRadius: 12 }}
//         bodyStyle={{ paddingTop: 16 }}
//         headStyle={{
//           marginBottom: 0,
//           paddingBottom: 8,
//           paddingTop: 16,
//           borderBottom: "none",
//         }}
//         title={
//           <Row
//             gutter={[12, 12]}
//             align="middle"
//             justify="space-between"
//             style={{ rowGap: 16 }}
//           >
//             <Col xs={24} md={12}>
//               <Title level={5} style={{ margin: 0 }}>
//                 Vendor Company Info
//               </Title>
//             </Col>
//             <Col
//               xs={24}
//               md={12}
//               style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
//             >
//               <Button icon={<FilterOutlined />} onClick={() => setFiltersVisible(!filtersVisible)}>
//                       Filters
//                     </Button>
//               <Input
//                 placeholder="Search Company Name"
//                 onChange={(e) => handleSearch(e.target.value)}
//                 value={searchText}
//                 allowClear
//                 style={{ maxWidth: 240 }}
//               />
//               <Button icon={<ReloadOutlined />} onClick={handleReload}>
//                 Reload
//               </Button>
//                <Button
//                   icon={<FileExcelOutlined />}
//                   type="primary"
//                   style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
//                   onClick={exportToExcel}
//                 >
//                   Export to Excel
//                 </Button>
//             </Col>
//           </Row>
//         }
//       >
//          {filtersVisible && (
//               <div style={filtersStyle}>
//           <Row gutter={[16, 16]}>
           
//             <Col xs={24} sm={12} md={6}>
//               <Input
//                 placeholder="Turnover"
//                 value={turnoverFilter}
//                 onChange={(e) => setTurnoverFilter(e.target.value)}
//                 allowClear
//               />
//             </Col>
//             <Col xs={24} sm={12} md={6}>
//               <Input
//                 placeholder="Company Type"
//                 value={companyTypeFilter}
//                 onChange={(e) => setCompanyTypeFilter(e.target.value)}
//                 allowClear
//               />
//             </Col>
//             <Col xs={24} sm={12} md={6}>
//           <RangePicker
//             style={{ width: "100%" }}
//             value={dateRangeFilter}
//             onChange={(dates) => setDateRangeFilter(dates)}
//             format="YYYY-MM-DD"
//           />
//         </Col>
        
//             <Col xs={24} sm={12} md={6}>
//               <Select
//                 placeholder="Status"
//                 value={statusDropdownFilter || undefined}
//                 onChange={(val) => setStatusDropdownFilter(val)}
//                 allowClear
//                 style={{ width: "100%" }}
//               >
//                 <Option value="active">Active</Option>
//                 <Option value="inactive">Inactive</Option>
//               </Select>
//             </Col>
//           </Row>
          
//           <Row style={{ marginTop: 16 }}>
//             <Col span={24} style={{ textAlign: "right" }}>
//               <Button type="primary" onClick={applyFilters}>
//                 Apply Filters
//               </Button>
//             </Col>
//           </Row>
//         </div>
//                 )}
//                 <Modal
//   title="Edit Vendor Company"
//   open={isEditModalVisible}
//   onCancel={() => setIsEditModalVisible(false)}
//   onOk={handleUpdate}
//   okText="Save Changes"
// >
//   <Form form={form} layout="vertical">
//     <Form.Item name="name" label="Vendor Name" rules={[{ required: true, message: 'Please enter vendor name' }]}>
//       <Input />
//     </Form.Item>
//     <Form.Item name="companyName" label="Company Name" rules={[{ required: true, message: 'Please enter company name' }]}>
//       <Input />
//     </Form.Item>
//     <Form.Item name="companyType" label="Company Type">
//       <Input />
//     </Form.Item>
//     <Form.Item name="employees" label="Employees">
//       <Input type="number" />
//     </Form.Item>
//     <Form.Item name="website" label="Website">
//       <Input />
//     </Form.Item>
//     <Form.Item name="turnover" label="Turnover">
//       <Input />
//     </Form.Item>
//     <Form.Item name="altEmail" label="Alt. Email">
//       <Input />
//     </Form.Item>
//     <Form.Item name="altMobile" label="Alt. Mobile">
//       <Input />
//     </Form.Item>
//   </Form>
// </Modal>

//         <Table
//           dataSource={filteredData}
//           columns={columns}
//           pagination={{ pageSize: 5 }}
//            scroll={{ x: "max-content" }}
//           rowClassName={(_, index) =>
//             index % 2 === 0 ? "table-row-white" : "table-row-gray"
//           }
//           style={{ border: "none" }}
          
//           // removed scroll property
//         />
//       </Card>
//     </Space>
//   );
// };

// export default VendorCompany;


import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Card,
  Typography,
  Space,
  Row,
  Col,
  DatePicker,
  Select,
  Form,
  Modal,
  message,
} from "antd";
import {
  ReloadOutlined,
  EyeOutlined,
  FilterOutlined,
  EditOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const VendorCompany = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]); // Store original fetched data
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [companyTypeFilter, setCompanyTypeFilter] = useState("");
  const [turnoverFilter, setTurnoverFilter] = useState("");
  const [statusDropdownFilter, setStatusDropdownFilter] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // API base URL (update this to your actual base URL)
  const baseURL = process.env.REACT_APP_API_BASE_URL || "http://13.201.150.234/t2/api";

  // Fetch company data from API with filters
  const fetchCompanies = async (filters = {}) => {
    try {
      const params = new URLSearchParams();

      // Append filters if provided
      if (filters.statusDropdownFilter) {
        // Map active/inactive to 1/0 per your API docs
        const statusMap = {
          active: "1",
          inactive: "0",
          reject: "3",
        };
        params.append("status", statusMap[filters.statusDropdownFilter] || "");
      } else {
        params.append("status", "");
      }

      if (filters.companyName) params.append("company_name", filters.companyName);
      if (filters.vendorName) params.append("vendor_name", filters.vendorName);
      if (filters.state) params.append("state", filters.state);
      if (filters.city) params.append("city", filters.city);

      const url = `${baseURL}/admin/vendortab/companies?${params.toString()}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        // Map API data to your table format
        const apiData = response.data.data.data.map((item, index) => {
          const details = item.details || {};
          return {
            key: details.id || index,
            name: details.vendor?.name || "",
            companyName: details.company_name || "",
            companyType: details.company_type || "",
            employees: details.manpower || "",
            website: details.website_url || "",
            established: details.established_year || "",
            turnover: details.annual_turnover || "",
            altEmail: details.alternate_email || "",
            altMobile: details.alternate_number || "",
            logo: details.company_logo ? `${response.data.path}/${details.company_logo}` : "",
            banner: details.company_banner ? `${response.data.path}/${details.company_banner}` : "",
            status: item.status_text || "",
            originalDetails: details, // Save full details for view/edit if needed
          };
        });

        setOriginalData(apiData);
        setFilteredData(apiData);
      } else {
        message.error("Failed to fetch vendor companies");
      }
    } catch (error) {
      console.error("Error fetching vendor companies:", error);
      message.error("Error fetching vendor companies");
    }
  };

  // On first load, fetch companies with no filters
  useEffect(() => {
    fetchCompanies({});
  }, []);

  // Search function filters companyName locally
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = originalData.filter((item) =>
      item.companyName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Apply filters locally on the already fetched data
  const applyFilters = () => {
    let filtered = [...originalData];

    if (turnoverFilter) {
      filtered = filtered.filter((user) =>
        user.turnover.toLowerCase().includes(turnoverFilter.toLowerCase())
      );
    }

    if (companyTypeFilter) {
      filtered = filtered.filter((user) =>
        user.companyType.toLowerCase().includes(companyTypeFilter.toLowerCase())
      );
    }

    if (dateRangeFilter?.length === 2) {
      const [start, end] = dateRangeFilter;
      filtered = filtered.filter((user) => {
        const userDate = dayjs(user.established, "YYYY");
        return userDate.isAfter(start.startOf("day")) && userDate.isBefore(end.endOf("day"));
      });
    }

    if (statusDropdownFilter) {
      filtered = filtered.filter(
        (user) => user.status.toLowerCase() === statusDropdownFilter.toLowerCase()
      );
    }

    setFilteredData(filtered);
    setFiltersVisible(false);
  };

  // Reset all filters and reload original data
  const handleReload = () => {
    setSearchText("");
    setTurnoverFilter("");
    setCompanyTypeFilter("");
    setStatusDropdownFilter("");
    setDateRangeFilter([]);
    setFilteredData(originalData);
  };

  // Edit modal handlers (same as your existing logic)
  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsEditModalVisible(true);
  };
  const handleUpdate = () => {
    form.validateFields().then((values) => {
      const updatedData = filteredData.map((item) =>
        item.key === editingRecord.key ? { ...item, ...values } : item
      );
      setFilteredData(updatedData);
      setIsEditModalVisible(false);
    });
  };

  // Export current filtered data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vendor Company List");
    XLSX.writeFile(workbook, "Vendor_Company.xlsx");
  };

  // Table columns (same as your original columns, except logo/banner now full URLs)
  const columns = [
    {
      title: "Vendor Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Type",
      dataIndex: "companyType",
      key: "companyType",
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Employees",
      dataIndex: "employees",
      key: "employees",
      responsive: ["lg", "xl"],
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      responsive: ["md", "lg", "xl"],
      render: (url) =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Established",
      dataIndex: "established",
      key: "established",
      responsive: ["lg", "xl"],
    },
    {
      title: "Turnover",
      dataIndex: "turnover",
      key: "turnover",
      responsive: ["lg", "xl"],
    },
    {
      title: "Alt. Email",
      dataIndex: "altEmail",
      key: "altEmail",
      responsive: ["xl"],
    },
    {
      title: "Alt. Mobile",
      dataIndex: "altMobile",
      key: "altMobile",
      responsive: ["xl"],
    },
    {
      title: "Company Logo",
      dataIndex: "logo",
      key: "logo",
      responsive: ["md", "lg", "xl"],
      render: (img) =>
        img ? (
          <img
            src={img}
            alt="logo"
            style={{
              width: 80,
              height: 50,
              objectFit: "contain",
              borderRadius: 4,
            }}
          />
        ) : (
          "N/A"
        ),
    },
    {
      title: "Company Banner",
      dataIndex: "banner",
      key: "banner",
      responsive: ["md", "lg", "xl"],
      render: (img) =>
        img ? (
          <img
            src={img}
            alt="banner"
            style={{
              width: 80,
              height: 50,
              objectFit: "contain",
              borderRadius: 4,
            }}
          />
        ) : (
          "N/A"
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate("/viewvendorcompany", { state: { record } })}
            style={{
              backgroundColor: "#F0720B",
              borderColor: "#F0720B",
              color: "#fff",
            }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
              color: "#fff",
            }}
          />
        </Space>
      ),
    },
  ];

  const filtersStyle = {
    maxHeight: filtersVisible ? 240 : 0,
    overflow: "hidden",
    transition: "max-height 0.4s ease",
    background: "#f9f9f9",
    padding: filtersVisible ? "16px" : "0 16px",
    marginBottom: filtersVisible ? 16 : 0,
    borderRadius: 4,
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", padding: "2px 2px" }}>
      <Card
        bordered
        style={{ borderRadius: 12 }}
        bodyStyle={{ paddingTop: 16 }}
        headStyle={{
          marginBottom: 0,
          paddingBottom: 8,
          paddingTop: 16,
          borderBottom: "none",
        }}
        title={
          <Row gutter={[12, 12]} align="middle" justify="space-between" style={{ rowGap: 16 }}>
            <Col xs={24} md={12}>
              <Title level={5} style={{ margin: 0 }}>
                Vendor Company Info
              </Title>
            </Col>
            <Col
              xs={24}
              md={12}
              style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
            >
              <Button icon={<FilterOutlined />} onClick={() => setFiltersVisible(!filtersVisible)}>
                Filters
              </Button>
              <Input
                placeholder="Search Company Name"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchText}
                allowClear
                style={{ maxWidth: 240 }}
              />
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
            </Col>
          </Row>
        }
      >
        {filtersVisible && (
          <div style={filtersStyle}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Input
                  placeholder="Turnover"
                  value={turnoverFilter}
                  onChange={(e) => setTurnoverFilter(e.target.value)}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Input
                  placeholder="Company Type"
                  value={companyTypeFilter}
                  onChange={(e) => setCompanyTypeFilter(e.target.value)}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <RangePicker
                  style={{ width: "100%" }}
                  value={dateRangeFilter}
                  onChange={(dates) => setDateRangeFilter(dates)}
                  format="YYYY-MM-DD"
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
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                  <Option value="reject">Rejected</Option>
                </Select>
              </Col>
            </Row>
            <Row style={{ marginTop: 16 }}>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button type="primary" onClick={applyFilters}>
                  Apply Filters
                </Button>
              </Col>
            </Row>
          </div>
        )}

        <Modal
          title="Edit Vendor Company"
          open={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          onOk={handleUpdate}
          okText="Save Changes"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Vendor Name"
              rules={[{ required: true, message: "Please enter vendor name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="companyName"
              label="Company Name"
              rules={[{ required: true, message: "Please enter company name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="companyType" label="Company Type">
              <Input />
            </Form.Item>
            <Form.Item name="employees" label="Employees">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="website" label="Website">
              <Input />
            </Form.Item>
            <Form.Item name="turnover" label="Turnover">
              <Input />
            </Form.Item>
            <Form.Item name="altEmail" label="Alt. Email">
              <Input />
            </Form.Item>
            <Form.Item name="altMobile" label="Alt. Mobile">
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
          rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")}
          style={{ border: "none" }}
        />
      </Card>
    </Space>
  );
};

export default VendorCompany;
