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
  Modal,
} from "antd";
import dayjs from "dayjs";
import { EyeOutlined } from "@ant-design/icons";

const { Title } = Typography;

const dataSource = [
  {
    key: 1,
    vendorId: "VND001",
    name:"Virat",
    holidayName:"Republic day",
    holidayDate:"26 Jan 25",
    year: "2023",
    holiday_id: "098765",
    status: "Active",
    createdDate: "2024-07-01T10:00:00",
    updatedDate: "2024-07-20T12:30:00",
    updatedBy: "admin001",
  },
  {
    key: 2,
    vendorId: "VND002",
    name:"Avni",
     holidayName:"Republic day",
    holidayDate:"26 Jan 25",
    year: "2022",
    holiday_id: "987654",
    status: "Inactive",
    createdDate: "2024-06-15T09:20:00",
    updatedDate: "2024-07-15T15:45:00",
    updatedBy: "admin002",
  },
];

const VendorCatalogue = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(dataSource);
  const navigate = useNavigate();
  
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = dataSource.filter(
      (vendor) =>
        vendor.vendorId.toLowerCase().includes(value.toLowerCase()) ||
        vendor.cityName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
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
      title:"Holiday Name",
      dataIndex:"holidayName",
      key:"holidayName",
    },
    {
       
      title:"Holiday Date",
      dataIndex:"holidayDate",
      key:"holidayDate",
    },
    
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
   {
      title: "Holiday ID",
      dataIndex: "holiday_id",
      key: "holiday_id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
       <Tag
                 style={{
                   backgroundColor: status === "Active" ? "#2fb344" : "#d63939", // dark green / dark red
                   color: "#ffffff", // white text
                   border: "none",
                 }}
               >
                 {status}
               </Tag>
      ),
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
            <Button  type="link"
               onClick={() => navigate("/viewcatalogue", { state: { record } })}>
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
    <Space direction="vertical" size="large" style={{ width: "100%", padding: "0px 0px 0px 0", borderRadius: "10px" }}>
      

      {/* Table Card */}
      <Card
        title={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 20, fontWeight: 600 }}>Vendor Holiday</span>
            <Input
              placeholder="Search Vendor ID or City"
              onChange={(e) => handleSearch(e.target.value)}
              value={searchText}
              allowClear
              style={{ width: 250 }}
            />
          </div>
        }
        bordered
        style={{ borderRadius: 12 }}
        bodyStyle={{ paddingTop: 16 }}
        headStyle={{ marginBottom: 0, paddingBottom: 8, paddingTop: 16, borderBottom: "none" }}

      >
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 5 }}
           rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")}
          style={{ border: "none" }}
        />
        
      </Card>
    </Space>
  );
};

export default VendorCatalogue;
