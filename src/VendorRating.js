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
// } from "@ant-design/icons";

// const { Option } = Select;

// const initialData = [
//   {
//     key: "1",
//     id: 1,
//     vendorId: "V101",
//     rating: 4,
//     remarks: "Good service",
//     userId: "U001",
//     status: "Active",
//     reviewDate: "2025-07-10",
//     insertedDate: "2025-07-11",
//   },
//   {
//     key: "2",
//     id: 2,
//     vendorId: "V102",
//     rating: 2,
//     remarks: "Late delivery",
//     userId: "U002",
//     status: "Inactive",
//     reviewDate: "2025-07-05",
//     insertedDate: "2025-07-06",
//   },
// ];

// const VendorRating = () => {
//   const [data, setData] = useState(initialData);
//   const [filteredData, setFilteredData] = useState(initialData);
//   const [searchText, setSearchText] = useState("");
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [editingRecord, setEditingRecord] = useState(null);
//   const [form] = Form.useForm();

//   const handleSearch = (value) => {
//     setSearchText(value);
//     const filtered = data.filter((item) =>
//       item.vendorId.toLowerCase().includes(value.toLowerCase())
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
//       title: "Delete this review?",
//       content: `"Review for Vendor ${record.vendorId}" will be removed.`,
//       okText: "Yes",
//       okType: "danger",
//       cancelText: "No",
//       onOk: () => {
//         const newList = data.filter((item) => item.id !== record.id);
//         setData(newList);
//         setFilteredData(newList);
//         message.success("Review deleted successfully!");
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
//         message.success("Review updated!");
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
//         message.success("Review added!");
//       }
//       setIsModalVisible(false);
//     });
//   };

//   const columns = [
//     {
//       title: "Vendor ID",
//       dataIndex: "vendorId",
//       key: "vendorId",
//     },
//     {
//       title: "Rating",
//       dataIndex: "rating",
//       key: "rating",
//     },
//     {
//       title: "Remarks",
//       dataIndex: "remarks",
//       key: "remarks",
//     },
//     {
//       title: "User ID",
//       dataIndex: "userId",
//       key: "userId",
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
//           }}
//         >
//           {status}
//         </Tag>
//       ),
//     },
//     {
//       title: "Review Date",
//       dataIndex: "reviewDate",
//       key: "reviewDate",
//     },
//     {
//       title: "Inserted Date",
//       dataIndex: "insertedDate",
//       key: "insertedDate",
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
//           <Button
//             icon={<DeleteOutlined style={{ color: "#ffffff" }} />}
//             onClick={() => handleDelete(record)}
//             style={{
//               backgroundColor: "#d63939",
//               borderColor: "#d63939",
//               color: "#ffffff",
//             }}
//           />
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 20, background: "#fff", borderRadius: 10 }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: 16,
//           flexWrap: "wrap",
//           gap: 10,
//         }}
//       >
//         <h2 style={{ fontSize: 20, fontWeight: 600 }}>Vendor Ratings & Reviews</h2>
//         <div style={{ display: "flex", gap: 10 }}>
//           <Input
//             placeholder="Search by Vendor ID"
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
//             Add Review
//           </Button>
//         </div>
//       </div>

//       <Table
//         columns={columns}
//         dataSource={filteredData}
//         pagination={{ pageSize: 10 }}
//         scroll={{ x: 1000 }}
//         rowClassName={(_, index) =>
//           index % 2 === 0 ? "table-row-white" : "table-row-gray"
//         }
//       />

//       <Modal
//         title={editMode ? "Edit Review" : "Add Review"}
//         open={isModalVisible}
//         onOk={handleOk}
//         onCancel={() => setIsModalVisible(false)}
//         okText={editMode ? "Update" : "Add"}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="vendorId"
//             label="Vendor ID"
//             rules={[{ required: true, message: "Enter vendor ID" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="rating"
//             label="Rating (1–5)"
//             rules={[{ required: true, message: "Select rating" }]}
//           >
//             <Select placeholder="Choose rating">
//               {[1, 2, 3, 4, 5].map((r) => (
//                 <Option key={r} value={r}>
//                   {r}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="remarks"
//             label="Review Remarks"
//             rules={[{ required: true, message: "Enter remarks" }]}
//           >
//             <Input.TextArea rows={3} />
//           </Form.Item>
//           <Form.Item
//             name="userId"
//             label="User ID"
//             rules={[{ required: true, message: "Enter user ID" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="status"
//             label="Review Status"
//             rules={[{ required: true, message: "Select status" }]}
//           >
//             <Select>
//               <Option value="Active">Active</Option>
//               <Option value="Inactive">Inactive</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="reviewDate"
//             label="Review Date"
//             rules={[{ required: true, message: "Enter review date" }]}
//           >
//             <Input type="date" />
//           </Form.Item>
//           <Form.Item
//             name="insertedDate"
//             label="Inserted Date"
//             rules={[{ required: true, message: "Enter inserted date" }]}
//           >
//             <Input type="date" />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default VendorRating;

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
} from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const VendorRating = () => {
  const [data, setData] = useState([]); // API data
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const token = localStorage.getItem("token");
  const baseURL = process.env.REACT_APP_API_BASE_URL || "http://13.201.150.234/t2/api";

  // Fetch ratings from API
const fetchRatings = async (vendor_id = "") => {
  setLoading(true);
  try {
    const res = await axios.get(
      `${baseURL}/admin/vendortab/listRatings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          vendor_id: vendor_id,
        },
      }
    );

    if (res.data.success) {
      const apiData = res.data.data.map((item) => ({
        key: item.id.toString(),
        id: item.id,
        vendorId: item.vendor?.id?.toString() || "",
        name: item.vendor?.name || "",
        rating: item.rating,
        remarks: item.review_text || "",
        userId: item.user?.id?.toString() || "",
        userName: item.user?.name || "",
        status: item.status === 1 ? "Active" : "Inactive",
        reviewDate: item.created_at ? item.created_at.split("T")[0] : "",
        insertedDate: item.updated_at ? item.updated_at.split("T")[0] : "",
      }));
      setData(apiData);
      setFilteredData(apiData);
    } else {
      message.error("Failed to fetch vendor ratings.");
      setData([]);
      setFilteredData([]);
    }
  } catch (error) {
    message.error("Error fetching vendor ratings.");
    console.error(error);
    setData([]);
    setFilteredData([]);
  }
  setLoading(false);
};


  useEffect(() => {
    fetchRatings();
  }, []);

  // Local search by vendor ID or vendor name
  const handleSearch = (value) => {
    setSearchText(value);
    if (!value) {
      setFilteredData(data);
      return;
    }
    const filtered = data.filter(
      (item) =>
        item.vendorId.toLowerCase().includes(value.toLowerCase()) ||
        item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Modal handlers remain same as your original code...
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
    Modal.confirm({
      title: "Delete this review?",
      content: `"Review for Vendor ${record.vendorId}" will be removed.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        // You would also want to call the API to delete here (if supported)
        const newList = data.filter((item) => item.id !== record.id);
        setData(newList);
        setFilteredData(newList);
        message.success("Review deleted successfully!");
      },
    });
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editMode) {
        // You should call API to update review here
        const updated = data.map((item) =>
          item.id === editingRecord.id ? { ...item, ...values } : item
        );
        setData(updated);
        setFilteredData(updated);
        message.success("Review updated!");
      } else {
        // Call API to add review here
        const newId = data.length + 1;
        const newEntry = {
          id: newId,
          key: newId.toString(),
          ...values,
        };
        const newList = [...data, newEntry];
        setData(newList);
        setFilteredData(newList);
        message.success("Review added!");
      }
      setIsModalVisible(false);
    });
  };

  const columns = [
    {
      title: "Vendor ID",
      dataIndex: "vendorId",
      key: "vendorId",
    },
    {
      title: "Vendor Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
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
      title: "Review Date",
      dataIndex: "reviewDate",
      key: "reviewDate",
    },
    {
      title: "Inserted Date",
      dataIndex: "insertedDate",
      key: "insertedDate",
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
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Vendor Ratings & Reviews</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <Input
            placeholder="Search by Vendor ID or Name"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            allowClear
            style={{ minWidth: 280 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
            Add Review
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
        rowClassName={(_, index) =>
          index % 2 === 0 ? "table-row-white" : "table-row-gray"
        }
      />

      <Modal
        title={editMode ? "Edit Review" : "Add Review"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editMode ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="vendorId"
            label="Vendor ID"
            rules={[{ required: true, message: "Enter vendor ID" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Rating (1–5)"
            rules={[{ required: true, message: "Select rating" }]}
          >
            <Select placeholder="Choose rating">
              {[1, 2, 3, 4, 5].map((r) => (
                <Option key={r} value={r}>
                  {r}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="remarks"
            label="Review Remarks"
            rules={[{ required: true, message: "Enter remarks" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="userId"
            label="User ID"
            rules={[{ required: true, message: "Enter user ID" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Review Status"
            rules={[{ required: true, message: "Select status" }]}
          >
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="reviewDate"
            label="Review Date"
            rules={[{ required: false }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="insertedDate"
            label="Inserted Date"
            rules={[{ required: false }]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VendorRating;
