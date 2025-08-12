
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
import { EditOutlined, PlusOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;
const { confirm } = Modal;

const BASE_URL = "http://13.201.150.234/t2/api";
const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWNiYTJmOTY1YzEzNmEzYzgyOWQxMjE2NjQ4YTAyOGZmODVhNGQyOGJlZDNlOWY3YzY0ZjJmYWRkMjk4YzdhZGIxM2ZmMGY0YjU0NjhlZmQiLCJpYXQiOjE3NTQ4ODk5NDkuNjYwMjk4LCJuYmYiOjE3NTQ4ODk5NDkuNjYwMzAyLCJleHAiOjE3ODY0MjU5NDkuNjQ5ODE5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.MNhyeRUjB-Fx9p9-6CAFRf42wteF3Q0Qb4i-9rvT6mkuXeVEhe91tgtCyENV_0HPRfu23ZmR1kbZ2n6XA4WnYAQY6rKGePI8r97frKUvHc94Sk2PnVNmaThoeDd8A0ee1OiwH3MIfsuzcnrpBn6TZS14LGiwyE09nktdFxu6e2kbllap_sTeIpcnRuKbCX48fAgLhZsOpTw_YnysXoHkFF8wHNqe9Uhayr5TF9NZ-92V7Cs_aHfJMMsTd60sCG9xBnRaYGCB69UHmPaDT2eBaZMzWZOApUNDcS9mRbEUhdwT8vTF3m121_uCPy3ac1o35PdM_nYTCIvaqRap0hu6USrCo7evn4bdgXgfb3m9yagf-zT1TjbRmYwJmhGy_EaJauiFwqt1HIDpEpRcRjOhF0R3j0i-oQQEjDKOIEn27wAZSN1GNer5a48mQYOqBXYA4_fxf6QRiARkbnmcKLwaCplV6qv2039b-5guMKCC-VceNxSp7El-QTDff-GLrb94GNoOZX7HDT5MGaMgaGU35RY6Y-W-gUtHAlYLNU_4bXsoW7_p4U9UWWkKZMMW0G4H0sZW0-Lna_1dtxI2XRBBFQ9_S7D6axxQriOXWWtRe0JoBN7IQn9bF_yuEsL-gQqRJL93tANSFGft2qZ21PUVdkfifTJyz5rVz1IR7WpK6xY"; // replace with your real token

const MajorCategory = () => {
  const [categories, setCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);

  const [fileList, setFileList] = useState([]);

  const [totalCount, setTotalCount] = useState(0);
 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // fixed page size
const [imageRemoved, setImageRemoved] = useState(false);


  useEffect(() => {
    fetchCategories(currentPage, searchText);
  }, [currentPage, searchText]);



 const fetchCategories = async (page = 1, name = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/master/categories`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      params: {
        page: page,
        limit: pageSize,
        name,
      },
    });

    if (response.data.success) {
      const data = response.data.data;
      // Sort descending by id before mapping
      const sortedData = data.data.sort((a, b) => b.id - a.id);

      const apiData = sortedData.map((item) => ({
        key: item.id.toString(),
        id: item.id,
        name: item.name,
        description: item.description || "",
        status: item.status_text || (item.status === 1 ? "Active" : "Inactive"),
        photo: item.icon || "",
      }));
      setCategories(apiData);
      setFilteredData(apiData);
      setTotalCount(data.total || apiData.length);
    } else {
      message.error("Failed to fetch categories");
    }
  } catch (error) {
    console.error(error);
    message.error("Error fetching categories");
  }
};

   const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1); // reset page on new search
  };


  const showAddModal = () => {
    setEditMode(false);
    form.resetFields();
    setFileList([]);
    setIsModalVisible(true);
  };

// const showEditModal = (record) => {
//   setEditMode(true);
//   setEditingRecord(record);

//   form.setFieldsValue({
//     name: record.name,
//     description: record.description,
//     status: record.status,
//   });

//   // For preview only, not a file object
//   if (record.photo) {
//     setFileList([
//       {
//         uid: "-1",
//         name: record.photo.split("/").pop(),
//         status: "done",
//         url: record.photo,
//         // originFileObj: null,  // explicitly mark no new file
//       },
//     ]);
//   } else {
//     setFileList([]);
//   }

//   setIsModalVisible(true);
// };
const showEditModal = (record) => {
  setEditMode(true);
  setEditingRecord(record);

  form.setFieldsValue({
    name: record.name,
    description: record.description,
    status: record.status,
  });

  if (record.photo) {
    setFileList([
      {
        uid: "-1",
        name: record.photo.split("/").pop(),
        status: "done",
        url: record.photo, // Just URL here, no File object or fetch
      },
    ]);
  } else {
    setFileList([]);
  }

  setIsModalVisible(true);
};

const handleDelete = (record) => {

  if (!record?.id) {
    message.error("Invalid record ID");
    return;
  }


  confirm({
    title: "Are you sure you want to delete this category?",
    content: `"${record.name}" will be permanently deleted.`,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    async onOk() {
      try {
        const res = await axios.delete(
          `${BASE_URL}/admin/master/categories/${record.id}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );

        if (res.data.success) {
          message.success("Category deleted successfully!");
          fetchCategories();
        } else {
          message.error(res.data.message || "Failed to delete category");
        }
      } catch (error) {
        console.error("Delete API error:", error);
        message.error("Error deleting category");
      }
    },
  });
};



// const handleOk = async () => {
//   try {
//     const values = await form.validateFields();

//     const formData = new FormData();
//     formData.append("name", values.name);
//     formData.append("description", values.description);
//     formData.append("status", values.status === "Active" ? "1" : "0");
//     formData.append("code", values.name.replace(/\s+/g, "").toLowerCase());

//     // Only append 'icon' if user uploaded a new file (originFileObj exists)
//     if (fileList.length > 0 && fileList[0].originFileObj) {
//       formData.append("icon", fileList[0].originFileObj);
//     }
//     else if (imageRemoved) {
//       // Backend ko batayen ke image delete karni hai
//       formData.append("remove_icon", "1"); // backend is key ko support kare to
//     }

//     if (editMode) {
//       // Update category
//       const res = await axios.post(
//         `${BASE_URL}/admin/master/categories/${editingRecord.id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${TOKEN}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       if (res.data.success) {
//         message.success("Major category updated successfully!");
//         fetchCategories();
//       } else {
//         message.error("Failed to update category");
//       }
//     } else {
//       // Add new category
//       const res = await axios.post(`${BASE_URL}/admin/master/categories`, formData, {
//         headers: {
//           Authorization: `Bearer ${TOKEN}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       if (res.data.success) {
//         message.success("Major category added successfully!");
//         fetchCategories();
//       } else {
//         message.error("Failed to add category");
//       }
//     }

//     setIsModalVisible(false);
//     form.resetFields();
//     setFileList([]);
//     setEditingRecord(null);
//   } catch (errorInfo) {
//     console.log("Validate Failed:", errorInfo);
//   }
// };

const handleOk = async () => {
  try {
    const values = await form.validateFields();

    const formData = new FormData();
    console.log("Submitting form with:", {
  name: values.name,
  description: values.description,
  status: values.status,
  imageRemoved,
  fileList,
});

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("status", values.status === "Active" ? "1" : "0");
    formData.append("code", values.name.replace(/\s+/g, "").toLowerCase());

    if (fileList.length > 0 && fileList[0].originFileObj) {
      // New file uploaded
      formData.append("icon", fileList[0].originFileObj);
    } else if (imageRemoved) {
      // User removed existing image
      formData.append("remove_icon", "1");
    }

    let res;
    if (editMode) {
      res = await axios.post(
        `${BASE_URL}/admin/master/categories/${editingRecord.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      res = await axios.post(`${BASE_URL}/admin/master/categories`, formData, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      });
    }

    if (res.data.success) {
      message.success(editMode ? "Category updated successfully!" : "Category added successfully!");
      setIsModalVisible(false);
      form.resetFields();
      setFileList([]);
      setEditingRecord(null);
      setImageRemoved(false);
      setCurrentPage(1);
      fetchCategories(1, searchText);
    } else {
      message.error(res.data.message || "Operation failed");
    }
  } catch (errorInfo) {
    console.log("Validate Failed:", errorInfo);
  }
};

  // const uploadProps = {
  //   beforeUpload: () => false, // prevent auto upload, handle manually
  //   onRemove: () => setFileList([]),
  //   fileList,
  //   onChange: ({ fileList: newFileList }) => {
  //     setFileList(newFileList.slice(-1)); // keep last uploaded file only
  //     setImageRemoved(newFileList.length === 0);
  //   },
  //   accept: "image/*",
  // };
  const uploadProps = {
  beforeUpload: () => false,
  onRemove: () => setFileList([]),
  fileList,
  onChange: ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
    setImageRemoved(newFileList.length === 0); // <-- important to track removal
  },
  accept: "image/*",
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
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) =>
        photo ? (
          <img
            src={photo}
            alt="category"
            style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
          />
        ) : (
          "No photo"
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
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)} type="primary" />
          <Button
            icon={<DeleteOutlined style={{ color: "#ffffff" }} />}
            onClick={() => handleDelete(record)}
            style={{
              backgroundColor: "#d63939",
              borderColor: "#d63939",
              color: "#ffffff",
            }}
          />
          {/* <Button onClick={() => handleDelete(record)} danger>
  Test Delete
</Button> */}

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
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Major Category</h2>

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
      pagination={{
          total: totalCount,
          pageSize: pageSize,
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: false,
        }}
        rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")}
      />

      <Modal
        title={editMode ? "Edit Category" : "Add Category"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editMode ? "Update" : "Add"}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input placeholder="e.g. Solar, Wind" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: false }]}
          >
            <Input.TextArea placeholder="Enter category description" rows={3} />
          </Form.Item>

          <Form.Item
            name="photo"
            label="Photo"

            extra="Upload an image for this category"
          >
            <Upload {...uploadProps} listType="picture-card" maxCount={1}>
              {fileList.length < 1 && (
                <div>
                  <UploadOutlined /> Upload
                </div>
              )}
            </Upload>
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

export default MajorCategory;
