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
  Popconfirm,
  message,
  Form,
  Modal,
  Upload,

} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined,EyeOutlined} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title } = Typography;

const initialData = [
  {
    key: 1,
    blogId: "BGD001",
    title: "User Guide 2023",
    url: "https://example.com/blog/2023",
    image:"./story.png",
    status: "Active",
    createdDate: "2024-07-01T10:00:00",
    updatedDate: "2024-07-20T12:30:00",
    updatedBy: "admin001",
  },
  {
    key: 2,
    blogId: "BGD002",
    title: "User Guide 2022",
    url:"https://example.com/blog/2022",
    image:"./story.png",
    status: "Inactive",
    createdDate: "2024-06-15T09:20:00",
    updatedDate: "2024-07-15T15:45:00",
    updatedBy: "admin002",
  },
];

const Blog = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
   const [isModalVisible, setIsModalVisible] = useState(false);
const [form] = Form.useForm();
  const navigate = useNavigate();
const [viewModalVisible, setViewModalVisible] = useState(false);
 const [selectedRecord, setSelectedRecord] = useState(null);
 const [editMode, setEditMode] = useState(false);
const [editingKey, setEditingKey] = useState(null);

 const showViewModal = (record) => {
   setSelectedRecord(record);
   setViewModalVisible(true);
 };
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter(
      (unit) =>
        unit.unitId.toLowerCase().includes(value.toLowerCase()) ||
        unit.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };


const showAddModal = () => {
  setIsModalVisible(true);
  setEditMode(false);
  setEditingKey(null);
  form.resetFields();
};


const handleModalCancel = () => {
  setIsModalVisible(false);
  form.resetFields();
};

const handleFormSubmit = (values) => {
  if (editMode && editingKey !== null) {
    const updatedData = data.map((item) =>
      item.key === editingKey
        ? {
            ...item,
            title: values.title,
            url: values.url,
            status: values.status,
            updatedDate: new Date().toISOString(),
            updatedBy: "admin",
          }
        : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
    message.success("Blog updated successfully.");
  } else {
    const newKey = data.length + 1;
    const newEntry = {
      key: newKey,
      blogId: `BGD00${newKey}`,
      title: values.title,
      url: values.url,
      image: "./story.png",
      status: values.status,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      updatedBy: "admin",
    };
    const updatedData = [...data, newEntry];
    setData(updatedData);
    setFilteredData(updatedData);
    message.success("Blog added successfully.");
  }

  setIsModalVisible(false);
  form.resetFields();
  setEditMode(false);
  setEditingKey(null);
};


 

  const handleEdit = (record) => {
  setIsModalVisible(true);
  setEditMode(true);
  setEditingKey(record.key);
  form.setFieldsValue({
    title: record.title,
    url: record.url,
    status: record.status,

  });
};


  const handleDelete = (key) => {
    const updatedData = data.filter((item) => item.key !== key);
    setData(updatedData);
    setFilteredData(updatedData);
    message.success("Unit deleted successfully.");
  };

  const columns = [
    {
      title: "Blog ID",
      dataIndex: "blogId",
      key: "blogId",
    },
    {
      title: "Blog Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Blog URL",
      dataIndex: "url",
      key: "url",
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>  
    },
    {
      title: "Blog Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} alt="Blog" style={{ width: 50, height: 50 }} />
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
        <Space>
            <Button type="link"
                                           icon={ <EyeOutlined />}
                                                   onClick={() => showViewModal(record)}
                                                 style={{ backgroundColor: "#F0720B", borderColor: "#F0720B", color: "#fff" }}/>
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this blog?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="primary" danger />
          </Popconfirm>
          
        </Space>
      ),
    },

  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card
        title={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 20, fontWeight: 600 }}>Blog Master</span>
            <Space>
              <Input
                placeholder="Search Unit ID or Name"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchText}
                allowClear
                style={{ width: 250 }}
              />
             <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
  Add Blog
</Button>

            </Space>
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
          scroll={{ x: "max-content" }} 
           rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")}
          
        />
      <Modal
  title={editMode ? "Edit Blog" : "Add Blog"}

  open={isModalVisible}
  onCancel={handleModalCancel}
  onOk={() => form.submit()}
  okText="Submit"
>
  <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
    <Form.Item
      name="title"
      label="Blog Title"
      rules={[{ required: true, message: "Please enter the blog title" }]}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="url"
      label="Blog URL"
      rules={[{ required: true, message: "Please enter the blog URL" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="image"
      label="Blog Image"
      valuePropName="fileList"
      getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
      rules={[{ required: true, message: "Please upload a blog image" }]}
    >
      <Upload
        name="image"
        listType="picture"
        maxCount={1}
        beforeUpload={() => false} // prevents auto-upload
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Form.Item>

    <Form.Item
      name="status"
      label="Status"
      rules={[{ required: true, message: "Please select status" }]}
    >
      <Input placeholder="Active or Inactive" />
    </Form.Item>
  </Form>
</Modal>
<Modal
          title="Blog"
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


export default Blog;
