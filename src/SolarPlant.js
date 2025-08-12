
import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Row,
  Col,
  Space,
  DatePicker,
  message,
  Tag,
  Tooltip,

} from "antd";
import {
  EyeOutlined,
  FilterOutlined,
  ReloadOutlined,
  SearchOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


const { Option } = Select;
const { RangePicker } = DatePicker;

const sampleUsers = [
  {
    key: 1,
    solarplantid: 111,
    userId: 15646476,
    name: "John Doe",
    // email: "john@example.com",
    // mobile: "1234567890",
    status:"Pending",
    creationDate: "2023-01-01",
    updationDate: "2023-05-10",
    plants: [{ type: "Rooftop", category: "Residential" }],
  },
  {
    key: 2,
    solarplantid: 2923,
    userId: 2589847784,
    name: "Jane Smith",
    // email: "jane@example.com",
    // mobile: "0987654321",
     status:"Pending",
    creationDate: "2023-03-15",
    updationDate: "2023-06-20",
    plants: [{ type: "Ground-mounted", category: "Commercial" }],
  },
];

const SolarPlant = () => {
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
   const [statusFilter, setStatusFilter] = useState("");

  // Filters states
  const [searchText, setSearchText] = useState(""); // for header search bar (optional)
  const [nameFilter, setNameFilter] = useState("");
  
  const [plantTypeFilter, setPlantTypeFilter] = useState("");
  const [plantCategoryFilter, setPlantCategoryFilter] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState(null); // [moment, moment]
  const [editingKey, setEditingKey] = useState(null);
      const [editingStatus, setEditingStatus] = useState("");
    
    const [statusDropdownFilter, setStatusDropdownFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUsers(sampleUsers);
    setFilteredData(sampleUsers);
  }, []);

  // This filters data only on "Apply" click from filters panel
  const applyFilters = () => {
    let filtered = [...users];

    if (nameFilter) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
   
    if (plantTypeFilter) {
      filtered = filtered.filter(
        (user) => user.plants[0]?.type === plantTypeFilter
      );
    }
    if (plantCategoryFilter) {
      filtered = filtered.filter(
        (user) => user.plants[0]?.category === plantCategoryFilter
      );
    }

    if (dateRangeFilter && dateRangeFilter.length === 2) {
      const [start, end] = dateRangeFilter;
      filtered = filtered.filter((user) => {
        const creationDate = dayjs(user.creationDate);
        return (
          creationDate.isSameOrAfter(start, "day") &&
          creationDate.isSameOrBefore(end, "day")
        );
      });
    }

    setFilteredData(filtered);
    setFiltersVisible(false);
  };

  const handleReload = () => {
    setSearchText("");
    setNameFilter("");
    // setEmailFilter("");
    // setMobileFilter("");
    setPlantTypeFilter("");
    setPlantCategoryFilter("");
    setDateRangeFilter(null);
    setFilteredData(users);
  };

  // Export current filtered data to Excel
 const exportToExcel = () => {
  const dataToExport = [];

  users.forEach(user => {
    user.plants.forEach(plant => {
      dataToExport.push({
        "User Name": user.name,
        "User Email": user.email,
        "User Mobile": user.mobile,
        "Plant Address": plant.plantAddress,
        "Plant Type": plant.plantType,
        "Plant Size": plant.plantSize,
        "Structure Type": plant.structureType,
        "Installation Year": plant.installationYear,
        "Plant Category": plant.plantCategory,
        "Plant Status": plant.plantStatus,
        "Panel Make": plant.panelMake || "-",
        "Current Status": plant.currentStatus,
        "Inverter Make": plant.inverterMake || "-",
        "Created Date": dayjs(plant.createdDate).format("DD-MM-YYYY"),
        "Updated Date": dayjs(plant.updatedDate).format("DD-MM-YYYY"),
        "Status": plant.status,
        "Plant Images": plant.plantImages ? plant.plantImages.join(", ") : "-",
      });
    });
  });

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "UserPlants");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(data, `UserPlants_${dayjs().format("YYYY-MM-DD")}.xlsx`);
};


 


  // Slide toggle style for filters panel
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
    { title: "#S.No", dataIndex: "key", key: "key" },
    { title: "Solar Plant ID", dataIndex: "solarplantid", key: "solarplantid" },
    { title: "User ID", dataIndex: "userId", key: "userId" },
    { title: "Name", dataIndex: "name", key: "name" },
    // { title: "Email", dataIndex: "email", key: "email" },
    // { title: "Mobile No.", dataIndex: "mobile", key: "mobile" },
    { title: "Creation Date", dataIndex: "creationDate", key: "creationDate" },
    {
      title: "Plant Type",
      key: "plantType",
      render: (_, record) => record.plants[0]?.type || "N/A",
    },
    {
      title: "Plant Category",
      key: "plantCategory",
      render: (_, record) => record.plants[0]?.category || "N/A",
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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          
          onClick={() => navigate(`/user/${record.key}`)}
          icon={<EyeOutlined />}
          style={{ backgroundColor: "#F0720B", borderColor: "#F0720B", color: "#fff" }}
                                                                     
        />
          
      ),
    },
  ];

  return (
    <div style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
      {/* Header and Controls */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          gap: 16,
        }}
      >
        <h2 style={{ margin: 0, whiteSpace: "nowrap" }}>
          Solar Plant Registration
        </h2>

        <Space wrap size="small" style={{ flexWrap: "wrap" }}>
          {/* Main Search bar */}
          <Input
            placeholder="Search by Name or Email"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            allowClear
            style={{
              minWidth: 180,
              maxWidth: 300,
              flexGrow: 1,
              maxHeight: 40,
            }}
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

      {/* Filters slide down panel */}
     
<div style={filtersStyle}>
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} md={6}>
      <Select
        placeholder="Plant Type"
        value={plantTypeFilter || undefined}
        onChange={(val) => setPlantTypeFilter(val)}
        allowClear
        style={{ width: "100%" }}
      >
        <Option value="Rooftop">Rooftop</Option>
        <Option value="Ground-mounted">Ground-mounted</Option>
      </Select>
    </Col>
    <Col xs={24} sm={12} md={6}>
      <Select
        placeholder="Plant Category"
        value={plantCategoryFilter || undefined}
        onChange={(val) => setPlantCategoryFilter(val)}
        allowClear
        style={{ width: "100%" }}
      >
        <Option value="Residential">Residential</Option>
        <Option value="Commercial">Commercial</Option>
      </Select>
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
        <Option value="active">Active</Option>
        <Option value="inactive">Inactive</Option>
      </Select>
    </Col>
  </Row>
  {/* Apply Button */}
  <Row style={{ marginTop: 16 }}>
    <Col span={24} style={{ textAlign: "right" }}>
      <Button type="primary" onClick={applyFilters}>
        Apply Filters
      </Button>
    </Col>
  </Row>
</div>

      {/* Data Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
        rowClassName={(_, index) =>
          index % 2 === 0 ? "table-row-white" : "table-row-gray"
        }
      />
    </div>
  );
};

export default SolarPlant;
