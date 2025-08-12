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
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import api from "./api"; // Adjust if needed

const { Option } = Select;
const { confirm: modalConfirm } = Modal; // renamed to avoid conflict with global confirm

const initialData = [
  {
    key: "1",
    id: 1,
    name: "Fixed Tilt",
    status: "Active",
  },
  {
    key: "2",
    id: 2,
    name: "Single Axis Tracker",
    status: "Inactive",
  },
  {
    key: "3",
    id: 3,
    name: "Dual Axis Tracker",
    status: "Active",
  },
];

const PlantStructure = () => {
  const [structureTypes, setStructureTypes] = useState([]);
const [filteredData, setFilteredData] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = structureTypes.filter((item) =>
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
  form.setFieldsValue({
    name: record.name,
    status: record.status, // "Active" or "Inactive"
  });
  setIsModalVisible(true);
};
const handleDelete = (record) => {
  console.log("Delete clicked for:", record);
  
  modalConfirm({
    title: "Are you sure you want to delete this structure type?",
    content: `"${record.name}" will be permanently deleted.`,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk: () => {
      console.log("Modal confirmed, calling delete API...");
      return api.delete(`admin/master/master-data/plant-structure-types/${record.id}`)
        .then(res => {
          console.log("Delete API response:", res.data);
          if (res.data.success) {
            message.success("Structure Type deleted!");
            // Remove deleted record locally from state to update UI immediately
            setStructureTypes(prev => prev.filter(item => item.id !== record.id));
            setFilteredData(prev => prev.filter(item => item.id !== record.id));
          } else {
            message.error(res.data.message || "Delete failed");
            return Promise.reject(new Error("Delete failed"));
          }
        })
        .catch(err => {
          console.error("Delete API error:", err);
          message.error("Failed to delete structure type.");
          return Promise.reject(err);
        });
    },
    onCancel: () => {
      console.log("Delete cancelled by user");
      message.info("Delete cancelled");
    },
  });
};

 const handleOk = () => {
  form.validateFields().then(async (values) => {
    try {
      const payload = {
        name: values.name,
        status: values.status === "Active" ? 1 : 0,
      };

      if (editMode) {
        await api.put(
          `admin/master/master-data/plant-structure-types/${editingRecord.id}`,
          payload
        );
        message.success("Structure Type updated!");
      } else {
        await api.post("admin/master/master-data/plant-structure-types", payload);
        message.success("Structure Type added!");
      }

      setIsModalVisible(false);
      fetchStructureTypes();
    } catch (err) {
      console.error("Save error:", err);
      message.error("Failed to save structure type.");
    }
  });
};


useEffect(() => {
  fetchStructureTypes();
}, []);

const fetchStructureTypes = async () => {
  try {
    const res = await api.get("admin/master/master-data/plant-structure-types");
    if (res.data.success) {
      const data = res.data.data.map((item) => ({
        key: item.id.toString(),
        id: item.id,
        name: item.name,
        status: item.status_text,
        statusRaw: item.status,
      }));
      setStructureTypes(data);
      setFilteredData(data);
    }
  } catch (err) {
    console.error("Fetch error:", err);
    message.error("Failed to fetch plant structure types.");
  }
};

  const columns = [
    {
      title: "#S.No",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Structure Type",
      dataIndex: "name",
      key: "name",
      render: (text) => highlightText(text, searchText),
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
  icon={<DeleteOutlined style={{ color: "#fff" }} />}
  onClick={() => handleDelete(record)}
  style={{
    backgroundColor: "#d63939",
    borderColor: "#d63939",
    color: "#fff",
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

  return (
    <div style={{ padding: "20px", background: "#fff", borderRadius:"10px" }}>
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
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Plant Structure Type</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <Input
            placeholder="Search by structure type"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            allowClear
            style={{ minWidth: 280 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
            Add Structure Type
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: "max-content" }}
        pagination={{ pageSize: 10 }}
         rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")}
      />

      {/* Add / Edit Modal */}
      <Modal
        title={editMode ? "Edit Structure Type" : "Add Structure Type"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editMode ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Structure Type"
            rules={[{ required: true, message: "Please enter structure type" }]}
          >
            <Input placeholder="e.g. RCC Structure / Tinshed Structure / Ground Mounted / Pergola / Others" />
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

export default PlantStructure;
