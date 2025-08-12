// import React, { useState } from "react";
// import { Table, Input, Button, Card, Typography, Space, Popconfirm, message, Form, Modal } from "antd";
// import { PlusOutlined, EditOutlined, DeleteOutlined,EyeOutlined } from "@ant-design/icons";
// import dayjs from "dayjs";

// const { Title } = Typography;

// const initialData = [
//   {
//     key: 1,
//     paymentApi: "https://yourdomain.com/api/payment/initiate",
//     updatedDate: "2024-07-25T12:00:00",
//     updatedBy: "admin001",
//   },
// ];

// const Payment = () => {
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
       
//         item.paymentApi.toLowerCase().includes(value.toLowerCase())
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
//       paymentApi: values.paymentApi,
//       updatedDate: new Date().toISOString(),
//       updatedBy: "admin",
//     };

//     const updatedData = [...data, newEntry];
//     setData(updatedData);
//     setFilteredData(updatedData);
//     setIsModalVisible(false);
//     message.success("Payment API added successfully.");
//     form.resetFields();
//   };

//   const handleDelete = (key) => {
//     const updatedData = data.filter((item) => item.key !== key);
//     setData(updatedData);
//     setFilteredData(updatedData);
//     message.success("Entry deleted successfully.");
//   };

//   const columns = [
//   {
//        title: "Payment API",
//        dataIndex: "paymentApi",
//        key: "paymentApi",
//        render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
//   },
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
//            onClick={() => showViewModal(record)}>
         
//         </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <Space direction="vertical" size="large" style={{ width: "100%" }}>
//       <Card
//         title={
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <span style={{ fontSize: 20, fontWeight: 600 }}>Payment API</span>
//             <Space>
//               <Input
//                 placeholder="Search URLs"
//                 onChange={(e) => handleSearch(e.target.value)}
//                 value={searchText}
//                 allowClear
//                 style={{ width: 250 }}
//               />
//               <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
//                 Add 
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
//           title="Add"
//           open={isModalVisible}
//           onCancel={handleModalCancel}
//           onOk={() => form.submit()}
//           okText="Submit"
//         >
//           <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
//             <Form.Item
//               name="paymentApi"
//               label="Payment API"
//               rules={[{ required: true, message: "Please enter Payment API" }]}
              
//             >
//               <Input />
//             </Form.Item>
           
//           </Form>
//         </Modal>
//          <Modal
//                         title="Payment API"
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

// export default Payment;


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
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title } = Typography;

const initialData = [
  {
    key: 1,
    paymentApi: "https://yourdomain.com/api/payment/initiate",
    updatedDate: "2024-07-25T12:00:00",
    updatedBy: "admin001",
  },
];

const Payment = () => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Edit mode states
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  const showViewModal = (record) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter((item) =>
      item.paymentApi.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const showAddModal = () => {
    setIsModalVisible(true);
    setIsEditMode(false);
    setEditingKey(null);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setIsModalVisible(true);
    setIsEditMode(true);
    setEditingKey(record.key);
    form.setFieldsValue({
      paymentApi: record.paymentApi,
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
              paymentApi: values.paymentApi,
              updatedDate: new Date().toISOString(),
              updatedBy: "admin",
            }
          : item
      );
      setData(updatedData);
      setFilteredData(updatedData);
      message.success("Payment API updated successfully.");
    } else {
      // Add new entry
      const newKey = data.length + 1;
      const newEntry = {
        key: newKey,
        paymentApi: values.paymentApi,
        updatedDate: new Date().toISOString(),
        updatedBy: "admin",
      };
      const updatedData = [...data, newEntry];
      setData(updatedData);
      setFilteredData(updatedData);
      message.success("Payment API added successfully.");
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
      title: "Payment API",
      dataIndex: "paymentApi",
      key: "paymentApi",
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
            <span style={{ fontSize: 20, fontWeight: 600 }}>Payment API</span>
            <Space>
              <Input
                placeholder="Search URLs"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchText}
                allowClear
                style={{ width: 250 }}
              />
              <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
                Add
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
          title={isEditMode ? "Edit Payment API" : "Add Payment API"}
          open={isModalVisible}
          onCancel={handleModalCancel}
          onOk={() => form.submit()}
          okText="Submit"
        >
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              name="paymentApi"
              label="Payment API"
              rules={[{ required: true, message: "Please enter Payment API" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Payment API"
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

export default Payment;
