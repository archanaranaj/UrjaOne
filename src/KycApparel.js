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
  Form,
} from "antd";
import { PlusOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title } = Typography;

// Sample Data
const initialData = [
  {
    key: 1,
    vendorId: "VND001",
    name:"Rahul",
    company:"Tech Innovations",
    kyc_doc_code: "PAN",
    doc_id_no: "1234 5678 9012",
    doc_attachment: "/story.png",
    remarks: "",
    status: "Active",
    createdDate: "2024-07-01T10:00:00",
    updatedDate: "2024-07-20T12:30:00",
    updatedBy: "admin001",
  },
  {
    key: 2,
    vendorId: "VND002",
    name:"Rohit",
    company:"Tech Innovations",
    kyc_doc_code: "ADHAR CARD",
    doc_id_no: "4567 8901 2345",
    doc_attachment: "/story.png",
    remarks: "",
    status: "Inactive",
    createdDate: "2024-06-15T09:20:00",
    updatedDate: "2024-07-15T15:45:00",
    updatedBy: "admin002",
  },
];

const VendorKyc = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(initialData);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);


  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = initialData.filter(
      (item) =>
        item.vendorId.toLowerCase().includes(value.toLowerCase()) ||
        item.kyc_doc_code.toLowerCase().includes(value.toLowerCase())
    );
    setData(filtered);
  };

  const openRemarkModal = (key) => {
    const selectedRecord = data.find((item) => item.key === key);
    setSelectedKey(key);
    setIsModalVisible(true);
    form.setFieldsValue({ remark: selectedRecord?.remarks || "" });
  };

  const handleModalOk = () => {
    form.validateFields().then(({ remark }) => {
      const updated = data.map((item) =>
        item.key === selectedKey ? { ...item, remarks: remark } : item
      );
      setData(updated);
      setIsModalVisible(false);
      setSelectedKey(null);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedKey(null);
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
      title: "KYC Document Code",
      dataIndex: "kyc_doc_code",
      key: "kyc_doc_code",
    },
    {
      title: "Document ID No",
      dataIndex: "doc_id_no",
      key: "doc_id_no",
    },
    {
      title: "Document Attachment",
      dataIndex: "doc_attachment",
      key: "doc_attachment",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          View Document
        </a>
      ),
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
               onClick={() => navigate("/viewkycapparel", { state: { record } })}>
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
    <Space direction="vertical" size="small" style={{ width: "100%", padding: "0px 0px 0px 0", borderRadius: "10px" }}>
      <Card
        title={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 20, fontWeight: 600 }}>Vendor KYC Document</span>
            <Input
              placeholder="Search Vendor ID or KYC Code"
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
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }} 
          rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")}
          style={{ border: "none" }}
        />
      </Card>

      <Modal
        title="Add/Edit Remark"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="remark"
            label="Remark"
            rules={[{ required: true, message: "Please enter a remark" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter remark here..." />
          </Form.Item>
        </Form>
      </Modal>
      
    </Space>
  );
};

export default VendorKyc;
