// // src/pages/UserManagement.js
// import React, { useState } from "react";
// import {
//   Table,
//   Button,
//   Modal,
//   Form,
//   Input,
//   Select,
//   Space,
//   Tag,
// } from "antd";
// import {
//   PlusOutlined,
//   EditOutlined,
//   DeleteOutlined,
// } from "@ant-design/icons";

// const { Option } = Select;

// const initialUsers = [
//   {
//     id: 1,
//     role: "Admin",
//     permission: ["User", "Banner", "Videos", "Blog"],
//     status: "Active",
//   },
// ];

// const Roles = () => {
//   const [form] = Form.useForm();
//   const [data, setData] = useState(initialUsers);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleAddUser = (values) => {
//     const newUser = {
//       id: data.length + 1,
//       ...values,
//     };
//     setData([...data, newUser]);
//     setIsModalOpen(false);
//     form.resetFields();
//   };

//   const columns = [
//     { title: "#ID", dataIndex: "id", key: "id" },
//     { title: "Role", dataIndex: "role", key: "role" },
//     {
//       title: "Permission",
//       dataIndex: "permission",
//       key: "permission",
//       render: (permissions) => (
//         <>
//           {permissions.map((perm, index) => (
//             <Tag color="#287adeff" key={index}>
//               {perm}
//             </Tag>
//           ))}
//         </>
//       ),
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//        <Tag
//                         style={{
//                           backgroundColor: status === "Active" ? "#2fb344" : "#d63939",
//                           color: "#ffffff",
//                           border: "none",
//                         }}
//                       >
//                         {status}
//                       </Tag>
//       ),
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: () => (
//         <Space>
//           <Button icon={<EditOutlined />} type="primary" />
//                <Button
//            icon={<DeleteOutlined style={{ color: "#fff" }} />}
          
//            style={{ backgroundColor: "#d63939", borderColor: "#d63939" }}
//          />
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: "2px 2px 2px 2px"  }}>
//       <div
//         className="roles-list-container"
//         style={{
//           background: "#fff",
//           padding: 24,
//           borderRadius: 8,
//           boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//         }}
//       >
//         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
//           <h2>Roles List</h2>
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => setIsModalOpen(true)}
//           >
//             Add
//           </Button>
//         </div>

//         <Table columns={columns} dataSource={data} rowKey="id" pagination={{ pageSize: 10 }}  rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")} />
//       </div>

//       <Modal
//         title="Add Role"
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         onOk={() => form.submit()}
//         okText="Submit"
//       >
//         <Form layout="vertical" form={form} onFinish={handleAddUser}>
//           <Form.Item
//             name="role"
//             label="Add Role"
//             rules={[{ required: true, message: "Please enter role name" }]}
//           >
//             <Input placeholder="Enter role name" />
//           </Form.Item>

//           <Form.Item
//             name="permission"
//             label="Add Permission"
//             rules={[{ required: true, message: "Please select permission(s)" }]}
//           >
//             <Select
//               mode="multiple"
//               placeholder="Select Permission..."
//               allowClear
//             >
//               <Option value="User">User</Option>
//               <Option value="Banner">Banner</Option>
//               <Option value="Videos">Videos</Option>
//               <Option value="Blog">Blog</Option>
//               <Option value="Orders">Orders</Option>
//             </Select>
//           </Form.Item>

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

// export default Roles;


// src/pages/UserManagement.js
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
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const initialUsers = [
  {
    id: 1,
    role: "Admin",
    permission: ["User", "Banner", "Videos", "Blog"],
    status: "Active",
  },
];

const Roles = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleAddUser = (values) => {
    if (isEditMode && editingId !== null) {
      const updatedData = data.map((item) =>
        item.id === editingId ? { ...item, ...values } : item
      );
      setData(updatedData);
      message.success("Role updated successfully.");
    } else {
      const newUser = {
        id: data.length + 1,
        ...values,
      };
      setData([...data, newUser]);
      message.success("Role added successfully.");
    }

    setIsModalOpen(false);
    form.resetFields();
    setIsEditMode(false);
    setEditingId(null);
  };

  const handleEdit = (record) => {
    setIsEditMode(true);
    setEditingId(record.id);
    form.setFieldsValue({
      role: record.role,
      permission: record.permission,
      status: record.status,
    });
    setIsModalOpen(true);
  };

  const columns = [
    { title: "#ID", dataIndex: "id", key: "id" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Permission",
      dataIndex: "permission",
      key: "permission",
      render: (permissions) => (
        <>
          {permissions.map((perm, index) => (
            <Tag color="#287adeff" key={index}>
              {perm}
            </Tag>
          ))}
        </>
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
            icon={<EditOutlined />}
            type="primary"
            onClick={() => handleEdit(record)}
          />
          <Button
            icon={<DeleteOutlined style={{ color: "#fff" }} />}
            style={{ backgroundColor: "#d63939", borderColor: "#d63939" }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "2px 2px 2px 2px" }}>
      <div
        className="roles-list-container"
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
          <h2>Roles List</h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalOpen(true);
              setIsEditMode(false);
              setEditingId(null);
              form.resetFields();
            }}
          >
            Add
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          rowClassName={(_, index) =>
            index % 2 === 0 ? "table-row-white" : "table-row-gray"
          }
        />
      </div>

      <Modal
        title={isEditMode ? "Edit Role" : "Add Role"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setIsEditMode(false);
          setEditingId(null);
        }}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={form} onFinish={handleAddUser}>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please enter role name" }]}
          >
            <Input placeholder="Enter role name" />
          </Form.Item>

          <Form.Item
            name="permission"
            label="Permission"
            rules={[{ required: true, message: "Please select permission(s)" }]}
          >
            <Select mode="multiple" placeholder="Select Permission..." allowClear>
              <Option value="User">User</Option>
              <Option value="Banner">Banner</Option>
              <Option value="Videos">Videos</Option>
              <Option value="Blog">Blog</Option>
              <Option value="Orders">Orders</Option>
            </Select>
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

export default Roles;
