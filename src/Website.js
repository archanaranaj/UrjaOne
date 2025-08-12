// import React, { useState } from "react";
// import { Table, Input, Button, Card, Typography, Space, Popconfirm, message, Form, Modal } from "antd";
// import { PlusOutlined, EditOutlined, DeleteOutlined,EyeOutlined } from "@ant-design/icons";
// import dayjs from "dayjs";

// const { Title } = Typography;

// const initialData = [
//   {
//     key: 1,
//     aboutUsUrl: "https://example.com/about",
//     privacyUrl: "https://example.com/privacy",
//     termsUrl: "https://example.com/terms",
//     updatedDate: "2024-07-25T12:00:00",
//     updatedBy: "admin001",
//   },
// ];

// const Website = () => {
//   const [data, setData] = useState(initialData);
//   const [filteredData, setFilteredData] = useState(initialData);
//   const [searchText, setSearchText] = useState("");
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [form] = Form.useForm();
// const [viewModalVisible, setViewModalVisible] = useState(false);
//  const [selectedRecord, setSelectedRecord] = useState(null);
//  const showViewModal = (record) => {
//    setSelectedRecord(record);
//    setViewModalVisible(true);
//  };
//   const handleSearch = (value) => {
//     setSearchText(value);
//     const filtered = data.filter(
//       (item) =>
//         item.aboutUsUrl.toLowerCase().includes(value.toLowerCase()) ||
//         item.privacyUrl.toLowerCase().includes(value.toLowerCase()) ||
//         item.termsUrl.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   const showAddModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleModalCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//   };

//   const handleFormSubmit = (values) => {
//     const newKey = data.length + 1;
//     const newEntry = {
//       key: newKey,
//       aboutUsUrl: values.aboutUsUrl,
//       privacyUrl: values.privacyUrl,
//       termsUrl: values.termsUrl,
//       updatedDate: new Date().toISOString(),
//       updatedBy: "admin",
//     };

//     const updatedData = [...data, newEntry];
//     setData(updatedData);
//     setFilteredData(updatedData);
//     setIsModalVisible(false);
//     message.success("Website info added successfully.");
//     form.resetFields();
//   };

//   const handleDelete = (key) => {
//     const updatedData = data.filter((item) => item.key !== key);
//     setData(updatedData);
//     setFilteredData(updatedData);
//     message.success("Entry deleted successfully.");
//   };

//   const columns = [
//     {
//       title: "About Us URL",
//       dataIndex: "aboutUsUrl",
//       key: "aboutUsUrl",
//       render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
//     },
//     {
//       title: "Privacy Page URL",
//       dataIndex: "privacyUrl",
//       key: "privacyUrl",
//       render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
//     },
//     {
//       title: "Terms of Use URL",
//       dataIndex: "termsUrl",
//       key: "termsUrl",
//       render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
//     },
//     {
//       title: "Updated Date",
//       dataIndex: "updatedDate",
//       key: "updatedDate",
//       render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
//     },
//     // {
//     //   title: "Updated By",
//     //   dataIndex: "updatedBy",
//     //   key: "updatedBy",
//     // },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Space>
//           <Button icon={<EditOutlined />} type="primary" />
//           <Popconfirm
//             title="Are you sure to delete this entry?"
//             onConfirm={() => handleDelete(record.key)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button icon={<DeleteOutlined />} type="primary" danger />
//           </Popconfirm>
//           <Button  icon={<EyeOutlined style={{ color: "#206bc4" }} />} type="link"
//                      onClick={() => showViewModal(record)}>
                   
//                   </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <Space direction="vertical" size="large" style={{ width: "100%" }}>
//       <Card
//         title={
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <span style={{ fontSize: 20, fontWeight: 600 }}>Website Info Settings</span>
//             <Space>
//               <Input
//                 placeholder="Search URLs"
//                 onChange={(e) => handleSearch(e.target.value)}
//                 value={searchText}
//                 allowClear
//                 style={{ width: 250 }}
//               />
//               <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
//                 Add Info
//               </Button>
//             </Space>
//           </div>
//         }
//         bordered
//         style={{ borderRadius: 12 }}
//         bodyStyle={{ paddingTop: 16 }}
//         headStyle={{
//           marginBottom: 0,
//           paddingBottom: 8,
//           paddingTop: 16,
//           borderBottom: "none",
//         }}
//       >
//         <Table
//           dataSource={filteredData}
//           columns={columns}
//           pagination={{ pageSize: 5 }}
//           scroll={{ x: "max-content" }}
//           rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")}
//         />

//         <Modal
//           title="Add Website Info"
//           open={isModalVisible}
//           onCancel={handleModalCancel}
//           onOk={() => form.submit()}
//           okText="Submit"
//         >
//           <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
//             <Form.Item
//               name="aboutUsUrl"
//               label="About Us URL"
//               rules={[{ required: true, message: "Please enter About Us URL" }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="privacyUrl"
//               label="Privacy Page URL"
//               rules={[{ required: true, message: "Please enter Privacy Page URL" }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="termsUrl"
//               label="Terms of Use URL"
//               rules={[{ required: true, message: "Please enter Terms of Use URL" }]}
//             >
//               <Input />
//             </Form.Item>
//           </Form>
//         </Modal>
//          <Modal
//                         title="Website"
//                         open={viewModalVisible}
//                         onCancel={() => setViewModalVisible(false)}
//                         footer={null}
//                       >
//                         {selectedRecord && (
//                           <Space direction="vertical" size="middle" style={{ marginTop: 12 }}>
                           
//                             <div>
//                               <strong>Updated By:</strong> {selectedRecord.updatedBy}
//                             </div>
//                           </Space>
//                         )}
//                       </Modal>
//       </Card>
//     </Space>
//   );
// };

// export default Website;

import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Card,
  Typography,
  Space,
  Popconfirm,
  message,
  Form,
  Modal,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title } = Typography;

const initialData = [
  {
    key: 1,
    aboutUsUrl: "https://example.com/about",
    privacyUrl: "https://example.com/privacy",
    termsUrl: "https://example.com/terms",
    updatedDate: "2024-07-25T12:00:00",
    updatedBy: "admin001",
  },
];

const Website = () => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // New states for edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  const showViewModal = (record) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter(
      (item) =>
        item.aboutUsUrl.toLowerCase().includes(value.toLowerCase()) ||
        item.privacyUrl.toLowerCase().includes(value.toLowerCase()) ||
        item.termsUrl.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const showAddModal = () => {
    setIsModalVisible(true);
    setIsEditMode(false);
    setEditingKey(null);
    form.resetFields();
  };

  // Show modal with prefilled data for edit
  const handleEdit = (record) => {
    setIsModalVisible(true);
    setIsEditMode(true);
    setEditingKey(record.key);
    form.setFieldsValue({
      aboutUsUrl: record.aboutUsUrl,
      privacyUrl: record.privacyUrl,
      termsUrl: record.termsUrl,
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setIsEditMode(false);
    setEditingKey(null);
  };

  const handleFormSubmit = (values) => {
    if (isEditMode && editingKey !== null) {
      // Update existing entry
      const updatedData = data.map((item) =>
        item.key === editingKey
          ? {
              ...item,
              ...values,
              updatedDate: new Date().toISOString(),
              updatedBy: "admin",
            }
          : item
      );
      setData(updatedData);
      setFilteredData(updatedData);
      message.success("Website info updated successfully.");
    } else {
      // Add new entry
      const newKey = data.length + 1;
      const newEntry = {
        key: newKey,
        ...values,
        updatedDate: new Date().toISOString(),
        updatedBy: "admin",
      };
      const updatedData = [...data, newEntry];
      setData(updatedData);
      setFilteredData(updatedData);
      message.success("Website info added successfully.");
    }

    setIsModalVisible(false);
    form.resetFields();
    setIsEditMode(false);
    setEditingKey(null);
  };

  const handleDelete = (key) => {
    const updatedData = data.filter((item) => item.key !== key);
    setData(updatedData);
    setFilteredData(updatedData);
    message.success("Entry deleted successfully.");
  };

  const columns = [
    {
      title: "About Us URL",
      dataIndex: "aboutUsUrl",
      key: "aboutUsUrl",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Privacy Page URL",
      dataIndex: "privacyUrl",
      key: "privacyUrl",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Terms of Use URL",
      dataIndex: "termsUrl",
      key: "termsUrl",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      key: "updatedDate",
      render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
    },
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
            title="Are you sure to delete this entry?"
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 600 }}>
              Website Info Settings
            </span>
            <Space>
              <Input
                placeholder="Search URLs"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchText}
                allowClear
                style={{ width: 250 }}
              />
              <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
                Add Info
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
          title={isEditMode ? "Edit Website Info" : "Add Website Info"}
          open={isModalVisible}
          onCancel={handleModalCancel}
          onOk={() => form.submit()}
          okText="Submit"
        >
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              name="aboutUsUrl"
              label="About Us URL"
              rules={[{ required: true, message: "Please enter About Us URL" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="privacyUrl"
              label="Privacy Page URL"
              rules={[{ required: true, message: "Please enter Privacy Page URL" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="termsUrl"
              label="Terms of Use URL"
              rules={[{ required: true, message: "Please enter Terms of Use URL" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Website"
          open={viewModalVisible}
          onCancel={() => setViewModalVisible(false)}
          footer={null}
        >
          {selectedRecord && (
            <Space direction="vertical" size="middle" style={{ marginTop: 12 }}>
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

export default Website;
