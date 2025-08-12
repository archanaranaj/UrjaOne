// import React, { useState } from "react";
// import {
//   Table,
//   Tag,
//   Button,
//   Input,
//   Space,
//   Modal,
//   Form,
//   Select,
//   message,
// } from "antd";
// import {
//   EditOutlined,
//   PlusOutlined,
//   DeleteOutlined,
//   EyeOutlined
// } from "@ant-design/icons";
// import dayjs from "dayjs";
// const { Option } = Select;

// const initialData = [
//   {
//     key: "1",
//     id: 1,
//     title: "What is solar energy?",
//     description: "Solar energy is power from the sun converted into electricity.",
//     status: "Active",
//     creationDate: "2024-05-01",
//     updatedDt: "2024-06-15",
//     updatedBy: "admin",
//   },
//   {
//     key: "2",
//     id: 2,
//     title: "How does wind energy work?",
//     description: "Wind turbines convert kinetic energy from wind into electricity.",
//     status: "Inactive",
//     creationDate: "2024-04-20",
//     updatedDt: "2024-05-10",
//     updatedBy: "editor",
//   },
// ];

// const FaqUser = () => {
//   const [data, setData] = useState(initialData);
//   const [filteredData, setFilteredData] = useState(initialData);
//   const [searchText, setSearchText] = useState("");
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [editingRecord, setEditingRecord] = useState(null);
//   const [form] = Form.useForm();
// const [viewModalVisible, setViewModalVisible] = useState(false);
//  const [selectedRecord, setSelectedRecord] = useState(null);
//  const showViewModal = (record) => {
//    setSelectedRecord(record);
//    setViewModalVisible(true);
//  };
//   const handleSearch = (value) => {
//     setSearchText(value);
//     const filtered = data.filter((item) =>
//       item.title.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   const showAddModal = () => {
//     setEditMode(false);
//     form.resetFields();
//     setIsModalVisible(true);
//   };

 
//  const showEditModal = (record) => {
//   setEditMode(true);
//   setEditingRecord(record);

// form.setFieldsValue({
//   title: record.title,
//   description: record.description,
//   status: record.status,
// });



//   // if (record.photo) {
//   //   setFileList([
//   //     {
//   //       uid: "-1",
//   //       name: "photo.png",
//   //       status: "done",
//   //       url: record.photo,
//   //     },
//   //   ]);
//   // } else {
//   //   setFileList([]);
//   // }

//   setIsModalVisible(true);
// };


//   const handleDelete = (record) => {
//     Modal.confirm({
//       title: "Delete this FAQ?",
//       content: `\"${record.title}\" will be removed.`,
//       okText: "Yes",
//       okType: "danger",
//       cancelText: "No",
//       onOk: () => {
//         const newList = data.filter((item) => item.id !== record.id);
//         setData(newList);
//         setFilteredData(newList);
//         message.success("FAQ deleted successfully!");
//       },
//     });
//   };

//   const handleOk = () => {
//   form.validateFields().then((values) => {
//     const now = dayjs().format("YYYY-MM-DD");

//     if (editMode) {
//       const updated = data.map((item) =>
//         item.id === editingRecord.id
//           ? {
//               ...item,
//               ...values,
//               updatedDt: now,
//               updatedBy: "admin", // hardcoded or use logged-in user
//             }
//           : item
//       );
//       setData(updated);
//       setFilteredData(updated);
//       message.success("FAQ updated!");
//     } else {
//       const newId = data.length + 1;
//       const newEntry = {
//         id: newId,
//         key: newId.toString(),
//         ...values,
//         creationDate: now,
//         updatedDt: now,
//         updatedBy: "admin",
//       };
//       const newList = [...data, newEntry];
//       setData(newList);
//       setFilteredData(newList);
//       message.success("FAQ added!");
//     }

//     setIsModalVisible(false);
//   });
// };


//   const columns = [
//     {
//       title: "#FAQ No",
//       dataIndex: "id",
//       key: "id",
//     },
//     {
//       title: "FAQ Title",
//       dataIndex: "title",
//       key: "title",
//     },
//     {
//       title: "FAQ Description",
//       dataIndex: "description",
//       key: "description",
//       ellipsis: true,
//       width:300,
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//         <Tag style={{ backgroundColor: status === "Active" ? "#2fb344" : "#d63939", color: "#fff" }}>{status}</Tag>
//       ),
//     },
//     // {
//     //   title: "Creation Date",
//     //   dataIndex: "creationDate",
//     //   key: "creationDate",
//     // },
//     {
//       title: "Updated Dt",
//       dataIndex: "updatedDt",
//       key: "updatedDt",
//     },
//     // {
//     //   title: "Updated By",
//     //   dataIndex: "updatedBy",
//     //   key: "updatedBy",
//     // },
//     {
//       title: "Action",
//       key: "action",
//       width:120,
    
//       render: (_, record) => (
//         <Space>
//             <Button type="link"
//                                            icon={ <EyeOutlined />}
//                                                    onClick={() => showViewModal(record)}
//                                                  style={{ backgroundColor: "#F0720B", borderColor: "#F0720B", color: "#fff" }}/>
//           <Button icon={<EditOutlined />} onClick={() => showEditModal(record)} type="primary" />
//          <Button
//   icon={<DeleteOutlined style={{ color: "#ffffff" }} />}
//   onClick={() => handleDelete(record)}
//   style={{
//     backgroundColor: "#d63939",
//     borderColor: "#d63939",
//     color: "#ffffff",
//   }}
// />
 

//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 20, background: "#fff", borderRadius: 10 }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
//         <h2 style={{ fontSize: 20, fontWeight: 600 }}>FAQ User</h2>
//         <div style={{ display: "flex", gap: 10 }}>
//           <Input
//             placeholder="Search by FAQ title"
//             onChange={(e) => handleSearch(e.target.value)}
//             value={searchText}
//             allowClear
//             style={{ minWidth: 280 }}
//           />
//           <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>Add FAQ</Button>
//         </div>
//       </div>

//       <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 10 }} scroll={{x: 1000  }}  rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")} />

//       <Modal
//         title={editMode ? "Edit FAQ" : "Add FAQ"}
//         open={isModalVisible}
//         onOk={handleOk}
//         onCancel={() => setIsModalVisible(false)}
//         okText={editMode ? "Update" : "Add"}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item name="title" label="FAQ Title" rules={[{ required: true, message: "Please enter FAQ title" }]}> <Input /> </Form.Item>
//           <Form.Item name="description" label="FAQ Description" rules={[{ required: true, message: "Please enter description" }]}> <Input.TextArea rows={3} /> </Form.Item>
//           <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select status" }]}> <Select placeholder="Select status"> <Option value="Active">Active</Option> <Option value="Inactive">Inactive</Option> </Select> </Form.Item>
//           {/* <Form.Item name="creationDate" label="Creation Date" rules={[{ required: true, message: "Enter creation date" }]}> <Input /> </Form.Item>
//           <Form.Item name="updatedDt" label="Updated Date" rules={[{ required: true, message: "Enter update date" }]}> <Input /> </Form.Item>
//           <Form.Item name="updatedBy" label="Updated By" rules={[{ required: true, message: "Enter updater name" }]}> <Input /> </Form.Item> */}
//         </Form>
//       </Modal>
//          <Modal
//                   title="FAQ User"
//                   open={viewModalVisible}
//                   onCancel={() => setViewModalVisible(false)}
//                   footer={null}
//                 >
//                   {selectedRecord && (
//                     <Space direction="vertical" size="middle" style={{ marginTop: 12 }}>
//                       <div>
//                         <strong>Created Date:</strong>{" "}
//                         {dayjs(selectedRecord.createdDate).format("DD-MM-YYYY HH:mm")}
//                       </div>
//                       <div>
//                         <strong>Updated By:</strong> {selectedRecord.updatedBy}
//                       </div>
//                     </Space>
//                   )}
//                 </Modal>
//     </div>
//   );
// };

// export default FaqUser;



import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Button,
  Input,
  Space,
  Modal,
  Form,
  Select,
  message,
} from "antd";
import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import api from "./api";

const { Option } = Select;

const FaqUser = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Load FAQ list from API
  const fetchFaqs = async () => {
    try {
      const res = await api.get("admin/master/master-data/faqs");
      if (res.data.success) {
        setData(res.data.data);
        setFilteredData(res.data.data);
      } else {
        message.error("Failed to load FAQs");
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      message.error("Failed to load FAQs");
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const showAddModal = () => {
    setEditMode(false);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setEditMode(true);
    setEditingRecord(record);
    form.setFieldsValue({
      title: record.title,
      description: record.description.replace(/<[^>]+>/g, ""), // strip HTML tags if any
      status: record.status === 1 ? "Active" : "Inactive",
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Delete this FAQ?",
      content: `"${record.title}" will be removed.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const res = await api.delete(`admin/master/master-data/faqs/${record.id}`);
          if (res.data.success) {
            message.success("FAQ deleted successfully!");
            fetchFaqs();
          } else {
            message.error("Delete failed.");
          }
        } catch (err) {
          console.error("Delete failed:", err);
          message.error("Failed to delete FAQ.");
        }
      },
    });
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const payload = {
        title: values.title,
        description: values.description,
        faqfor: 1, // hardcoded as per your example, update if needed
        status: values.status === "Active" ? 1 : 0,
      };

      try {
        if (editMode) {
          // Update FAQ
          const res = await api.put(
            `admin/master/master-data/faqs/${editingRecord.id}`,
            payload
          );
          if (res.data.success) {
            message.success("FAQ updated!");
            fetchFaqs();
            setIsModalVisible(false);
          } else {
            message.error("Update failed.");
          }
        } else {
          // Add FAQ
          const res = await api.post("admin/master/master-data/faqs", payload);
          if (res.data.success) {
            message.success("FAQ added!");
            fetchFaqs();
            setIsModalVisible(false);
          } else {
            message.error("Add failed.");
          }
        }
      } catch (err) {
        console.error("Save failed:", err);
        message.error("Failed to save FAQ.");
      }
    });
  };

  const showViewModal = (record) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };

  const columns = [
    {
      title: "#FAQ No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "FAQ Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "FAQ Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: 300,
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />, // Render HTML safely
    },
    {
      title: "Status",
      dataIndex: "status_text",
      key: "status_text",
      render: (status) => (
        <Tag
          style={{
            backgroundColor: status === "Active" ? "#2fb344" : "#d63939",
            color: "#fff",
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Updated Dt",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => showViewModal(record)}
            style={{
              backgroundColor: "#F0720B",
              borderColor: "#F0720B",
              color: "#fff",
            }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            type="primary"
          />
          <Button
            icon={<DeleteOutlined style={{ color: "#ffffff" }} />}
            onClick={() => handleDelete(record)}
            style={{
              backgroundColor: "#d63939",
              borderColor: "#d63939",
              color: "#ffffff",
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20, background: "#fff", borderRadius: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>FAQ User</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <Input
            placeholder="Search by FAQ title"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            allowClear
            style={{ minWidth: 280 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showAddModal}
          >
            Add FAQ
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
        rowKey="id"
        rowClassName={(_, index) =>
          index % 2 === 0 ? "table-row-white" : "table-row-gray"
        }
      />

      <Modal
        title={editMode ? "Edit FAQ" : "Add FAQ"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editMode ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="FAQ Title"
            rules={[{ required: true, message: "Please enter FAQ title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="FAQ Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select placeholder="Select status">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="FAQ Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
      >
        {selectedRecord && (
          <Space direction="vertical" size="middle" style={{ marginTop: 12 }}>
            <div>
              <strong>Created Date:</strong>{" "}
              {dayjs(selectedRecord.created_at).format("DD-MM-YYYY HH:mm")}
            </div>
            <div>
              <strong>Updated Date:</strong>{" "}
              {dayjs(selectedRecord.updated_at).format("DD-MM-YYYY HH:mm")}
            </div>
            <div>
              <strong>Status:</strong> {selectedRecord.status_text}
            </div>
            <div>
              <strong>Description:</strong>
              <div
                dangerouslySetInnerHTML={{ __html: selectedRecord.description }}
                style={{ marginTop: 8 }}
              />
            </div>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default FaqUser;
