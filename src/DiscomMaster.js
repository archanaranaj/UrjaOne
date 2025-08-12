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
// import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

// const { Option } = Select;

// const initialData = [
//   {
//     key: "1",
//     id: 1,
//     name: "Maharashtra State Electricity Distribution Co. Ltd.",
//     status: "Active",
//     state: "Maharashtra",
//   },
//   {
//     key: "2",
//     id: 2,
//     name: "Tamil Nadu Generation and Distribution Corporation",
//     status: "Inactive",
//     state: "Tamil Nadu",
//   },
//   {
//     key: "3",
//     id: 3,
//     name: "Gujarat Urja Vikas Nigam Ltd.",
//     status: "Active",
//     state: "Gujarat",
//   },
// ];


// const DiscomMaster = () => {
//   const [discoms, setDiscoms] = useState(initialData);
//   const [filteredData, setFilteredData] = useState(initialData);
//   const [searchText, setSearchText] = useState("");

//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [form] = Form.useForm();
//   const [editingRecord, setEditingRecord] = useState(null);

//   const handleSearch = (value) => {
//     setSearchText(value);
//     const filtered = discoms.filter((item) =>
//       item.name.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   const showAddModal = () => {
//     setEditMode(false);
//     form.resetFields();
//     setIsModalVisible(true);
//   };
//   const handleDelete = (record) => {
//   Modal.confirm({
//     title: "Are you sure you want to delete this discom?",
//     content: `"${record.name}" will be permanently removed.`,
//     okText: "Yes",
//     okType: "danger",
//     cancelText: "No",
//     onOk() {
//       const updatedList = discoms.filter((item) => item.id !== record.id);
//       setDiscoms(updatedList);
//       setFilteredData(updatedList);
//       message.success("Discom deleted successfully!");
//     },
//   });
// };


//   const showEditModal = (record) => {
//     setEditMode(true);
//     setEditingRecord(record);
//     form.setFieldsValue(record);
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     form.validateFields().then((values) => {
//       if (editMode) {
//         const updated = discoms.map((item) =>
//           item.id === editingRecord.id ? { ...item, ...values } : item
//         );
//         setDiscoms(updated);
//         setFilteredData(updated);
//         message.success("Discom updated!");
//       } else {
//         const newId = discoms.length + 1;
//         const newEntry = {
//           id: newId,
//           key: newId.toString(),
//           ...values,
//         };
//         const newList = [...discoms, newEntry];
//         setDiscoms(newList);
//         setFilteredData(newList);
//         message.success("Discom added!");
//       }
//       setIsModalVisible(false);
//     });
//   };

//   const columns = [
//     {
//       title: "#S.No",
//       dataIndex: "id",
//       key: "id",
//       sorter: (a, b) => a.id - b.id,
//     },
//     {
//       title: "Discom Name",
//       dataIndex: "name",
//       key: "name",
//       render: (text) => highlightText(text, searchText),
//     },
//     {
//   title: "State",
//   dataIndex: "state",
//   key: "state",
// },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//          <Tag
//                                        style={{
//                                          backgroundColor: status === "Active" ? "#2fb344" : "#d63939", // dark green / dark red
//                                          color: "#ffffff", // white text
//                                          border: "none",
//                                        }}
//                                      >
//                                        {status}
//                                      </Tag>
//       ),
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Space>
//           <Button
//             icon={<EditOutlined />}
//             onClick={() => showEditModal(record)}
//             type="primary"
//           />
//                <Button
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

//   const highlightText = (text, search) => {
//     if (!search) return text;
//     const regex = new RegExp(`(${search})`, "gi");
//     return text.split(regex).map((part, index) =>
//       part.toLowerCase() === search.toLowerCase() ? (
//         <span key={index} style={{ backgroundColor: "yellow" }}>{part}</span>
//       ) : (
//         part
//       )
//     );
//   };

//   return (
//     <div style={{ padding: "20px", background: "#fff", borderRadius:"10px" }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "16px",
//           flexWrap: "wrap",
//           gap: "10px",
//         }}
//       >
//         <h2 style={{ fontSize: 20, fontWeight: 600 }}>Discom Master</h2>
//         <div style={{ display: "flex", gap: "10px" }}>
//           <Input
//             placeholder="Search by discom name"
//             onChange={(e) => handleSearch(e.target.value)}
//             value={searchText}
//             allowClear
//             style={{ minWidth: 280 }}
//           />
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={showAddModal}
//           >
//             Add Discom
//           </Button>
//         </div>
//       </div>

//       <Table
//         columns={columns}
//         dataSource={filteredData}
//         scroll={{ x: "max-content" }}
//         pagination={{ pageSize: 10 }}
//          rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")}
//       />

//       <Modal
//         title={editMode ? "Edit Discom" : "Add Discom"}
//         open={isModalVisible}
//         onOk={handleOk}
//         onCancel={() => setIsModalVisible(false)}
//         okText={editMode ? "Update" : "Add"}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="name"
//             label="Discom Name"
//             rules={[{ required: true, message: "Please enter discom name" }]}
//           >
//             <Input placeholder="e.g. Maharashtra State Electricity Board" />
//           </Form.Item>
//           <Form.Item
//   name="state"
//   label="State"
//   rules={[{ required: true, message: "Please select a state" }]}
// >
//   <Select placeholder="Select state">
//     <Option value="Maharashtra">Maharashtra</Option>
//     <Option value="Tamil Nadu">Tamil Nadu</Option>
//     <Option value="Gujarat">Gujarat</Option>
//     <Option value="Rajasthan">Rajasthan</Option>
//     <Option value="Punjab">Punjab</Option>
//     {/* Add more as needed */}
//   </Select>
// </Form.Item>

//           <Form.Item
//             name="status"
//             label="Status"
//             rules={[{ required: true, message: "Please select status" }]}
//           >
//             <Select placeholder="Select status">
//               <Option value="Active">Active</Option>
//               <Option value="Inactive">Inactive</Option>
//             </Select>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default DiscomMaster;

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
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import api from "./api"; // adjust path as needed

const { Option } = Select;
const { confirm: modalConfirm } = Modal;

const DiscomMaster = () => {
  const [discoms, setDiscoms] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    fetchDiscoms();
  }, []);

  const fetchDiscoms = async () => {
    try {
      const res = await api.get("admin/master/master-data/discom-masters");
      if (res.data.success) {
        // Map API data, note 'state' is not part of API, so set to empty or maintain previous?
        const data = res.data.data.map((item) => ({
          key: item.id.toString(),
          id: item.id,
          name: item.name,
          status: item.status_text,
          statusRaw: item.status,
          state: item.state?.name || "",
        }));
        setDiscoms(data);
        setFilteredData(data);
      } else {
        message.error("Failed to fetch discom masters.");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch discom masters.");
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = discoms.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
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
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    modalConfirm({
      title: "Are you sure you want to delete this discom?",
      content: `"${record.name}" will be permanently removed.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          await api.delete(`admin/master/master-data/discom-masters/${record.id}`);
          message.success("Discom deleted successfully!");
          fetchDiscoms();
        } catch (error) {
          console.error(error);
          message.error("Failed to delete discom.");
        }
      },
    });
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        const payload = {
          name: values.name,
          status: values.status === "Active" ? 1 : 0,
          state_id: values.state_id
          // 'state' not in API spec, so not sent
        };

        if (editMode) {
          await api.put(
            `admin/master/master-data/discom-masters/${editingRecord.id}`,
            payload
          );
          message.success("Discom updated!");
        } else {
          await api.post("admin/master/master-data/discom-masters", payload);
          message.success("Discom added!");
        }

        setIsModalVisible(false);
        fetchDiscoms();
      } catch (error) {
        console.error(error);
        message.error("Failed to save discom.");
      }
    });
  };

  const columns = [
    {
      title: "#S.No",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Discom Name",
      dataIndex: "name",
      key: "name",
      render: (text) => highlightText(text, searchText),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      // state is local only, editable but no API support
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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
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

  const highlightText = (text, search) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };
//   const STATES = [
//   { id: 4023, name: "Andaman and Nicobar Islands" },
//   { id: 4024, name: "Tamil Nadu" },
//   { id: 4025, name: "Maharashtra" },
//   { id: 4026, name: "Punjab" },
//   { id: 4027, name: "Rajasthan" },
//   // Add more as needed
// ];


  return (
    <div style={{ padding: "20px", background: "#fff", borderRadius: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Discom Master</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <Input
            placeholder="Search by discom name"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            allowClear
            style={{ minWidth: 280 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
            Add Discom
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: "max-content" }}
        pagination={{ pageSize: 10 }}
        rowClassName={(_, index) =>
          index % 2 === 0 ? "table-row-white" : "table-row-gray"
        }
      />

      <Modal
        title={editMode ? "Edit Discom" : "Add Discom"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editMode ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Discom Name"
            rules={[{ required: true, message: "Please enter discom name" }]}
          >
            <Input placeholder="e.g. Maharashtra State Electricity Board" />
          </Form.Item>

         <Form.Item
  name="state_id"
  label="State"
  rules={[{ required: true, message: "Please select a state" }]}
>
  {/* <Select placeholder="Select state">
    {STATES.map((state) => (
      <Option key={state.id} value={state.id}>
        {state.name}
      </Option>
    ))}
  </Select> */}
  <Input placeholder="e.g. Maharashtra" />
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
    </div>
  );
};

export default DiscomMaster;
