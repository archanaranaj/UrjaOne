

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

const PlantCategory = () => {
  const [categories, setCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("admin/master/master-data/plant-categories");
      if (res.data.success) {
        const data = res.data.data.map((item) => ({
          key: item.id.toString(),
          id: item.id,
          name: item.name,
          status: item.status_text,
          statusRaw: item.status,
        }));
        setCategories(data);
        setFilteredData(data);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch plant categories.");
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = categories.filter((item) =>
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
      status: record.status,
    });
    setIsModalVisible(true);
  };

const handleDelete = (record) => {
  console.log("Delete clicked for:", record);

  modalConfirm({
    title: "Are you sure you want to delete this category?",
    content: `"${record.name}" will be permanently deleted.`,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk: () => {
      console.log("Modal confirmed, sending delete request");
      return api.delete(`admin/master/master-data/plant-categories/${record.id}`)
        .then(() => {
          message.success("Category deleted successfully!");
          fetchCategories();
        })
        .catch((error) => {
          console.error(error);
          message.error("Failed to delete category.");
          return Promise.reject(error);
        });
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
            `admin/master/master-data/plant-categories/${editingRecord.id}`,
            payload
          );
          message.success("Plant category updated!");
        } else {
          await api.post("admin/master/master-data/plant-categories", payload);
          message.success("Plant category added!");
        }

        setIsModalVisible(false);
        fetchCategories();
      } catch (error) {
        console.error(error);
        message.error("Failed to save category.");
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
      title: "Category Name",
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
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Plant Category</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <Input
            placeholder="Search by category name"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            allowClear
            style={{ minWidth: 280 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
            Add Category
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

      <Modal
        title={editMode ? "Edit Category" : "Add Category"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editMode ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input placeholder="e.g. Residential / Commercial / Industrial / Others" />
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

export default PlantCategory;
