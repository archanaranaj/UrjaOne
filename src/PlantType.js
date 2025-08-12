

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
import axios from "axios";

const { Option } = Select;
const { confirm } = Modal;

const BASE_URL = "http://13.201.150.234/t2/api/";
const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWNiYTJmOTY1YzEzNmEzYzgyOWQxMjE2NjQ4YTAyOGZmODVhNGQyOGJlZDNlOWY3YzY0ZjJmYWRkMjk4YzdhZGIxM2ZmMGY0YjU0NjhlZmQiLCJpYXQiOjE3NTQ4ODk5NDkuNjYwMjk4LCJuYmYiOjE3NTQ4ODk5NDkuNjYwMzAyLCJleHAiOjE3ODY0MjU5NDkuNjQ5ODE5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.MNhyeRUjB-Fx9p9-6CAFRf42wteF3Q0Qb4i-9rvT6mkuXeVEhe91tgtCyENV_0HPRfu23ZmR1kbZ2n6XA4WnYAQY6rKGePI8r97frKUvHc94Sk2PnVNmaThoeDd8A0ee1OiwH3MIfsuzcnrpBn6TZS14LGiwyE09nktdFxu6e2kbllap_sTeIpcnRuKbCX48fAgLhZsOpTw_YnysXoHkFF8wHNqe9Uhayr5TF9NZ-92V7Cs_aHfJMMsTd60sCG9xBnRaYGCB69UHmPaDT2eBaZMzWZOApUNDcS9mRbEUhdwT8vTF3m121_uCPy3ac1o35PdM_nYTCIvaqRap0hu6USrCo7evn4bdgXgfb3m9yagf-zT1TjbRmYwJmhGy_EaJauiFwqt1HIDpEpRcRjOhF0R3j0i-oQQEjDKOIEn27wAZSN1GNer5a48mQYOqBXYA4_fxf6QRiARkbnmcKLwaCplV6qv2039b-5guMKCC-VceNxSp7El-QTDff-GLrb94GNoOZX7HDT5MGaMgaGU35RY6Y-W-gUtHAlYLNU_4bXsoW7_p4U9UWWkKZMMW0G4H0sZW0-Lna_1dtxI2XRBBFQ9_S7D6axxQriOXWWtRe0JoBN7IQn9bF_yuEsL-gQqRJL93tANSFGft2qZ21PUVdkfifTJyz5rVz1IR7WpK6xY"; // replace with your real token

const PlantType = () => {
  const [plantTypes, setPlantTypes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);
// Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // Get token once
  const token = localStorage.getItem("token") || "";

  // Axios instance with auth header
  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // Fetch plant types on mount
  useEffect(() => {
    fetchPlantTypes();
  }, []);

  // Fetch plant types from API
  // const fetchPlantTypes = async () => {
  //   try {
  //     const res = await api.get("admin/master/master-data/plant-types");
  //     if (res.data.success) {
  //       const data = res.data.data.map((item) => ({
  //         key: item.id.toString(),
  //         id: item.id,
  //         name: item.name,
  //         statusText: item.status_text || (item.status === 1 ? "Active" : "Inactive"),
  //         statusRaw: item.status,
  //       }));
  //       setPlantTypes(data);
  //       setFilteredData(data);
  //     } else {
  //       message.error("Failed to load plant types");
  //     }
  //   } catch (err) {
  //     console.error("Fetch error:", err);
  //     message.error("Error fetching plant types");
  //   }
  // };
const fetchPlantTypes = async (page = 1, search = "") => {
    try {
      // Adjust API endpoint if it supports pagination & search params
      const res = await api.get("admin/master/master-data/plant-types", {
        params: {
          page,
          limit: pageSize,
          name: search || undefined,
        },
      });

      if (res.data.success) {
        // Sort descending by id to show newest first (if backend not sorting)
        const sortedData = res.data.data.sort((a, b) => b.id - a.id);

        const mappedData = sortedData.map((item) => ({
          key: item.id.toString(),
          id: item.id,
          name: item.name,
          statusText: item.status_text || (item.status === 1 ? "Active" : "Inactive"),
          statusRaw: item.status,
        }));

        setPlantTypes(mappedData);
        setFilteredData(mappedData);
        setTotalCount(res.data.total || mappedData.length);
      } else {
        message.error("Failed to load plant types");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      message.error("Error fetching plant types");
    }
  };
  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1); // reset to page 1 on search
  };

  useEffect(() => {
    fetchPlantTypes(currentPage, searchText);
  }, [currentPage, searchText]);

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
      status: record.statusRaw,
    });
    setIsModalVisible(true);
  };


const handleDelete = (record) => {

  if (!record?.id) {
    message.error("Invalid record ID");
    return;
  }


  confirm({
    title: "Are you sure you want to delete this plant type?",
    content: `"${record.name}" will be permanently deleted.`,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    async onOk() {
      try {
        const res = await axios.delete(
          `${BASE_URL}admin/master/master-data/plant-types/${record.id}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );

        if (res.data.success) {
          message.success("Plant Type deleted successfully!");
          fetchPlantTypes();
        } else {
          message.error(res.data.message || "Failed to delete plant type");
        }
      } catch (error) {
        console.error("Delete API error:", error);
        message.error("Error deleting plant type");
      }
    },
  });
};



  // Add or update plant type
  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        if (editMode) {
          // PUT request for update
          const res = await api.put(
            `admin/master/master-data/plant-types/${editingRecord.id}`,
            {
              name: values.name,
              status: values.status,
            }
          );
          if (res.data.success) {
            message.success("Plant type updated successfully");
          } else {
            message.error(res.data.message || "Update failed");
          }
        } else {
          // POST request for add
          const res = await api.post("admin/master/master-data/plant-types", {
            name: values.name,
            status: values.status,
          });
          if (res.data.success) {
            message.success("Plant type added successfully");
          } else {
            message.error(res.data.message || "Add failed");
          }
        }
        setIsModalVisible(false);
        fetchPlantTypes(); // Refresh list
         setCurrentPage(1);
      } catch (err) {
        console.error("Save failed:", err);
        message.error("Save failed: " + (err.response?.data?.message || err.message));
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
      title: "Plant Type",
      dataIndex: "name",
      key: "name",
      render: (text) => highlightText(text, searchText),
    },
    {
      title: "Status",
      dataIndex: "statusText",
      key: "statusText",
      render: (status) => (
        <Tag
          style={{
            backgroundColor: status === "Active" ? "#2fb344" : "#d63939",
            color: "#fff",
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
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)} type="primary" />
          <Button
            icon={<DeleteOutlined style={{ color: "#fff" }} />}
            onClick={() => handleDelete(record)}
            style={{ backgroundColor: "#d63939", color: "#fff" }}
          />
        </Space>
      ),
    },
  ];

  // Highlight matched search text
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
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Plant Type</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <Input
            placeholder="Search by name"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            allowClear
            style={{ minWidth: 280 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
            Add Plant Type
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: "max-content" }}
         pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalCount,
          showSizeChanger: false,
          onChange: (page) => setCurrentPage(page),
        }}
        rowClassName={(_, i) => (i % 2 === 0 ? "table-row-white" : "table-row-gray")}
      />

      <Modal
        title={editMode ? "Edit Plant Type" : "Add Plant Type"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editMode ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Plant Type Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="e.g. On Grid / Off Grid / Hybrid " />
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
    </div>
  );
};

export default PlantType;
