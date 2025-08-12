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
// import { useEffect } from "react";
// import api from "./api";
// import axios from "axios";
// const { Option } = Select;
// const { confirm } = Modal;
// const BASE_URL = "http://13.201.150.234/t2/api/";
// const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWNiYTJmOTY1YzEzNmEzYzgyOWQxMjE2NjQ4YTAyOGZmODVhNGQyOGJlZDNlOWY3YzY0ZjJmYWRkMjk4YzdhZGIxM2ZmMGY0YjU0NjhlZmQiLCJpYXQiOjE3NTQ4ODk5NDkuNjYwMjk4LCJuYmYiOjE3NTQ4ODk5NDkuNjYwMzAyLCJleHAiOjE3ODY0MjU5NDkuNjQ5ODE5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.MNhyeRUjB-Fx9p9-6CAFRf42wteF3Q0Qb4i-9rvT6mkuXeVEhe91tgtCyENV_0HPRfu23ZmR1kbZ2n6XA4WnYAQY6rKGePI8r97frKUvHc94Sk2PnVNmaThoeDd8A0ee1OiwH3MIfsuzcnrpBn6TZS14LGiwyE09nktdFxu6e2kbllap_sTeIpcnRuKbCX48fAgLhZsOpTw_YnysXoHkFF8wHNqe9Uhayr5TF9NZ-92V7Cs_aHfJMMsTd60sCG9xBnRaYGCB69UHmPaDT2eBaZMzWZOApUNDcS9mRbEUhdwT8vTF3m121_uCPy3ac1o35PdM_nYTCIvaqRap0hu6USrCo7evn4bdgXgfb3m9yagf-zT1TjbRmYwJmhGy_EaJauiFwqt1HIDpEpRcRjOhF0R3j0i-oQQEjDKOIEn27wAZSN1GNer5a48mQYOqBXYA4_fxf6QRiARkbnmcKLwaCplV6qv2039b-5guMKCC-VceNxSp7El-QTDff-GLrb94GNoOZX7HDT5MGaMgaGU35RY6Y-W-gUtHAlYLNU_4bXsoW7_p4U9UWWkKZMMW0G4H0sZW0-Lna_1dtxI2XRBBFQ9_S7D6axxQriOXWWtRe0JoBN7IQn9bF_yuEsL-gQqRJL93tANSFGft2qZ21PUVdkfifTJyz5rVz1IR7WpK6xY"; // replace with your real token

// const initialData = [
//   {
//     key: "1",
//     id: 1,
//     name: "SMA",
//     status: "Active",
//   },
//   {
//     key: "2",
//     id: 2,
//     name: "Fronius",
//     status: "Inactive",
//   },
//   {
//     key: "3",
//     id: 3,
//     name: "ABB",
//     status: "Active",
//   },
// ];
// const { confirm: modalConfirm } = Modal;

// const InverterBrand = () => {
//   const [inverterBrands, setInverterBrands] = useState([]);
// const [filteredData, setFilteredData] = useState([]);

//   const [searchText, setSearchText] = useState("");

//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [form] = Form.useForm();
//   const [editingRecord, setEditingRecord] = useState(null);

//   const handleSearch = (value) => {
//     setSearchText(value);
//     const filtered = inverterBrands.filter((item) =>
//       item.name.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   const showAddModal = () => {
//     setEditMode(false);
//     form.resetFields();
//     setIsModalVisible(true);
//   };

// const showEditModal = (record) => {
//   setEditMode(true);
//   setEditingRecord(record);
//   form.setFieldsValue({
//     name: record.name,
//     status: record.status, // "Active" or "Inactive"
//   });
//   setIsModalVisible(true);
// };

// // const handleDelete = async (id) => {
// //   console.log("Delete clicked for ID:", id);
// //   try {
// //     const res = await api.delete(`admin/master/master-data/inverter-brands/${id}`);
// //     console.log("Delete API response:", res.data);
// //     if (res.data.success) {
// //       message.success("Deleted successfully");
// //       fetchInverterBrands();
// //     } else {
// //       message.error(res.data.message || "Delete failed");
// //     }
// //   } catch (err) {
// //     console.error("Delete failed with error:", err);
// //     message.error("Delete failed");
// //   }
// // };
// const handleDelete = (record) => {

//   if (!record?.id) {
//     message.error("Invalid record ID");
//     return;
//   }


//   confirm({
//     title: "Are you sure you want to delete this brand?",
//     content: `"${record.name}" will be permanently deleted.`,
//     okText: "Yes",
//     okType: "danger",
//     cancelText: "No",
//     async onOk() {
//       try {
//         const res = await axios.delete(
//           `${BASE_URL}admin/master/master-data/inverter-brands/${record.id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${TOKEN}`,
//             },
//           }
//         );

//         if (res.data.success) {
//           message.success("Inverter Brand deleted successfully!");
//           fetchInverterBrands();
//         } else {
//           message.error(res.data.message || "Failed to delete inverter brands");
//         }
//       } catch (error) {
//         console.error("Delete API error:", error);
//         message.error("Error deleting inverter brands");
//       }
//     },
//   });
// };

//   const handleOk = () => {
//   form.validateFields().then(async (values) => {
//     try {
//       const payload = {
//         name: values.name,
//         status: values.status === "Active" ? 1 : 0,
//       };

//       if (editMode) {
//         await api.put(
//           `admin/master/master-data/inverter-brands/${editingRecord.id}`,
//           payload
//         );
//         message.success("Inverter Brand updated!");
//       } else {
//         await api.post("admin/master/master-data/inverter-brands", payload);
//         message.success("Inverter Brand added!");
//       }

//       setIsModalVisible(false);
//       fetchInverterBrands();
//     } catch (err) {
//       message.error("Save failed.");
//       console.error("Save Error:", err);
//     }
//   });
// };

//   useEffect(() => {
//   fetchInverterBrands();
// }, []);

// const fetchInverterBrands = async () => {
//   try {
//     const res = await api.get("admin/master/master-data/inverter-brands");
//     if (res.data.success) {
//       const data = res.data.data.map((item) => ({
//         key: item.id.toString(),
//         id: item.id,
//         name: item.name,
//         status: item.status_text,
//         statusRaw: item.status, // Save raw value for PUT
//       }));
//       setInverterBrands(data);
//       setFilteredData(data);
//     }
//   } catch (err) {
//     message.error("Failed to fetch inverter brands.");
//     console.error("Fetch Error:", err);
//   }
// };

//   const columns = [
//     {
//       title: "#S.No",
//       dataIndex: "id",
//       key: "id",
//       sorter: (a, b) => a.id - b.id,
//     },
//     {
//       title: "Brand Name",
//       dataIndex: "name",
//       key: "name",
//       render: (text) => highlightText(text, searchText),
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//   <Tag
//                                 style={{
//                                   backgroundColor: status === "Active" ? "#2fb344" : "#d63939", // dark green / dark red
//                                   color: "#ffffff", // white text
//                                   border: "none",
//                                 }}
//                               >
//                                 {status}
//                               </Tag>
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
//            type="primary"
//           />
//        {/* <Button
//   icon={<DeleteOutlined style={{ color: "#ffffff" }} />}
//   onClick={() => handleDelete(record)}
//   style={{
//     backgroundColor: "#d63939",
//     borderColor: "#d63939",
//     color: "#ffffff",
//   }}
// /> */}
// <Button
//   danger
//   icon={<DeleteOutlined style={{color:"ffffff"}} />}
  
//   onClick={() => 
   
//     handleDelete(record)}
//     style={{backgroundColor: "#d63939", borderColor: "#d63939", color: "#ffffff"
   
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
//         <h2 style={{ fontSize: 20, fontWeight: 600 }}>Inverter Brand</h2>
//         <div style={{ display: "flex", gap: "10px" }}>
//           <Input
//             placeholder="Search by brand name"
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
//             Add Inverter Brand
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

//       {/* Add / Edit Modal */}
//       <Modal
//         title={editMode ? "Edit Inverter Brand" : "Add Inverter Brand"}
//         open={isModalVisible}
//         onOk={handleOk}
//         onCancel={() => setIsModalVisible(false)}
//         okText={editMode ? "Update" : "Add"}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="name"
//             label="Brand Name"
//             rules={[{ required: true, message: "Please enter brand name" }]}
//           >
//             <Input placeholder="e.g. SMA, ABB" />
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

// export default InverterBrand;
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
import api from "./api";
import axios from "axios";

const { Option } = Select;
const { confirm } = Modal;
const BASE_URL = "http://13.201.150.234/t2/api/";
const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWNiYTJmOTY1YzEzNmEzYzgyOWQxMjE2NjQ4YTAyOGZmODVhNGQyOGJlZDNlOWY3YzY0ZjJmYWRkMjk4YzdhZGIxM2ZmMGY0YjU0NjhlZmQiLCJpYXQiOjE3NTQ4ODk5NDkuNjYwMjk4LCJuYmYiOjE3NTQ4ODk5NDkuNjYwMzAyLCJleHAiOjE3ODY0MjU5NDkuNjQ5ODE5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.MNhyeRUjB-Fx9p9-6CAFRf42wteF3Q0Qb4i-9rvT6mkuXeVEhe91tgtCyENV_0HPRfu23ZmR1kbZ2n6XA4WnYAQY6rKGePI8r97frKUvHc94Sk2PnVNmaThoeDd8A0ee1OiwH3MIfsuzcnrpBn6TZS14LGiwyE09nktdFxu6e2kbllap_sTeIpcnRuKbCX48fAgLhZsOpTw_YnysXoHkFF8wHNqe9Uhayr5TF9NZ-92V7Cs_aHfJMMsTd60sCG9xBnRaYGCB69UHmPaDT2eBaZMzWZOApUNDcS9mRbEUhdwT8vTF3m121_uCPy3ac1o35PdM_nYTCIvaqRap0hu6USrCo7evn4bdgXgfb3m9yagf-zT1TjbRmYwJmhGy_EaJauiFwqt1HIDpEpRcRjOhF0R3j0i-oQQEjDKOIEn27wAZSN1GNer5a48mQYOqBXYA4_fxf6QRiARkbnmcKLwaCplV6qv2039b-5guMKCC-VceNxSp7El-QTDff-GLrb94GNoOZX7HDT5MGaMgaGU35RY6Y-W-gUtHAlYLNU_4bXsoW7_p4U9UWWkKZMMW0G4H0sZW0-Lna_1dtxI2XRBBFQ9_S7D6axxQriOXWWtRe0JoBN7IQn9bF_yuEsL-gQqRJL93tANSFGft2qZ21PUVdkfifTJyz5rVz1IR7WpK6xY"; // Replace with your real token

const InverterBrand = () => {
  const [inverterBrands, setInverterBrands] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);

  const fetchInverterBrands = async (page = 1, search = "") => {
    try {
      // Pass page and limit if your API supports pagination,
      // otherwise fetch all and paginate frontend
      const res = await api.get("admin/master/master-data/inverter-brands", {
        params: {
          page,
          limit: pageSize,
          name: search || undefined,
        },
      });

      if (res.data.success) {
        // Sort descending by id (newest first)
        const sortedData = res.data.data.sort((a, b) => b.id - a.id);

        const mappedData = sortedData.map((item) => ({
          key: item.id.toString(),
          id: item.id,
          name: item.name,
          status: item.status_text,
          statusRaw: item.status,
        }));

        setInverterBrands(mappedData);
        setFilteredData(mappedData);
        setTotalCount(res.data.total || mappedData.length);
      } else {
        message.error("Failed to fetch inverter brands.");
      }
    } catch (err) {
      message.error("Failed to fetch inverter brands.");
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchInverterBrands(currentPage, searchText);
  }, [currentPage, searchText]);

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1); // Reset to first page on search
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
    if (!record?.id) {
      message.error("Invalid record ID");
      return;
    }

    confirm({
      title: "Are you sure you want to delete this brand?",
      content: `"${record.name}" will be permanently deleted.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          const res = await axios.delete(
            `${BASE_URL}admin/master/master-data/inverter-brands/${record.id}`,
            {
              headers: {
                Authorization: `Bearer ${TOKEN}`,
              },
            }
          );

          if (res.data.success) {
            message.success("Inverter Brand deleted successfully!");
            fetchInverterBrands(currentPage, searchText);
          } else {
            message.error(res.data.message || "Failed to delete inverter brands");
          }
        } catch (error) {
          console.error("Delete API error:", error);
          message.error("Error deleting inverter brands");
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
        };

        if (editMode) {
          await api.put(
            `admin/master/master-data/inverter-brands/${editingRecord.id}`,
            payload
          );
          message.success("Inverter Brand updated!");
        } else {
          await api.post("admin/master/master-data/inverter-brands", payload);
          message.success("Inverter Brand added!");
        }

        setIsModalVisible(false);
        setCurrentPage(1); // Reset to first page to show newest first
        fetchInverterBrands(1, searchText);
      } catch (err) {
        message.error("Save failed.");
        console.error("Save Error:", err);
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
      title: "Brand Name",
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
            danger
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
        <span key={index} style={{ backgroundColor: "yellow" }}>{part}</span>
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
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Inverter Brand</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <Input
            placeholder="Search by brand name"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            allowClear
            style={{ minWidth: 280 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
            Add Inverter Brand
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: "max-content" }}
        pagination={{
          current: currentPage,
          pageSize,
          total: totalCount,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: false,
        }}
        rowClassName={(_, index) =>
          index % 2 === 0 ? "table-row-white" : "table-row-gray"
        }
      />

      <Modal
        title={editMode ? "Edit Inverter Brand" : "Add Inverter Brand"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editMode ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Brand Name"
            rules={[{ required: true, message: "Please enter brand name" }]}
          >
            <Input placeholder="e.g. SMA, ABB" />
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

export default InverterBrand;
