
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
  Upload,
  message,
} from "antd";
import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
  EyeOutlined,
  ReloadOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

const { Option } = Select;
const { confirm } = Modal;

const ServiceMaster = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);
  const [banner, setBanner] = useState([]);
  const [images, setImages] = useState([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);

  const navigate = useNavigate();

  // Get API base URL and token from env/localStorage
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("authToken"); // or wherever your token is stored

  // Axios instance with token header
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetch services list from API
 const fetchServices = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");  // or wherever token is stored
    if (!token) {
      message.error("User not authenticated. Please login.");
      setLoading(false);
      return;
    }

    const res = await axiosInstance.get("/admin/servicetab/service-masters", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.success) {
      // Map data as before
      const mappedData = res.data.data.data.map((item) => ({
        id: item.id,
        key: item.id,
        service_name: item.service_name,
        major_category_id: item.major_category_id.toString(),
        minor_category_id: item.minor_category_id.toString(),
        service_type: item.service_type,
        service_unit: item.service_default_unit_name,
        description: item.description,
        status: item.status_text,
        created_date: item.created_at,
        updated_date: item.updated_at,
        updated_by: item.updated_by,
        service_banner: item.service_banner,
        service_images: [
          item.service_image_1,
          item.service_image_2,
          item.service_image_3,
          item.service_image_4,
        ].filter(Boolean),
      }));
      setServices(mappedData);
    } else {
      message.error("Failed to fetch services");
    }
  } catch (error) {
    console.error(error);
    message.error("Error fetching services");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchServices();
  }, []);

  // Convert uploaded file to FormData for multipart/form-data
  const createFormData = (values) => {
    const formData = new FormData();
    formData.append("service_name", values.service_name);
    formData.append("major_category_id", values.major_category_id);
    formData.append("minor_category_id", values.minor_category_id);

    if (banner.length > 0 && banner[0].originFileObj) {
      formData.append("service_banner", banner[0].originFileObj);
    }

    if (images.length > 0) {
      images.forEach((file, idx) => {
        if (file.originFileObj) {
          formData.append(`service_image_${idx + 1}`, file.originFileObj);
        }
      });
    }

    formData.append("service_type", values.service_type);
    formData.append("service_default_unit", values.service_unit);
    formData.append("description", values.description);
    formData.append("status", values.status === "Active" ? "1" : "0");

    return formData;
  };

const handleDelete = (record) => {
  confirm({
    title: "Are you sure you want to delete this service?",
    content: `"${record.service_name}" will be permanently deleted.`,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    async onOk() {
      try {
        const token = localStorage.getItem("token");

        await axiosInstance.delete(`/admin/servicetab/service-masters/${record.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        message.success("Service deleted successfully!");
        fetchServices();
      } catch (error) {
        console.error(error);
        message.error("Failed to delete service.");
      }
    },
  });
};

  const showEditModal = (record) => {
    setEditMode(true);
    setEditingRecord(record);
    form.setFieldsValue({
      service_name: record.service_name,
      major_category_id: record.major_category_id,
      minor_category_id: record.minor_category_id,
      service_type: record.service_type,
      service_unit: record.service_unit,
      description: record.description,
      status: record.status,
    });

    setBanner(
      record.service_banner
        ? [
            {
              uid: "-1",
              name: "banner.png",
              status: "done",
              url: record.service_banner,
            },
          ]
        : []
    );
    setImages(
      record.service_images
        ? record.service_images.map((img, i) => ({
            uid: `${i}`,
            name: `image-${i}.png`,
            status: "done",
            url: img,
          }))
        : []
    );

    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditMode(false);
    setEditingRecord(null);
    form.resetFields();
    setBanner([]);
    setImages([]);
    setIsModalVisible(true);
  };

 const handleOk = async () => {
  try {
    const values = await form.validateFields();
    const formData = createFormData(values);

    const token = localStorage.getItem("token"); // adjust to your token retrieval method

    let res;
    if (editMode && editingRecord) {
      // Update service (usually PUT or PATCH, but you use POST in your example)
      res = await axiosInstance.post(
        `/admin/servicetab/service-masters/${editingRecord.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      // Add new service
      res = await axiosInstance.post(
        `/admin/servicetab/service-masters`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    if (res.data.success) {
      message.success(editMode ? "Service updated!" : "Service added!");
      setIsModalVisible(false);
      fetchServices();
    } else {
      message.error("Operation failed, please try again.");
    }
  } catch (err) {
    console.error(err);
    message.error("Validation failed or network error.");
  }
};


  const filteredData = services.filter(
    (item) =>
      item.service_name?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.major_category_id?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.minor_category_id?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Service Name", dataIndex: "service_name", key: "service_name" },
    { title: "Major Category ID", dataIndex: "major_category_id", key: "major_category_id" },
    { title: "Minor Category ID", dataIndex: "minor_category_id", key: "minor_category_id" },
    {
      title: "Banner",
      dataIndex: "service_banner",
      key: "service_banner",
      render: (banner) =>
        banner ? (
          <img
            src={banner}
            alt="banner"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Images",
      dataIndex: "service_images",
      key: "service_images",
      render: (imgs) =>
        imgs?.length ? (
          <Space>
            {imgs.slice(0, 4).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`img-${idx}`}
                style={{ width: 40, height: 40, objectFit: "cover" }}
              />
            ))}
          </Space>
        ) : (
          "No Images"
        ),
    },
    {
      title: "Type",
      dataIndex: "service_type",
      key: "service_type",
      render: (text) => <div style={{ whiteSpace: "nowrap" }}>{text}</div>,
    },
    {
      title: "Unit",
      dataIndex: "service_unit",
      key: "service_unit",
      render: (text) => <div style={{ whiteSpace: "nowrap" }}>{text}</div>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 200,
      ellipsis: true,
      render: (text) => (
        <div style={{ whiteSpace: "normal", overflowWrap: "break-word" }}>
          {text}
        </div>
      ),
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
    { title: "Updated Date", dataIndex: "updated_date", key: "updated_date" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedRecord(record);
              setViewModalVisible(true);
            }}
            style={{ backgroundColor: "#F0720B", borderColor: "#F0720B", color: "#fff" }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            type="primary"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            style={{ backgroundColor: "#d63939", borderColor: "#d63939", color: "#fff" }}
          />
        </Space>
      ),
    },
  ];

  const uploadProps = {
    beforeUpload: () => false, // prevent auto upload
  };

  return (
    <div style={{ padding: 20, background: "#fff", borderRadius: 10 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Service Master</h2>
        <Space wrap>
          <Input.Search
            placeholder="Search by Service Name or Category"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
          <Button icon={<FilterOutlined />} onClick={() => setFiltersVisible(!filtersVisible)}>
            Filters
          </Button>
          <Button icon={<ReloadOutlined />} onClick={() => fetchServices()}>
            Reload
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add Service
          </Button>
        </Space>
      </div>

      {/* Filters Panel - You can extend filters if needed */}
      {filtersVisible && (
        <Form
          layout="inline"
          onFinish={(values) => {
            // You can implement advanced filtering here if needed
          }}
          style={{ marginBottom: 16 }}
        >
          <Form.Item name="service_name">
            <Input placeholder="Enter Service Name" />
          </Form.Item>
          <Form.Item name="major_category_id">
            <Input placeholder="Enter Major Category ID" />
          </Form.Item>
          <Form.Item name="minor_category_id">
            <Input placeholder="Enter Minor Category ID" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              Apply
            </Button>
          </Form.Item>
        </Form>
      )}

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        pagination={{ pageSize: 10 }}
        size="small"
        scroll={{ x: "max-content" }}
        rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")}
      />

      {/* Add/Edit Modal */}
      <Modal
        title={editMode ? "Edit Service" : "Add Service"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditMode(false);
          form.resetFields();
          setBanner([]);
          setImages([]);
        }}
        onOk={handleOk}
        okText={editMode ? "Update" : "Create"}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="service_name"
            label="Service Name"
            rules={[{ required: true, message: "Please enter service name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="major_category_id"
            label="Major Category ID"
            rules={[{ required: true, message: "Please enter major category ID" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="minor_category_id"
            label="Minor Category ID"
            rules={[{ required: true, message: "Please enter minor category ID" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="service_type"
            label="Service Type"
            rules={[{ required: true, message: "Please enter service type" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="service_unit"
            label="Service Unit"
            rules={[{ required: true, message: "Please enter service unit" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select placeholder="Select status">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Service Banner">
            <Upload
              listType="picture"
              fileList={banner}
              onChange={({ fileList }) => setBanner(fileList)}
              {...uploadProps}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload Banner</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Service Images">
            <Upload
              listType="picture"
              fileList={images}
              onChange={({ fileList }) => setImages(fileList)}
              {...uploadProps}
              multiple
              maxCount={4}
            >
              <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Modal */}
      <Modal
        title="Service Master"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
      >
        {selectedRecord && (
          <Space direction="vertical" size="middle" style={{ marginTop: 12 }}>
            <div>
              <strong>Created Date:</strong>{" "}
              {selectedRecord.created_date
                ? dayjs(selectedRecord.created_date).format("DD-MM-YYYY HH:mm")
                : "N/A"}
            </div>
            <div>
              <strong>Updated Date:</strong>{" "}
              {selectedRecord.updated_date
                ? dayjs(selectedRecord.updated_date).format("DD-MM-YYYY HH:mm")
                : "N/A"}
            </div>
            <div>
              <strong>Updated By:</strong> {selectedRecord.updated_by || "N/A"}
            </div>
            <div>
              <strong>Description:</strong> {selectedRecord.description}
            </div>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default ServiceMaster;
