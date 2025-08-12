
import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Tag,
} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

// Example shared roles list
const rolesList = ["Admin", "Editor", "Operations", "HR", "Support"];

const initialUsers = [
  {
    id: 1,
    name: "Komal Rajor",
    email: "komal@gmail.com",
    mobile: "8279417800",
    createdAt: "2023-03-28 00:15:41",
    role: ["Operations"],
    permission: ["User", "Banner", "Videos", "Blog"],
    status: "Active",
  },
  {
    id: 2,
    name: "Vishakha",
    email: "vishakha@gmail.com",
    mobile: "8279487654",
    createdAt: "2023-03-28 00:15:41",
    role: ["Operations"],
    permission: ["User", "Banner", "Videos", "Blog"],
    status: "Inactive",
  },
];

const UsersList = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddUser = (values) => {
    const newUser = {
      id: data.length + 1,
      createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      ...values,
      permission: Array.isArray(values.permission)
        ? values.permission
        : values.permission?.split(",") || [],
      role: Array.isArray(values.role)
        ? values.role
        : values.role?.split(",") || [],
    };
    setData([...data, newUser]);
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns = [
    { title: "#ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Mobile No.", dataIndex: "mobile", key: "mobile" },
    // { title: "Created at", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Roles",
      dataIndex: "role",
      key: "role",
      render: (roles) =>
        Array.isArray(roles) ? (
          roles.map((r, i) => (
            <Tag key={i} color="blue" style={{ fontWeight: 500 }}>
              {r}
            </Tag>
          ))
        ) : (
          <Tag>Admin</Tag>
        ),
    },
    {
      title: "Permission",
      dataIndex: "permission",
      key: "permission",
      render: (permissions) =>
        Array.isArray(permissions) ? (
          permissions.map((perm, index) => (
            <Tag color="#00CFCF" key={index} style={{ fontWeight: 500 }}>
              {perm}
            </Tag>
          ))
        ) : (
          <Tag color="red">Invalid</Tag>
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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate("/viewusers", { state: { record } })}
            style={{
              backgroundColor: "#F0720B",
              borderColor: "#F0720B",
              color: "#fff",
            }}
          />
          <Button
            icon={<DeleteOutlined />}
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

  return (
    <div style={{ padding: "2px 2px" }}>
      <div
        className="user-list-container"
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 8,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <h2 style={{ margin: 0 }}>Users List</h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Add
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
          rowClassName={(_, index) =>
            index % 2 === 0 ? "table-row-white" : "table-row-gray"
          }
        />
      </div>

      <Modal
        title="Add User"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={form} onFinish={handleAddUser}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            name="mobile"
            label="Mobile No."
            rules={[{ required: true, message: "Please enter mobile number" }]}
          >
            <Input placeholder="Enter mobile number" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Roles"
            rules={[{ required: true, message: "Please select role(s)" }]}
          >
            <Select mode="multiple" placeholder="Select roles" allowClear>
              {rolesList.map((role) => (
                <Option key={role} value={role}>
                  {role}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* <Form.Item
            name="permission"
            label="Permissions"
            rules={[{ required: true, message: "Please select permissions" }]}
          >
            <Select mode="multiple" placeholder="Select permissions" allowClear>
              <Option value="User">User</Option>
              <Option value="Banner">Banner</Option>
              <Option value="Videos">Videos</Option>
              <Option value="Blog">Blog</Option>
              <Option value="Orders">Orders</Option>
            </Select>
          </Form.Item> */}

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

export default UsersList;
