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
//     usage: "User",
//     majorType: "Technical",
//     minorType: "Login",
//     status: "Active",
//     creationDate: "2024-05-01",
//     updatedDt: "2024-06-15",
//     updatedBy: "admin",
//   },
//   {
//     key: "2",
//     id: 2,
//     usage: "Vendor",
//     majorType: "Payment",
//     minorType: "Invoice",
//     status: "Inactive",
//     creationDate: "2024-04-20",
//     updatedDt: "2024-05-10",
//     updatedBy: "editor",
//   },
// ];

// const TicketCategories = () => {
//   const [data, setData] = useState(initialData);
//   const [filteredData, setFilteredData] = useState(initialData);
//   const [searchText, setSearchText] = useState("");
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [editingRecord, setEditingRecord] = useState(null);
//   const [form] = Form.useForm();
//  const [viewModalVisible, setViewModalVisible] = useState(false);
//  const [selectedRecord, setSelectedRecord] = useState(null);
//  const showViewModal = (record) => {
//    setSelectedRecord(record);
//    setViewModalVisible(true);
//  };
//   const handleSearch = (value) => {
//     setSearchText(value);
//     const filtered = data.filter((item) =>
//       item.majorType.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   const showAddModal = () => {
//     setEditMode(false);
//     form.resetFields();
//     setIsModalVisible(true);
//   };

//   const showEditModal = (record) => {
//     setEditMode(true);
//     setEditingRecord(record);
//     form.setFieldsValue(record);
//     setIsModalVisible(true);
//   };

//   const handleDelete = (record) => {
//     Modal.confirm({
//       title: "Delete this ticket type?",
//       content: `"${record.majorType}" will be removed.`,
//       okText: "Yes",
//       okType: "danger",
//       cancelText: "No",
//       onOk: () => {
//         const newList = data.filter((item) => item.id !== record.id);
//         setData(newList);
//         setFilteredData(newList);
//         message.success("Ticket deleted successfully!");
//       },
//     });
//   };

//   const handleOk = () => {
//     form.validateFields().then((values) => {
//       if (editMode) {
//         const updated = data.map((item) =>
//           item.id === editingRecord.id ? { ...item, ...values } : item
//         );
//         setData(updated);
//         setFilteredData(updated);
//         message.success("Ticket updated!");
//       } else {
//         const newId = data.length + 1;
//         const newEntry = {
//           id: newId,
//           key: newId.toString(),
//           ...values,
//         };
//         const newList = [...data, newEntry];
//         setData(newList);
//         setFilteredData(newList);
//         message.success("Ticket added!");
//       }
//       setIsModalVisible(false);
//     });
//   };

//   const columns = [
//     {
//       title: "#Ticket ID",
//       dataIndex: "id",
//       key: "id",
//     },
//     {
//       title: "Usage",
//       dataIndex: "usage",
//       key: "usage",
//     },
//     {
//       title: "Major Type",
//       dataIndex: "majorType",
//       key: "majorType",
//     },
//     {
//       title: "Minor Type",
//       dataIndex: "minorType",
//       key: "minorType",
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
//     //   title: "Created Date",
//     //   dataIndex: "creationDate",
//     //   key: "creationDate",
//     // },
//     {
//       title: "Updated Date",
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
//       width: 120,
//       render: (_, record) => (
//         <Space>
//           <Button icon={<EditOutlined />} onClick={() => showEditModal(record)} type="primary"/>
//           <Button
//   icon={<DeleteOutlined style={{ color: "#ffffff" }} />}
//   onClick={() => handleDelete(record)}
//   style={{
//     backgroundColor: "#d63939",
//     borderColor: "#d63939",
//     color: "#ffffff",
//   }}
// />
// <Button  icon={<EyeOutlined style={{ color: "#206bc4" }} />} type="link"
//            onClick={() => showViewModal(record)}>
         
//         </Button>


//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 20, background: "#fff", borderRadius: 10 }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
//         <h2 style={{ fontSize: 20, fontWeight: 600 }}>Ticket Categories</h2>
//         <div style={{ display: "flex", gap: 10 }}>
//           <Input
//             placeholder="Search by Major Type"
//             onChange={(e) => handleSearch(e.target.value)}
//             value={searchText}
//             allowClear
//             style={{ minWidth: 280 }}
//           />
//           <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>Add </Button>
//         </div>
//       </div>

//       <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 10 }} scroll={{ x: 1000 }}  rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")} />

//       <Modal
//         title={editMode ? "Edit Ticket" : "Add Ticket"}
//         open={isModalVisible}
//         onOk={handleOk}
//         onCancel={() => setIsModalVisible(false)}
//         okText={editMode ? "Update" : "Add"}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item name="usage" label="Ticket Usage" rules={[{ required: true, message: "Please select usage" }]}> <Select placeholder="Select usage"> <Option value="User">User</Option> <Option value="Vendor">Vendor</Option> </Select> </Form.Item>
//           <Form.Item name="majorType" label="Ticket Major Type" rules={[{ required: true, message: "Please enter major type" }]}> <Input maxLength={20} /> </Form.Item>
//           <Form.Item name="minorType" label="Ticket Minor Type" rules={[{ required: true, message: "Please enter minor type" }]}> <Input maxLength={20} /> </Form.Item>
//           <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select status" }]}> <Select placeholder="Select status"> <Option value="Active">Active</Option> <Option value="Inactive">Inactive</Option> </Select> </Form.Item>
//           {/* <Form.Item name="creationDate" label="Created Date" rules={[{ required: true, message: "Enter creation date" }]}> <Input /> </Form.Item>
//           <Form.Item name="updatedDt" label="Updated Date" rules={[{ required: true, message: "Enter update date" }]}> <Input /> </Form.Item>
//           <Form.Item name="updatedBy" label="Updated By" rules={[{ required: true, message: "Enter updater name" }]}> <Input /> </Form.Item> */}
//         </Form>
//       </Modal>
//       <Modal
//                 title="Ticket Categories"
//                 open={viewModalVisible}
//                 onCancel={() => setViewModalVisible(false)}
//                 footer={null}
//               >
//                 {selectedRecord && (
//                   <Space direction="vertical" size="middle" style={{ marginTop: 12 }}>
//                     <div>
//                       <strong>Created Date:</strong>{" "}
//                       {dayjs(selectedRecord.createdDate).format("DD-MM-YYYY HH:mm")}
//                     </div>
//                     <div>
//                       <strong>Updated By:</strong> {selectedRecord.updatedBy}
//                     </div>
//                   </Space>
//                 )}
//               </Modal>
              
      
//     </div>
//   );
// };


// export default TicketCategories;



import React, { useState } from "react";
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
const { Option } = Select;

const initialData = [
  {
    key: "1",
    id: 1,
    usage: "User",
    majorType: "Technical",
    minorType: "Login",
    status: "Active",
    creationDate: "2024-05-01",
    updatedDt: "2024-06-15",
    updatedBy: "admin",
  },
  {
    key: "2",
    id: 2,
    usage: "Vendor",
    majorType: "Payment",
    minorType: "Invoice",
    status: "Inactive",
    creationDate: "2024-04-20",
    updatedDt: "2024-05-10",
    updatedBy: "editor",
  },
];

const TicketCategories = () => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const showViewModal = (record) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter((item) =>
      item.majorType.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const showAddModal = () => {
    setEditMode(false);
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setEditMode(true);
    setEditingRecord(record);
    form.setFieldsValue({
      usage: record.usage,
      majorType: record.majorType,
      minorType: record.minorType,
      status: record.status,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Delete this ticket type?",
      content: `"${record.majorType}" will be removed.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        const newList = data.filter((item) => item.id !== record.id);
        setData(newList);
        setFilteredData(newList);
        message.success("Ticket deleted successfully!");
      },
    });
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const now = dayjs().format("YYYY-MM-DD");
      const updatedBy = "admin"; // Replace with actual user if needed

      if (editMode && editingRecord) {
        const updated = data.map((item) =>
          item.id === editingRecord.id
            ? {
                ...item,
                ...values,
                updatedDt: now,
                updatedBy,
              }
            : item
        );
        setData(updated);
        setFilteredData(updated);
        message.success("Ticket updated!");
      } else {
        const newId = data.length + 1;
        const newEntry = {
          id: newId,
          key: newId.toString(),
          ...values,
          creationDate: now,
          updatedDt: now,
          updatedBy,
        };
        const newList = [...data, newEntry];
        setData(newList);
        setFilteredData(newList);
        message.success("Ticket added!");
      }

      form.resetFields();
      setIsModalVisible(false);
      setEditMode(false);
      setEditingRecord(null);
    });
  };

  const columns = [
    {
      title: "#Ticket ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Usage",
      dataIndex: "usage",
      key: "usage",
    },
    {
      title: "Major Type",
      dataIndex: "majorType",
      key: "majorType",
    },
    {
      title: "Minor Type",
      dataIndex: "minorType",
      key: "minorType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
      title: "Updated Date",
      dataIndex: "updatedDt",
      key: "updatedDt",
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space>
            <Button type="link"
                                           icon={ <EyeOutlined />}
                                                   onClick={() => showViewModal(record)}
                                                 style={{ backgroundColor: "#F0720B", borderColor: "#F0720B", color: "#fff" }}/>
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
    <div
      style={{
        padding: 20,
        background: "#fff",
        borderRadius: 10,
      }}
    >
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
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Ticket Categories</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <Input
            placeholder="Search by Major Type"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            allowClear
            style={{ minWidth: 280 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
            Add
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
        rowClassName={(_, index) =>
          index % 2 === 0 ? "table-row-white" : "table-row-gray"
        }
      />

      <Modal
        title={editMode ? "Edit Ticket" : "Add Ticket"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        okText={editMode ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="usage"
            label="Ticket Usage"
            rules={[{ required: true, message: "Please select usage" }]}
          >
            <Select placeholder="Select usage">
              <Option value="User">User</Option>
              <Option value="Vendor">Vendor</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="majorType"
            label="Ticket Major Type"
            rules={[{ required: true, message: "Please enter major type" }]}
          >
            <Input maxLength={20} />
          </Form.Item>
          <Form.Item
            name="minorType"
            label="Ticket Minor Type"
            rules={[{ required: true, message: "Please enter minor type" }]}
          >
            <Input maxLength={20} />
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
        title="Ticket Categories"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
      >
        {selectedRecord && (
          <Space direction="vertical" size="middle" style={{ marginTop: 12 }}>
            <div>
              <strong>Created Date:</strong>{" "}
              {dayjs(selectedRecord.creationDate).format("DD-MM-YYYY")}
            </div>
            <div>
              <strong>Updated By:</strong> {selectedRecord.updatedBy}
            </div>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default TicketCategories;
