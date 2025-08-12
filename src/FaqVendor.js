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
import api from "./api";  // import axios instance with token support
import axios from "axios";

const { Option } = Select;

const FaqVendor = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const BASE_PATH = "admin/master/master-data/faqsvendor";

  // Fetch FAQ vendor list
  const fetchFaqs = async () => {
    try {
      const res = await api.get(BASE_PATH);
      if (res.data.success) {
        const apiData = res.data.data.map((item) => ({
          ...item,
          key: item.id.toString(),
          status: item.status_text,
          updatedDt: dayjs(item.updated_at).format("YYYY-MM-DD"),
          creationDate: dayjs(item.created_at).format("YYYY-MM-DD"),
          updatedBy: "admin", // or get dynamically if you have user info
        }));
        setData(apiData);
        setFilteredData(apiData);
      } else {
        message.error("Failed to fetch FAQs");
      }
    } catch (error) {
      message.error("Failed to fetch FAQs");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter((item) =>
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
      position: record.position,
      description: record.description,
      status: record.status === "Active" ? 1 : 0,
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
          const res = await api.delete(`${BASE_PATH}/${record.id}`);
          if (res.data.success) {
            message.success("FAQ deleted successfully!");
            fetchFaqs();
          } else {
            message.error("Failed to delete FAQ");
          }
        } catch (error) {
          message.error("Failed to delete FAQ");
        }
      },
    });
  };
const handleOk = async () => {
  try {
    const values = await form.validateFields();

    const payload = {
      name: values.name,             // <-- use name instead of title
      position: values.position, 
      description: values.description,
      faqfor: 2,                     // as per your example
      status: Number(values.status), // API expects 1 or 0 for status (number)
    };

    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    if (editMode) {
      await api.put(`${BASE_PATH}/${editingRecord.id}`, payload);
      message.success("FAQ updated!");
    } else {
      await api.post(BASE_PATH, payload, config);
      message.success("FAQ added!");
    }

    setIsModalVisible(false);
    fetchFaqs();
  } catch (error) {
    if (error.response) {
      console.error("Server responded with:", error.response.data);
      message.error(`Error: ${error.response.data.message || "Failed to save FAQ"}`);
    } else {
      console.error("Save FAQ error:", error.message);
      message.error("Failed to save FAQ");
    }
  }
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
      dataIndex: "name",
      key: "name",
    },
    {
      title: "FAQ Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "FAQ Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: 300,
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
      title: "Updated Dt",
      dataIndex: "updatedDt",
      key: "updatedDt",
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
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>FAQ Vendor</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <Input
            placeholder="Search by FAQ title"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            allowClear
            style={{ minWidth: 280 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
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
  name="name"
  label="Name"
  rules={[{ required: true, message: "Please input the FAQ name" }]}
>
  <Input />
</Form.Item>

          <Form.Item
            name="position"
            label="FAQ Position"
            rules={[{ required: true, message: "Please enter FAQ position" }]}
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
              <Option value={1}>Active</Option>
              <Option value={0}>Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="FAQ Vendor"
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
                style={{ marginTop: 8 }}
              >
                {selectedRecord.description}
              </div>
            </div>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default FaqVendor;
