
import React, { useState } from "react";
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
    DatePicker,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import { ReloadOutlined, EyeOutlined, FilterOutlined, CloseOutlined, EditOutlined, CheckOutlined, FileExcelOutlined} from "@ant-design/icons";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const { Title } = Typography;
const { Option } = Select;

const dataSource = [
  {
    key: 1,
    userId: "UD001",
    userName: "Archana",
    addressType: "Head Office",
    stateName: "Maharashtra",
    pinCode: "2356778",
    cityName: "Mumbai",
    geoLocation: "19.0760° N, 72.8777° E",
    addressText: "123 Marine Drive, Mumbai",
    status: "Pending",
    createdDate: "2024-07-01T10:00:00",
    updatedDate: "2024-07-20T12:30:00",
    updatedBy: "admin001",
  },
  {
    key: 2,
    userId: "UD001",
    userName:"Jeet",
    addressType: "Branch",
    stateName: "Delhi",
    pinCode: "247776",
    cityName: "New Delhi",
    geoLocation: "28.6139° N, 77.2090° E",
    addressText: "Connaught Place, Delhi",
    status: "Pending",
    createdDate: "2024-06-15T09:20:00",
    updatedDate: "2024-07-15T15:45:00",
    updatedBy: "admin002",
  },
];



const UserAddress = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredData, setFilteredData] = useState(dataSource);
  const [filtersVisible, setFiltersVisible] = useState(false);
   const [filteredUsers, setFilteredUsers] = useState(dataSource);
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
   const [editingKey, setEditingKey] = useState(null);
    const [editingStatus, setEditingStatus] = useState("");
  
  const [statusDropdownFilter, setStatusDropdownFilter] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState([]);
  
  const navigate = useNavigate();
 
 const { RangePicker } = DatePicker;
 const exportToExcel = () => {
  // Map filteredData (current filtered table data) for export
  const dataToExport = filteredData.map(({ key, ...rest }) => {
    return {
      ...rest,
      // Format dates as "DD-MM-YYYY HH:mm"
      createdDate: dayjs(rest.createdDate).format("DD-MM-YYYY HH:mm"),
      updatedDate: dayjs(rest.updatedDate).format("DD-MM-YYYY HH:mm"),
    };
  });

  // Create worksheet from JSON data
  const worksheet = XLSX.utils.json_to_sheet(dataToExport);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "UserAddresses");

  // Write workbook as array buffer
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  // Create Blob object
  const data = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  // Save file with current date in filename
  saveAs(data, `UserAddresses_${dayjs().format("YYYY-MM-DD")}.xlsx`);
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

// Apply filters
const applyFilters = () => {
  let filtered = [...dataSource];

  if (nameFilter) {
    filtered = filtered.filter(user =>
      user.userName.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }

  if (stateFilter) {
    filtered = filtered.filter(user =>
      user.stateName.toLowerCase().includes(stateFilter.toLowerCase())
    );
  }

  if (cityFilter) {
    filtered = filtered.filter(user =>
      user.cityName.toLowerCase().includes(cityFilter.toLowerCase())
    );
  }

  if (dateRangeFilter?.length === 2) {
    const [start, end] = dateRangeFilter;
    filtered = filtered.filter(user => {
      const userDate = dayjs(user.createdDate);
      return userDate.isAfter(start.startOf("day")) && userDate.isBefore(end.endOf("day"));
    });
  }

  if (statusDropdownFilter) {
    filtered = filtered.filter(user =>
      user.status.toLowerCase() === statusDropdownFilter.toLowerCase()
    );
  }

  setFilteredData(filtered);
  setFiltersVisible(false); // Hide filter panel
};

  const handleSearch = (value) => {
    setSearchText(value);
    applyFilters(value, statusFilter);
  };
 
const handleStatusUpdate = (key, newStatus) => {
  const updatedData = filteredData.map((item) =>
    item.key === key ? { ...item, status: newStatus } : item
  );
  setFilteredData(updatedData);
};

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    applyFilters(searchText, value);
  };

  const handleReload = () => {
    setSearchText("");
    setStatusFilter("");
    setFilteredData(dataSource);
    setStateFilter("");
    setCityFilter("");
    setDateRangeFilter([]);
  };

 

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Address Type",
      dataIndex: "addressType",
      key: "addressType",
    },
    {
      title: "State Name",
      dataIndex: "stateName",
      key: "stateName",
    },
    {
      title: "Pin Code",
      dataIndex: "pinCode",
      key: "pinCode",
    },
    {
      title: "City Name",
      dataIndex: "cityName",
      key: "cityName",
    },
    {
      title: "Geo-Location",
      dataIndex: "geoLocation",
      key: "geoLocation",
    },
    {
      title: "Address Text",
      dataIndex: "addressText",
      key: "addressText",
    },
    {
         title: "Status",
         dataIndex: "status",
         key: "status",
         render: (status, record) => {
           const isEditing = editingKey === record.key;
           const statusColors = {
            Pending:"#d63939",
             Active: "#2fb344",
             Inactive: "#d63939",
            
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
                   
                 ]}
               />
               <Tooltip title="Save">
                 <CheckOutlined
                   style={{ color: "green", cursor: "pointer" }}
                   onClick={() => {
                  const updated = filteredData.map((item) =>
item.key === record.key
  ? { ...item, status: editingStatus }

    : item
);
setFilteredData(updated);
setEditingKey(null);


                    
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
    // {
    //   title: "Created Date",
    //   dataIndex: "createdDate",
    //   key: "createdDate",
    //   render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
    // },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      key: "updatedDate",
      render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
    },
    // {
    //   title: "Updated By",
    //   dataIndex: "updatedBy",
    //   key: "updatedBy",
    // },
    {
  title: "Action",
  key: "action",
  render: (_, record) => (
   <Button type="link"
                                                       icon={ <EyeOutlined />}
                                                              onClick={() => navigate("/viewuseraddress", { state: { record } })}
                                                             style={{ backgroundColor: "#F0720B", borderColor: "#F0720B", color: "#fff" }}/>
  ),
},

  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", padding: "0px", borderRadius: "10px" }}>
      <Card
        title={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <span style={{ fontSize: 20, fontWeight: 600 }}>User Address</span>
            <Space wrap>
              <Button icon={<FilterOutlined />} onClick={() => setFiltersVisible(!filtersVisible)}>
                Filters
              </Button>
              <Input
                placeholder="Search"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchText}
                allowClear
                style={{ width: 200 }}
              />
              {/* <Select
                placeholder="Filter by Status"
                onChange={handleStatusChange}
                value={statusFilter || undefined}
                allowClear
                style={{ width: 160 }}
              >
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select> */}
              <Button icon={<ReloadOutlined />} onClick={handleReload}>
                Reload
              </Button>
               {/* Export Button */}
            <Button
              icon={<FileExcelOutlined />}
              onClick={exportToExcel}
              type="primary"
              style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
            >
              Export to Excel
            </Button>
            </Space>
          </div>
          
        }
        bordered
        style={{ borderRadius: 12 }}
        bodyStyle={{ paddingTop: 16 }}
        headStyle={{ marginBottom: 0, paddingBottom: 8, paddingTop: 16, borderBottom: "none" }}
      >
         {filtersVisible && (
      <div style={filtersStyle}>
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} md={6}>
      <Input
        placeholder="Name"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
        allowClear
      />
    </Col>
    <Col xs={24} sm={12} md={6}>
      <Input
        placeholder="State"
        value={stateFilter}
        onChange={(e) => setStateFilter(e.target.value)}
        allowClear
      />
    </Col>
    <Col xs={24} sm={12} md={6}>
      <Input
        placeholder="City"
        value={cityFilter}
        onChange={(e) => setCityFilter(e.target.value)}
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

export default UserAddress;
