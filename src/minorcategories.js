
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
} from "@ant-design/icons";
import axios from "axios";
const { Option } = Select;
const { confirm } = Modal;



const BASE_URL = "http://13.201.150.234/t2/api/";
const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWNiYTJmOTY1YzEzNmEzYzgyOWQxMjE2NjQ4YTAyOGZmODVhNGQyOGJlZDNlOWY3YzY0ZjJmYWRkMjk4YzdhZGIxM2ZmMGY0YjU0NjhlZmQiLCJpYXQiOjE3NTQ4ODk5NDkuNjYwMjk4LCJuYmYiOjE3NTQ4ODk5NDkuNjYwMzAyLCJleHAiOjE3ODY0MjU5NDkuNjQ5ODE5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.MNhyeRUjB-Fx9p9-6CAFRf42wteF3Q0Qb4i-9rvT6mkuXeVEhe91tgtCyENV_0HPRfu23ZmR1kbZ2n6XA4WnYAQY6rKGePI8r97frKUvHc94Sk2PnVNmaThoeDd8A0ee1OiwH3MIfsuzcnrpBn6TZS14LGiwyE09nktdFxu6e2kbllap_sTeIpcnRuKbCX48fAgLhZsOpTw_YnysXoHkFF8wHNqe9Uhayr5TF9NZ-92V7Cs_aHfJMMsTd60sCG9xBnRaYGCB69UHmPaDT2eBaZMzWZOApUNDcS9mRbEUhdwT8vTF3m121_uCPy3ac1o35PdM_nYTCIvaqRap0hu6USrCo7evn4bdgXgfb3m9yagf-zT1TjbRmYwJmhGy_EaJauiFwqt1HIDpEpRcRjOhF0R3j0i-oQQEjDKOIEn27wAZSN1GNer5a48mQYOqBXYA4_fxf6QRiARkbnmcKLwaCplV6qv2039b-5guMKCC-VceNxSp7El-QTDff-GLrb94GNoOZX7HDT5MGaMgaGU35RY6Y-W-gUtHAlYLNU_4bXsoW7_p4U9UWWkKZMMW0G4H0sZW0-Lna_1dtxI2XRBBFQ9_S7D6axxQriOXWWtRe0JoBN7IQn9bF_yuEsL-gQqRJL93tANSFGft2qZ21PUVdkfifTJyz5rVz1IR7WpK6xY"; // replace with your real token


// const majorCategories = [
//   { id: 1, name: "Solar" },
//   { id: 2, name: "Wind" },
//   { id: 3, name: "Hydro" },
// ];

const MinorCategory = () => {
  const [categories, setCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
const [majorCategories, setMajorCategories] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);

  const [fileList, setFileList] = useState([]);
const [totalCount, setTotalCount] = useState(0);
 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // fixed page size

const fetchMajorCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}admin/master/categories`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (res.data.success) {
      setMajorCategories(res.data.data.data || []);  // Adjust path based on your API response
    } else {
      message.error("Failed to fetch major categories");
    }
  } catch (error) {
    console.error("Error fetching major categories:", error);
    message.error("Error fetching major categories");
  }
};
useEffect(() => {
  fetchMajorCategories();
}, []);

  
  // Convert uploaded file to Base64 string for preview/storage
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Convert base64 URL to a File object for Upload preview in edit mode
  const base64ToFile = async (base64, filename) => {
    const res = await fetch(base64);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  };

  

const fetchCategories = async (page = 1, name = "") => {
  try {
    const response = await axios.get(`${BASE_URL}admin/master/subcategories`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      params: {
        page: page,
        limit: pageSize,
        name,
      },
    });

    if (response.data.success) {
      const data = response.data.data;
      const sortedData = data.data.sort((a, b) => b.id - a.id);
      const apiData = sortedData.map((item) => ({
        key: item.id.toString(),
        id: item.id,
        name: item.name,
        description: item.description || "",
        status: item.status_text || (item.status === 1 ? "Active" : "Inactive"),
        majorCategoryId: item.parent_id || null,
        majorCategoryName:
          majorCategories.find((m) => m.id === item.parent_id)?.name ||
          item.parent_id ||
          "N/A",
        photo: item.icon || "",
      }));
      setCategories(apiData);
      setFilteredData(apiData);
      setTotalCount(data.total || apiData.length); // total count for pagination
    } else {
      message.error("Failed to fetch categories");
    }
  } catch (error) {
    console.error(error);
    message.error("Error fetching categories");
  }
};

 useEffect(() => {
    fetchCategories(currentPage, searchText);
  }, [currentPage, searchText]);


const handleSearch = (value) => {
  setSearchText(value);
  setCurrentPage(1);
};


  const showAddModal = () => {
    setEditMode(false);
    form.resetFields();
    setFileList([]);
    setIsModalVisible(true);
  };

//  const showEditModal = (record) => {

//   setEditMode(true);
//   setEditingRecord(record);
//    // Map status to exact string values expected by the Select component
//   let statusValue = "Inactive";
//   if (
//     record.status === "Active" || 
//     record.status === 1 || 
//     record.status === "1"
//   ) {
//     statusValue = "Active";
//   }

//   form.setFieldsValue({
//     majorCategoryId: record.majorCategoryId,
//     name: record.name,
//     description: record.description,
//     status: statusValue,
//   });

//   if (record.photo) {
//     setFileList([
//       {
//         uid: "-1",
//         name: "photo.png",
//         status: "done",
//         url: record.photo,  // just URL for preview
//          originFileObj: file, // important for form Upload component
//       },
//     ]);
//   } else {
//     setFileList([]);
//   }

//   setIsModalVisible(true);
// };

// const showEditModal = (record) => {
//   setEditMode(true);
//   setEditingRecord(record);

//   let statusValue = "Inactive";
//   if (
//     record.status === "Active" ||
//     record.status === 1 ||
//     record.status === "1"
//   ) {
//     statusValue = "Active";
//   }

//   form.setFieldsValue({
//     majorCategoryId: record.majorCategoryId,
//     name: record.name,
//     description: record.description,
//     status: statusValue,
//   });

//  if (record.photo) {
//   setFileList([
//     {
//       uid: '-1',
//       name: 'photo.png',
//       status: 'done',
//       url: record.photo,
//       originFileObj: null,  
//     },
//   ]);
// } else {
//   setFileList([]);
// }


//   setIsModalVisible(true);
// };

const showEditModal = (record) => {
  setEditMode(true);
  setEditingRecord(record);

  let statusValue = "Inactive";
  if (record.status === "Active" || record.status === 1 || record.status === "1") {
    statusValue = "Active";
  }

  form.setFieldsValue({
    majorCategoryId: record.majorCategoryId,
    name: record.name,
    description: record.description,
    status: statusValue,
  });

  if (record.photo) {
    setFileList([
      {
        uid: '-1',
        name: record.photo.split('/').pop() || 'photo.png',
        status: 'done',
        url: record.photo,  // URL for preview
        // omit originFileObj here, or keep undefined
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
          `${BASE_URL}admin/master/subcategories/${record.id}`,
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

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // const handleOk = async () => {
  //   try {
  //     const values = await form.validateFields();

  //     // Prepare multipart form data
  //     const formData = new FormData();
  //     formData.append("parent_id", values.majorCategoryId);
  //     formData.append("name", values.name);
  //     formData.append("code", values.name.replace(/\s+/g, "").toLowerCase()); // code from name or customize
  //     formData.append("description", values.description);
  //     formData.append("status", values.status === "Active" ? "1" : "0");

  //     // Append icon file if uploaded
  //     if (fileList.length > 0 && fileList[0].originFileObj) {
  //       formData.append("icon", fileList[0].originFileObj);
  //     }

  //     let apiUrl = `${BASE_URL}admin/master/subcategories`;
  //     let method = "POST";
  //     if (editMode) {
  //       apiUrl = `${apiUrl}/${editingRecord.id}`;
  //     }

  //     const res = await fetch(apiUrl, {
  //       method,
  //       headers: {
  //         Authorization: `Bearer ${TOKEN}`,
  //       },
  //       body: formData,
  //     });

  //     const data = await res.json();

  //     if (data.success) {
  //       message.success(
  //         editMode
  //           ? "Minor category updated successfully!"
  //           : "Minor category added successfully!"
  //       );
  //       setIsModalVisible(false);
  //       form.resetFields();
  //       setFileList([]);
  //       fetchCategories();
  //     } else {
  //       message.error(data.message || "Operation failed");
  //     }
  //   } catch (errorInfo) {
  //     console.log("Validation Failed:", errorInfo);
  //   }
  // };
const handleOk = async () => {
  try {
    const values = await form.validateFields();

    // Prepare multipart form data
    const formData = new FormData();
    formData.append("parent_id", values.majorCategoryId);
    formData.append("name", values.name);
    formData.append("code", values.name.replace(/\s+/g, "").toLowerCase());
    formData.append("description", values.description);
    formData.append("status", values.status === "Active" ? "1" : "0");

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("icon", fileList[0].originFileObj);
    }
    

    let apiUrl = `${BASE_URL}admin/master/subcategories`;
    let method = "POST";
    if (editMode) {
      apiUrl = `${apiUrl}/${editingRecord.id}`;
    }

    const res = await fetch(apiUrl, {
      method,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      message.success(
        editMode
          ? "Minor category updated successfully!"
          : "Minor category added successfully!"
      );
      setIsModalVisible(false);
      form.resetFields();
      setFileList([]);

      // Reset to page 1 to show newest first after add/update
      setCurrentPage(1);
      fetchCategories(1, searchText); 
      // This triggers useEffect to fetch page 1 with newest categories
    } else {
      message.error(data.message || "Operation failed");
    }
  } catch (errorInfo) {
    console.log("Validation Failed:", errorInfo);
  }
};
const handlePreview = async (file) => {
  let src = file.url;
  if (!src && file.originFileObj) {
    src = await getBase64(file.originFileObj);
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow.document.write(image.outerHTML);
};

  const columns = [
    {
      title: "#S.No",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Minor Category Name",
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
      title: "Major Category",
      dataIndex: "majorCategoryName",
      key: "majorCategoryName",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) =>
        photo ? (
          <img
            src={photo}
            alt="minor category"
            style={{ width: 50, height: 50, objectFit: "cover" }}
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
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            type="primary"
          />
         <Button
  icon={<DeleteOutlined style={{ color: "#ffffff" }} />}
  onClick={() => {
    handleDelete(record);
  }}
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

  // Upload props for controlled Upload component
  const uploadProps = {
    beforeUpload: () => false, // prevent auto upload
    onRemove: () => setFileList([]),
    fileList,
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList.slice(-1)); // only 1 file max
    },
    accept: "image/*",
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
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Minor Category</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <Input
            placeholder="Search by minor category name"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            allowClear
            style={{ minWidth: 280 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
            Add Minor Category
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
        rowClassName={(_, index) =>
          index % 2 === 0 ? "table-row-white" : "table-row-gray"
        }
      />

      <Modal
        title={editMode ? "Edit Minor Category" : "Add Minor Category"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editMode ? "Update" : "Add"}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="majorCategoryId"
            label="Major Category"
            rules={[{ required: true, message: "Please select major category" }]}
          >
            {/* <Select placeholder="Select major category">
              {majorCategories.map((mc) => (
                <Option key={mc.id} value={mc.id}>
                  {mc.name}
                </Option>
              ))}
            </Select> */}
            <Select placeholder="Select major category">
  {majorCategories.map((mc) => (
    <Option key={mc.id} value={mc.id}>
      {mc.name}
    </Option>
  ))}
</Select>

          </Form.Item>
          <Form.Item
            name="name"
            label="Minor Category Name"
            rules={[
              { required: true, message: "Please enter minor category name" },
            ]}
          >
            <Input placeholder="e.g. Residential, Commercial" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea placeholder="Description" rows={3} />
          </Form.Item>

          <Form.Item
            name="photo"
            label="Photo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="Upload a photo for this category"
          >
            {/* <Upload {...uploadProps} listType="picture" maxCount={1}   onPreview={handlePreview}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload> */}
            <Upload
  {...uploadProps}
  listType="picture"
  maxCount={1}
  onPreview={handlePreview}  // <-- Add this line
>
  <Button icon={<UploadOutlined />}>Click to Upload</Button>
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

export default MinorCategory;
