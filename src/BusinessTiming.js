import React, { useState } from "react";
import {
  Table,
  Tag,
  Input,
  Card,
  Typography,
  Space,
  Button,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const dataSource = [
  {
    key: 1,
    vendorId: "VND001",
    name:"Risha",
    mon: "Y",
    tue: "Y",
    wed: "Y",
    thu: "N",
    fri: "Y",
    sat: "N",
    sun: "Y",
    openTime: "9:00",
    openTimeUnit: "AM",
    closeTime: "6:00",
    closeTimeUnit: "PM",
    status: "Active",
    createdDate: "2024-07-01T10:00:00",
    updatedDate: "2024-07-20T12:30:00",
    updatedBy: "admin001",
  },
];

const BusinessTiming = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(dataSource);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = dataSource.filter((vendor) =>
      vendor.vendorId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleView = (record) => {
    navigate(`/viewbusinesstiming/${record.vendorId}`, { state: record });
  };

  const columns = [
    { title: "Vendor ID", dataIndex: "vendorId", key: "vendorId" },
     {
      title: "Vendor Name",
      dataIndex: "name",
      key: "name",
    },
    { title: "Mon", dataIndex: "mon", key: "mon" },
    { title: "Tue", dataIndex: "tue", key: "tue" },
    { title: "Wed", dataIndex: "wed", key: "wed" },
    { title: "Thu", dataIndex: "thu", key: "thu" },
    { title: "Fri", dataIndex: "fri", key: "fri" },
    { title: "Sat", dataIndex: "sat", key: "sat" },
    { title: "Sun", dataIndex: "sun", key: "sun" },
    {
      title: "Open Time",
      render: (_, record) => `${record.openTime} ${record.openTimeUnit}`,
    },
    {
      title: "Close Time",
      render: (_, record) => `${record.closeTime} ${record.closeTimeUnit}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag
          style={{
            backgroundColor: status === "Active" ? "#2fb344" : "#d63939",
            color: "#ffffff",
            border: "none",
          }}
        >
          {status}
        </Tag>
      ),
    },
    // {
    //   title: "Created At",
    //   dataIndex: "createdDate",
    //   key: "createdDate",
    //   render: (date) => new Date(date).toLocaleString("en-IN"),
    // },
    {
      title: "Updated At",
      dataIndex: "updatedDate",
      key: "updatedDate",
      render: (date) => new Date(date).toLocaleString("en-IN"),
    },
    // {
    //   title: "Updated By",
    //   dataIndex: "updatedBy",
    //   key: "updatedBy",
    // },
    {
      title: "Action",
      render: (_, record) => (
        <Button
         
          type="link"
          onClick={() => handleView(record)}
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
    <Space direction="vertical" size="large" style={{ width: "100%", padding: 0 }}>
      <Card
        title={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 20, fontWeight: 600 }}>Vendor Business Timing</span>
            <Input
              placeholder="Search Vendor ID"
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
        headStyle={{
          marginBottom: 0,
          paddingBottom: 8,
          paddingTop: 16,
          borderBottom: "none",
        }}
      >
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowClassName={(_, index) =>
            index % 2 === 0 ? "table-row-white" : "table-row-gray"
          }
          style={{ border: "none" }}
        />
      </Card>
    </Space>
  );
};

export default BusinessTiming;
