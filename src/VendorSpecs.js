import React, { useState } from "react";
import {
  Table,
  Tag,
  Input,
  Button,
  Card,
  Space,
  Popconfirm,
  message,
  Modal,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const dataSource = [
  {
    key: 1,
    vendorServiceId: "VSID001",
    serviceId: "SID001",
    vendorId: "VID001",
    name:"Geeta",
    specsId: "SPID001",
    specsName: "Weight",
    specsValue: "200g",
    status: "Active",
    createdDate: "2024-07-01T10:00:00",
    updatedDate: "2024-07-20T12:30:00",
    updatedBy: "admin001",
  },
  {
    key: 2,
    vendorServiceId: "VSID002",
    serviceId: "SID002",
    vendorId: "VID002",
    name:"Mansi",
    specsId: "SPID002",
    specsName: "Color",
    specsValue: "Red",
    status: "Inactive",
    createdDate: "2024-06-15T09:20:00",
    updatedDate: "2024-07-15T15:45:00",
    updatedBy: "admin002",
  },
];

const VendorSpecs = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(dataSource);
  const [filteredData, setFilteredData] = useState(dataSource);
  const navigate = useNavigate();
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter(
      (item) =>
        item.specsId.toLowerCase().includes(value.toLowerCase()) ||
        item.specsName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleEdit = (record) => {
    message.info(`Edit specs: ${record.specsId}`);
  };

  const handleDelete = (key) => {
    const updatedData = data.filter((item) => item.key !== key);
    setData(updatedData);
    setFilteredData(updatedData);
    message.success("Specification deleted successfully.");
  };

  const columns = [
    {
      title: "Vendor_Service_ID",
      dataIndex: "vendorServiceId",
      key: "vendorServiceId",
    },
    {
      title: "Service_ID",
      dataIndex: "serviceId",
      key: "serviceId",
    },
    {
      title: "Vendor_ID",
      dataIndex: "vendorId",
      key: "vendorId",
    },
     {
      title: "Vendor Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Specs_ID",
      dataIndex: "specsId",
      key: "specsId",
    },
    {
      title: "Specs_Name",
      dataIndex: "specsName",
      key: "specsName",
    },
    {
      title: "Specs_Value",
      dataIndex: "specsValue",
      key: "specsValue",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
    //   title: "Created_Date",
    //   dataIndex: "createdDate",
    //   key: "createdDate",
    //   render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
    // },
    // {
    //   title: "Updated_Date",
    //   dataIndex: "updatedDate",
    //   key: "updatedDate",
    //   render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
    // },
    // {
    //   title: "Updated_By",
    //   dataIndex: "updatedBy",
    //   key: "updatedBy",
    // },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space>
    //       <Button
    //         icon={<EditOutlined />}
    //         type="primary"
    //         onClick={() => handleEdit(record)}
    //       />
    //       <Popconfirm
    //         title="Are you sure you want to delete this specification?"
    //         onConfirm={() => handleDelete(record.key)}
    //         okText="Yes"
    //         cancelText="No"
    //       >
    //         <Button icon={<DeleteOutlined />} type="primary" danger />
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
         {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <Button  type="link"
               onClick={() => navigate("/viewspecs", { state: { record } })}>
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
      style={{ width: "100%", padding: 0, borderRadius: "10px" }}
    >
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 600 }}>
              Vendor Service Specs
            </span>
            <Input
              placeholder="Search Specs ID or Name"
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
  scroll={{ x: "max-content" }} // ✅ Enables horizontal scroll
  rowClassName={(_, index) =>
    index % 2 === 0 ? "table-row-white" : "table-row-gray"
  }
  style={{ border: "none" }}
/>

       

      </Card>

    </Space>
  );
};

export default VendorSpecs;
