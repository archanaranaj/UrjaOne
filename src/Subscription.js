// import React, { useState } from "react";
// import {
//   Table,
//   Button,
//   Input,
//   Space,
//   Select,
//   Tag,
// } from "antd";
// import {
//   PlusOutlined,
//   EyeOutlined,
//   ReloadOutlined,
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";

// const { Option } = Select;

// const Subscription = () => {
//   const navigate = useNavigate();

//   const originalData = [
//     {
//       plan_id: "1",
//       plan_name: "Basic Plan",
//       plan_sequence: 1,
//       qtr_price: "₹499",
//       hy_price: "₹899",
//       year_price: "₹1499",
//       status: "Active",
//     },
//     {
//       plan_id: "2",
//       plan_name: "Standard Plan",
//       plan_sequence: 2,
//       qtr_price: "₹799",
//       hy_price: "₹1399",
//       year_price: "₹1999",
//       status: "Inactive",
//     },
//     {
//       plan_id: "3",
//       plan_name: "Premium Plan",
//       plan_sequence: 3,
//       qtr_price: "₹1099",
//       hy_price: "₹1999",
//       year_price: "₹2999",
//       status: "Active",
//     },
//   ];

//   const [searchText, setSearchText] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [filteredData, setFilteredData] = useState(originalData);

//   const handleAdd = () => {
//     navigate("/addsubscription");
//   };

//   const handleView = (record) => {
//     navigate("/viewsubscription", { state: { record } });
//   };

//   const handleSearch = (value) => {
//     setSearchText(value);
//     applyFilters(value, statusFilter);
//   };

//   const handleStatusChange = (value) => {
//     setStatusFilter(value);
//     applyFilters(searchText, value);
//   };

//   const handleReload = () => {
//     setSearchText("");
//     setStatusFilter("");
//     setFilteredData(originalData);
//   };

//   const applyFilters = (searchVal, statusVal) => {
//     const filtered = originalData.filter((sub) => {
//       const matchesSearch =
//         sub.plan_name.toLowerCase().includes(searchVal.toLowerCase()) ||
//         sub.plan_sequence.toString().includes(searchVal);
//       const matchesStatus = statusVal ? sub.status === statusVal : true;
//       return matchesSearch && matchesStatus;
//     });
//     setFilteredData(filtered);
//   };

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

//   const columns = [
//     {
//       title: "Plan Name",
//       dataIndex: "plan_name",
//       key: "plan_name",
//       render: (text) => highlightText(text, searchText),
//     },
//     {
//       title: "Plan Sequence",
//       dataIndex: "plan_sequence",
//       key: "plan_sequence",
//       sorter: (a, b) => a.plan_sequence - b.plan_sequence,
//       render: (text) => highlightText(text.toString(), searchText),
//     },
//     {
//       title: "Qtr Price",
//       dataIndex: "qtr_price",
//       key: "qtr_price",
//     },
//     {
//       title: "HY Price",
//       dataIndex: "hy_price",
//       key: "hy_price",
//     },
//     {
//       title: "Year Price",
//       dataIndex: "year_price",
//       key: "year_price",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//         <Tag
//           style={{
//             backgroundColor: status === "Active" ? "#2fb344" : "#d63939",
//             color: "#fff",
//             border: "none",
//           }}
//         >
//           {status}
//         </Tag>
//       ),
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Button
//           icon={<EyeOutlined />}
//           type="link"
//           style={{ backgroundColor: "#F0720B", borderColor: "#F0720B", color: "#fff" }} 
//           onClick={() => handleView(record)}
//         />
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: "20px", background: "#fff", borderRadius: "10px" }}>
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "space-between",
//           alignItems: "center",
//           gap: "10px",
//           marginBottom: "16px",
//         }}
//       >
//         <span style={{ fontSize: 20, fontWeight: 600 }}>Subscription List</span>
//         <Space wrap>
//           <Input
//             placeholder="Search Name or Sequence"
//             onChange={(e) => handleSearch(e.target.value)}
//             value={searchText}
//             style={{ width: 200 }}
//             allowClear
//           />
//           <Select
//             placeholder="Filter by Status"
//             onChange={handleStatusChange}
//             value={statusFilter || undefined}
//             allowClear
//             style={{ width: 160 }}
//           >
//             <Option value="Active">Active</Option>
//             <Option value="Inactive">Inactive</Option>
//           </Select>
//           <Button icon={<ReloadOutlined />} onClick={handleReload}>
//             Reload
//           </Button>
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={handleAdd}
//             style={{ backgroundColor: "#206bc4", borderColor: "#206bc4" }}
//           >
//             Add Subscription
//           </Button>
//         </Space>
//       </div>

//       <Table
//         columns={columns}
//         dataSource={filteredData}
//         scroll={{ x: "max-content" }}
//         pagination={{ pageSize: 10 }}
//         rowKey="plan_id"
//          rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")}
//       />
//     </div>
//   );
// };

// export default Subscription;


import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Select,
  Tag,
  Modal,
  Form,
  Popconfirm,
  message,
} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Subscription = () => {
  const navigate = useNavigate();

  const initialData = [
    {
      plan_id: "1",
      plan_name: "Basic Plan",
      plan_sequence: 1,
      qtr_price: "₹499",
      hy_price: "₹899",
      year_price: "₹1499",
      status: "Active",
    },
    {
      plan_id: "2",
      plan_name: "Standard Plan",
      plan_sequence: 2,
      qtr_price: "₹799",
      hy_price: "₹1399",
      year_price: "₹1999",
      status: "Inactive",
    },
    {
      plan_id: "3",
      plan_name: "Premium Plan",
      plan_sequence: 3,
      qtr_price: "₹1099",
      hy_price: "₹1999",
      year_price: "₹2999",
      status: "Active",
    },
  ];

  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredData, setFilteredData] = useState(initialData);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    navigate("/addsubscription");
  };

  const handleView = (record) => {
    navigate("/viewsubscription", { state: { record } });
  };

 const handleEdit = (record) => {
  navigate("/editsubscription", { state: { record } });
};


  const handleDelete = (plan_id) => {
    const updated = data.filter((item) => item.plan_id !== plan_id);
    setData(updated);
    setFilteredData(updated);
    message.success("Subscription deleted successfully");
  };

  const handleEditSubmit = (values) => {
    const updatedData = data.map((item) =>
      item.plan_id === editRecord.plan_id ? { ...item, ...values } : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
    message.success("Subscription updated successfully");
    setEditModalVisible(false);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    applyFilters(value, statusFilter);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    applyFilters(searchText, value);
  };

  const handleReload = () => {
    setSearchText("");
    setStatusFilter("");
    setFilteredData(data);
  };

  const applyFilters = (searchVal, statusVal) => {
    const filtered = data.filter((sub) => {
      const matchesSearch =
        sub.plan_name.toLowerCase().includes(searchVal.toLowerCase()) ||
        sub.plan_sequence.toString().includes(searchVal);
      const matchesStatus = statusVal ? sub.status === statusVal : true;
      return matchesSearch && matchesStatus;
    });
    setFilteredData(filtered);
  };

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

  const columns = [
    {
      title: "Plan Name",
      dataIndex: "plan_name",
      key: "plan_name",
      render: (text) => highlightText(text, searchText),
    },
    {
      title: "Plan Sequence",
      dataIndex: "plan_sequence",
      key: "plan_sequence",
      sorter: (a, b) => a.plan_sequence - b.plan_sequence,
      render: (text) => highlightText(text.toString(), searchText),
    },
    {
      title: "Qtr Price",
      dataIndex: "qtr_price",
      key: "qtr_price",
    },
    {
      title: "HY Price",
      dataIndex: "hy_price",
      key: "hy_price",
    },
    {
      title: "Year Price",
      dataIndex: "year_price",
      key: "year_price",
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
            type="link"
            style={{
              backgroundColor: "#F0720B",
              borderColor: "#F0720B",
              color: "#fff",
            }}
            onClick={() => handleView(record)}
          />
        <Button
  icon={<EditOutlined />}
  type="primary"
  onClick={() => handleEdit(record)}
/>

          <Popconfirm
            title="Are you sure you want to delete this plan?"
            onConfirm={() => handleDelete(record.plan_id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined  />}type="primary"  danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", background: "#fff", borderRadius: "10px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <span style={{ fontSize: 20, fontWeight: 600 }}>Subscription List</span>
        <Space wrap>
          <Input
            placeholder="Search Name or Sequence"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            style={{ width: 200 }}
            allowClear
          />
          <Select
            placeholder="Filter by Status"
            onChange={handleStatusChange}
            value={statusFilter || undefined}
            allowClear
            style={{ width: 160 }}
          >
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
          <Button icon={<ReloadOutlined />} onClick={handleReload}>
            Reload
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            style={{ backgroundColor: "#206bc4", borderColor: "#206bc4" }}
          >
            Add Subscription
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: "max-content" }}
        pagination={{ pageSize: 10 }}
        rowKey="plan_id"
        rowClassName={(_, index) =>
          index % 2 === 0 ? "table-row-white" : "table-row-gray"
        }
      />

      {/* <Modal
        title="Edit Subscription"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={() => form.submit()}
        okText="Save"
      >
        <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
          <Form.Item
            name="plan_name"
            label="Plan Name"
            rules={[{ required: true, message: "Please enter Plan Name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="plan_sequence"
            label="Plan Sequence"
            rules={[{ required: true, message: "Please enter Plan Sequence" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="qtr_price"
            label="Quarterly Price"
            rules={[{ required: true, message: "Please enter Quarterly Price" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="hy_price"
            label="Half-Yearly Price"
            rules={[{ required: true, message: "Please enter Half-Yearly Price" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="year_price"
            label="Yearly Price"
            rules={[{ required: true, message: "Please enter Yearly Price" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select Status" }]}
          >
            <Select placeholder="Select Status">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  );
};

export default Subscription;
