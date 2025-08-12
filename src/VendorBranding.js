
// import React, { useState } from "react";
// import {
//   Table,
//   Tag,
//   Input,
//   Button,
//   Card,
//   Typography,
//   Space,
//   Select,
//   Tooltip,
//   Form,
//   Modal,
//   Upload,
// } from "antd";
// import dayjs from "dayjs";
// import { EditOutlined,PlusOutlined,CloseOutlined,CheckOutlined, EyeOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";

// const { Title } = Typography;
// const { Option } = Select;

// const initialData = [
//   {
//     key: 1,
//     vendorId: "VND001",
//     name:"Avni",
//     companyName: "SolarEdge Ltd.",
//     branding_doc_code: "9876987",
//     brand_attachment: "/story.png",
//     brand_doc_text: "Branding Document",
//     documentName: "Solar Branding",
//     remarks: "",
//     status: "Pending",
//     createdDate: "2024-07-01T10:00:00",
//     updatedDate: "2024-07-20T12:30:00",
//     updatedBy: "admin001",
//   },
//   {
//     key: 2,
//     vendorId: "VND002",
//     name:"Rahul",
//     companyName: "GreenPower Inc.",
//     branding_doc_code: "09876543",
//     brand_attachment: "/story.png",
//     brand_doc_text: "Branding Document",
//     documentName: "Green Doc",
//     remarks: "",
//     status: "Pending",
//     createdDate: "2024-06-15T09:20:00",
//     updatedDate: "2024-07-15T15:45:00",
//     updatedBy: "admin002",
//   },
//   {
//     key: 3,
//     vendorId: "VND003",
//     name:"Raman",
//     companyName: "EcoVolt",
//     branding_doc_code: "ABCD9876",
//     brand_attachment: "/story.png",
//     brand_doc_text: "Brand Logo & Style",
//     documentName: "Eco Branding V2",
//     remarks: "",
//     status: "Pending",
//     createdDate: "2024-07-05T11:00:00",
//     updatedDate: "2024-07-21T14:00:00",
//     updatedBy: "admin003",
//   },
// ];

// const VendorBranding = () => {
//   const [searchText, setSearchText] = useState("");
//   const [data, setData] = useState(initialData);
//     const [form] = Form.useForm();
//   const [isModalVisible, setIsModalVisible] = useState(false);
//     const [selectedKey, setSelectedKey] = useState(null);
//    const [filteredData, setFilteredData] = useState(initialData);
//     const [editingKey, setEditingKey] = useState(null);
//     const [editingStatus, setEditingStatus] = useState("");
//     const [docModalVisible, setDocModalVisible] = useState(false);
// const [docForm] = Form.useForm();
// const [currentRecordKey, setCurrentRecordKey] = useState(null);
// const [isEditMode, setIsEditMode] = useState(false);

// const navigate = useNavigate();
// const openDocModal = (record) => {
//   setCurrentRecordKey(record.key);
//   setIsEditMode(!!record.documentName || !!record.brand_attachment);

//   // For edit mode, set doc_attachment as fileList array for Upload component
//   docForm.setFieldsValue({
//     documentName: record.documentName || "",
//     brand_attachment: record.brand_attachment
//       ? [
//           {
//             uid: "-1",
//             name: record.brand_attachment.split("/").pop(),
//             status: "done",
//             url: record.brand_attachment,
//           },
//         ]
//       : [],
//   });

//   setDocModalVisible(true);
// };

// const handleDocModalOk = () => {
//   docForm.validateFields().then((values) => {
//     let brand_attachment = "";

//     if (values.brand_attachment && values.brand_attachment.length > 0) {
//       const uploadedFile = values.brand_attachment[0];
//       // Use file name or URL (if already uploaded)
//       brand_attachment = uploadedFile.url || uploadedFile.name || "";
//     }

//     if (isEditMode) {
//       // Edit existing record
//       const updated = data.map((item) =>
//         item.key === currentRecordKey
//           ? {
//               ...item,
//               documentName: values.documentName,
//               brand_attachment,
//             }
//           : item
//       );
//       setData(updated);
//     } else {
//       // Add new record with selected vendor
//       const newKey = data.length ? Math.max(...data.map((d) => d.key)) + 1 : 1;
//       const selectedVendor = data.find(
//         (v) => v.vendorId === values.vendorId
//       );

//       const newRecord = {
//         key: newKey,
//         vendorId: values.vendorId,
//         name: selectedVendor ? selectedVendor.name : "",
//         companyName: selectedVendor ? selectedVendor.companyName : "",
//         branding_doc_code: "", // you can set or generate this
//         brand_attachment,
//         brand_doc_text: "", // optional
//         documentName: values.documentName,
//         remarks: "",
//         status: "Pending",
//         createdDate: new Date().toISOString(),
//         updatedDate: new Date().toISOString(),
//         updatedBy: "admin", // replace as needed
//       };
//       setData([...data, newRecord]);
//     }

//     setDocModalVisible(false);
//     setCurrentRecordKey(null);
//     docForm.resetFields();
//   });
// };

// const handleDocModalCancel = () => {
//   setDocModalVisible(false);
//   setCurrentRecordKey(null);
// };

//   const handleSearch = (value) => {
//     setSearchText(value);
//     const filtered = initialData.filter(
//       (vendor) =>
//         vendor.vendorId.toLowerCase().includes(value.toLowerCase()) ||
//         vendor.branding_doc_code.toLowerCase().includes(value.toLowerCase())
//     );
//     setData(filtered);
//   };
//    const handleRefresh = () => {
//     setFilteredData(data);
//     setSearchText("");
//   };
// const openRemarkModal = (key) => {
//     const selectedRecord = data.find((item) => item.key === key);
//     setSelectedKey(key);
//     setIsModalVisible(true);
//     form.setFieldsValue({ remark: selectedRecord?.remarks || "" });
//   };
//    const handleModalOk = () => {
//     form.validateFields().then(({ remark }) => {
//       const updated = data.map((item) =>
//         item.key === selectedKey ? { ...item, remarks: remark } : item
//       );
//       setData(updated);
//       setIsModalVisible(false);
//       setSelectedKey(null);
//     });
//   };

//   const handleModalCancel = () => {
//     setIsModalVisible(false);
//     setSelectedKey(null);
//   };

//   const handleStatusChange = (value, recordKey) => {
//     const updated = data.map((item) =>
//       item.key === recordKey ? { ...item, approvalStatus: value } : item
//     );
//     setData(updated);
//   };

//   const columns = [
//     {
//       title: "Vendor ID",
//       dataIndex: "vendorId",
//       key: "vendorId",
//     },
//     {
//       title: "Vendor Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Company Name",
//       dataIndex: "companyName",
//       key: "companyName",
//     },
//     {
//       title: "Branding Doc Code",
//       dataIndex: "branding_doc_code",
//       key: "branding_doc_code",
//     },
//     {
//       title: "Document Name",
//       dataIndex: "documentName",
//       key: "documentName",
//     },
//     {
//       title: "Brand Attachment",
//       dataIndex: "brand_attachment",
//       key: "brand_attachment",
//       render: (url) => (
//         <a href={url} target="_blank" rel="noopener noreferrer">
//           View Document
//         </a>
//       ),
//     },
//     // {
//     //   title: "Brand Doc Text",
//     //   dataIndex: "brand_doc_text",
//     //   key: "brand_doc_text",
//     // },
//     {
//          title: "Remarks",
//          dataIndex: "remarks",
//          key: "remarks",
//          render: (text, record) => (
//            <Space>
//              {text ? (
//                <>
//                  <span>{text}</span>
//                  <EditOutlined
//                    style={{ color: "#1890ff", cursor: "pointer" }}
//                    onClick={() => openRemarkModal(record.key)}
//                  />
//                </>
//              ) : (
//                <Button
//                  type="link"
//                  icon={<PlusOutlined />}
//                  onClick={() => openRemarkModal(record.key)}
//                >
//                  Add
//                </Button>
//              )}
//            </Space>
//          ),
//        },
//     {
//                 title: "Status",
//                 dataIndex: "status",
//                 key: "status",
//                 render: (status, record) => {
//                   const isEditing = editingKey === record.key;
//                   const statusColors = {
//                    Pending:"#d63939",
//                     Approved: "#2fb344",
//                     UnApproved: "#d63939",
//                     Rejected: "#d63939",
                   
//                   };
          
//                   return isEditing ? (
//                     <Space>
//                       <Select
//                         value={editingStatus}
//                         onChange={(value) => setEditingStatus(value)}
//                         style={{ width: 120 }}
//                         options={[
//                          { label: "Pending", value: "Pending" },
//                           { label: "Approved", value: "Active" },
//                           { label: "UnApproved", value: "Inactive" },
//                           {label: "Rejected", value: "Rejected" },
                          
//                         ]}
//                       />
//                       <Tooltip title="Save">
//                         <CheckOutlined
//                           style={{ color: "green", cursor: "pointer" }}
//                           onClick={() => {
//                          const updated = filteredData.map((item) =>
//        item.key === record.key
//          ? { ...item, status: editingStatus }
       
//            : item
//        );
//        setFilteredData(updated);
//        setEditingKey(null);
       
       
                           
//                           }}
//                         />
//                       </Tooltip>
//                       <Tooltip title="Cancel">
//                         <CloseOutlined
//                           style={{ color: "gray", cursor: "pointer" }}
//                           onClick={() => setEditingKey(null)}
//                         />
//                       </Tooltip>
//                     </Space>
//                   ) : (
//                     <Space>
//                       <Tag
//                         style={{
//                           backgroundColor: statusColors[status] || "#888",
//                           color: "#fff",
//                           border: "none",
//                         }}
//                       >
//                         {status}
//                       </Tag>
//                       <Tooltip title="Edit Status">
//                         <EditOutlined
//                           style={{ cursor: "pointer" }}
//                           onClick={() => {
//                             setEditingKey(record.key);
//                             setEditingStatus(status);
//                           }}
//                         />
//                       </Tooltip>
//                     </Space>
//                   );
//                 },
//               },
//     // {
//     //   title: "Created Date",
//     //   dataIndex: "createdDate",
//     //   key: "createdDate",
//     //   render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
//     // },
//     // {
//     //   title: "Updated Date",
//     //   dataIndex: "updatedDate",
//     //   key: "updatedDate",
//     //   render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
//     // },
//     // {
//     //   title: "Updated By",
//     //   dataIndex: "updatedBy",
//     //   key: "updatedBy",
//     // },
//    {
//   title: "Action",
//   key: "action",
//   render: (_, record) => (
//     <Space>
//       <Button
//         type="link"
//         onClick={() => navigate("/viewbranding", { state: { record } })}
//       >
//         <span
//           style={{
//             backgroundColor: "#F0720B",
//             padding: "6px",
//             borderRadius: "4px",
//             display: "inline-flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <EyeOutlined style={{ color: "white" }} />
//         </span>
//       </Button>

//       {(record.documentName || record.brand_attachment) && (
//          <Button
//                   type="primary"
//                   icon={<EditOutlined />}
//                   onClick={() => openDocModal(record)}
//                   style={{ padding: '0 8px' }}
//                 />
//       )}
//     </Space>
//   ),
// }

//   ];

//   return (
//     <Space
//       direction="vertical"
//       size="large"
//       style={{
//         width: "100%",
//         padding: "0px 0px 0px 0",
//         borderRadius: "10px",
//       }}
//     >
//       <Card
//         title={
//         <div
//   style={{
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexWrap: "wrap",
//     gap: "10px",
//   }}
// >
//   <span style={{ fontSize: 20, fontWeight: 600 }}>
//     Vendor Branding Records
//   </span>

//   <div style={{ display: "flex", gap: "10px" }}>
//     <Button
//       type="primary"
//       icon={<PlusOutlined />}
//       onClick={() => {
//         setDocModalVisible(true);
//         setCurrentRecordKey(null);
//         setIsEditMode(false);
//         docForm.resetFields();
//       }}
//     >
//       Add Doc
//     </Button>
//     <Input
//       placeholder="Search Vendor ID or Doc Code"
//       onChange={(e) => handleSearch(e.target.value)}
//       value={searchText}
//       allowClear
//       style={{ width: 250 }}
//     />
    
//   </div>
// </div>

//         }
//         bordered
//         style={{ borderRadius: 12 }}
//         bodyStyle={{ paddingTop: 16 }}
//         headStyle={{
//           marginBottom: 0,
//           paddingBottom: 8,
//           paddingTop: 16,
//           borderBottom: "none",
//         }}
//       >
//         <Table
//           dataSource={data}
//           columns={columns}
//           pagination={{ pageSize: 5 }}
//           scroll={{ x: "max-content" }}
//           rowClassName={(_, index) =>
//             index % 2 === 0 ? "table-row-white" : "table-row-gray"
//           }
//           style={{ border: "none" }}
//         />
//       </Card>
//      <Modal
//   title={isEditMode ? "Edit Branding Document" : "Add Branding Document"}
//   open={docModalVisible}
//   onOk={handleDocModalOk}
//   onCancel={handleDocModalCancel}
//   okText="Save"
// >
//   <Form form={docForm} layout="vertical" encType="multipart/form-data">
//     {/* Show Select Vendor only when adding */}
//     {!isEditMode && (
//       <Form.Item
//         name="vendorId"
//         label="Select Vendor"
//         rules={[{ required: true, message: "Please select a vendor" }]}
//       >
//         <Select placeholder="Select Vendor">
//           {data.map((vendor) => (
//             <Select.Option key={vendor.vendorId} value={vendor.vendorId}>
//               {vendor.vendorId} - {vendor.name}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>
//     )}

//     <Form.Item
//       name="documentName"
//       label="Document Name"
//       rules={[{ required: true, message: "Please enter Document Name" }]}
//     >
//       <Input placeholder="Enter Document Name" />
//     </Form.Item>

//     <Form.Item
//       name="brand_attachment"
//       label="Upload Document"
//       valuePropName="fileList"
//       getValueFromEvent={(e) => {
//         if (Array.isArray(e)) {
//           return e;
//         }
//         return e && e.fileList ? e.fileList : [];
//       }}
//       rules={[{ required: true, message: "Please upload a document" }]}
//     >
//       <Upload
//         accept="image/*,.pdf"
//         beforeUpload={() => false} // prevent automatic upload
//         maxCount={1}
//       >
//         <Button icon={<PlusOutlined />}>Click to Upload</Button>
//       </Upload>
//     </Form.Item>
//   </Form>
// </Modal>


//       <Modal
//               title="Add/Edit Remark"
//               open={isModalVisible}
//               onOk={handleModalOk}
//               onCancel={handleModalCancel}
//               okText="Save"
//             >
//               <Form form={form} layout="vertical">
//                 <Form.Item
//                   name="remark"
//                   label="Remark"
//                   rules={[{ required: true, message: "Please enter a remark" }]}
//                 >
//                   <Input.TextArea rows={4} placeholder="Enter remark here..." />
//                 </Form.Item>
//               </Form>
//             </Modal>
            
//     </Space>
//   );
// };

// export default VendorBranding;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Tag,
  Input,
  Button,
  Card,
  Typography,
  Space,
  Select,
  Tooltip,
  Form,
  Modal,
  Upload,
  message,
} from "antd";
import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  CheckOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const BASE_URL = "http://13.201.150.234/t2/api/"; // Replace with your actual base URL
const AUTH_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWNiYTJmOTY1YzEzNmEzYzgyOWQxMjE2NjQ4YTAyOGZmODVhNGQyOGJlZDNlOWY3YzY0ZjJmYWRkMjk4YzdhZGIxM2ZmMGY0YjU0NjhlZmQiLCJpYXQiOjE3NTQ4ODk5NDkuNjYwMjk4LCJuYmYiOjE3NTQ4ODk5NDkuNjYwMzAyLCJleHAiOjE3ODY0MjU5NDkuNjQ5ODE5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.MNhyeRUjB-Fx9p9-6CAFRf42wteF3Q0Qb4i-9rvT6mkuXeVEhe91tgtCyENV_0HPRfu23ZmR1kbZ2n6XA4WnYAQY6rKGePI8r97frKUvHc94Sk2PnVNmaThoeDd8A0ee1OiwH3MIfsuzcnrpBn6TZS14LGiwyE09nktdFxu6e2kbllap_sTeIpcnRuKbCX48fAgLhZsOpTw_YnysXoHkFF8wHNqe9Uhayr5TF9NZ-92V7Cs_aHfJMMsTd60sCG9xBnRaYGCB69UHmPaDT2eBaZMzWZOApUNDcS9mRbEUhdwT8vTF3m121_uCPy3ac1o35PdM_nYTCIvaqRap0hu6USrCo7evn4bdgXgfb3m9yagf-zT1TjbRmYwJmhGy_EaJauiFwqt1HIDpEpRcRjOhF0R3j0i-oQQEjDKOIEn27wAZSN1GNer5a48mQYOqBXYA4_fxf6QRiARkbnmcKLwaCplV6qv2039b-5guMKCC-VceNxSp7El-QTDff-GLrb94GNoOZX7HDT5MGaMgaGU35RY6Y-W-gUtHAlYLNU_4bXsoW7_p4U9UWWkKZMMW0G4H0sZW0-Lna_1dtxI2XRBBFQ9_S7D6axxQriOXWWtRe0JoBN7IQn9bF_yuEsL-gQqRJL93tANSFGft2qZ21PUVdkfifTJyz5rVz1IR7WpK6xY" // Replace with your auth token

const VendorBranding = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const [editingStatus, setEditingStatus] = useState("");
  const navigate = useNavigate();

  // Fetch vendor_id from somewhere or hardcode for now
  const vendor_id = 2; // Example vendor ID

  // Fetch branding materials from API
const fetchBrandingMaterials = async () => {
  setLoading(true);
  try {
    const res = await axios.get(`${BASE_URL}admin/vendortab/branding-materials`, {
      params: { vendor_id },
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        Accept: "application/json",
      },
    });

    if (res.data.success) {
      const apiData = res.data.data.map((item) => ({
        key: item.id,
        vendorId: item.vendor_company?.vendor_id?.toString() || "",
        name: item.vendor_company?.vendor?.name || "",
        companyName: item.vendor_company?.company_name || "",
        branding_doc_code: item.material_type || "",
        brand_attachment: item.fileany
          ? `http://localhost/urjaone/content/${item.fileany}`
          : null,
        documentName: item.material_type,
        remarks: item.remark || "",
        status:
          item.status === 0
            ? "Pending"
            : item.status === 1
            ? "Approved"
            : item.status === 3
            ? "Rejected"
            : "Unknown",
        createdDate: item.created_at,
        updatedDate: item.updated_at,
        updatedBy: "",
        rawItem: item,
      }));
      setData(apiData);
      setFilteredData(apiData);
    } else {
      message.error("Failed to fetch branding materials");
    }
  } catch (error) {
    message.error("Error fetching branding materials");
    console.error(error);
  }
  setLoading(false);
};

  useEffect(() => {
    fetchBrandingMaterials();
  }, []);

  // Search filter
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter(
      (vendor) =>
        vendor.vendorId.toLowerCase().includes(value.toLowerCase()) ||
        vendor.branding_doc_code.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Open Remark Modal
  const openRemarkModal = (key) => {
    const selectedRecord = data.find((item) => item.key === key);
    setSelectedKey(key);
    setIsModalVisible(true);
    form.setFieldsValue({ remark: selectedRecord?.remarks || "" });
  };

  // Update Remark API call
  const handleModalOk = async () => {
    form.validateFields().then(async ({ remark }) => {
      try {
        const record = data.find((item) => item.key === selectedKey);
        if (!record) return;

        const res = await axios.post(
          `${BASE_URL}admin/vendortab/branding-materials/${selectedKey}/updateremark`,
          { remark },
          {
            headers: {
              Authorization: `Bearer ${AUTH_TOKEN}`,
              Accept: "application/json",
            },
          }
        );

        if (res.data.success) {
          message.success("Remark updated successfully");
          const updated = data.map((item) =>
            item.key === selectedKey ? { ...item, remarks: remark } : item
          );
          setData(updated);
          setFilteredData(updated);
          setIsModalVisible(false);
          setSelectedKey(null);
        } else {
          message.error("Failed to update remark");
        }
      } catch (error) {
        message.error("Error updating remark");
        console.error(error);
      }
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedKey(null);
  };

  // Update Status API call
  const handleStatusSave = async (record, newStatusLabel) => {
    // Map label to status code
    const statusMap = {
      Pending: 0,
      Approved: 1,
      UnApproved: 0,
      Rejected: 3,
      Active: 1,
      Inactive: 0,
    };
    const statusCode = statusMap[newStatusLabel] ?? 0;

    try {
      const res = await axios.post(
        `${BASE_URL}admin/vendortab/branding-materials/${record.key}/updatestatus`,
        { status: statusCode },
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
            Accept: "application/json",
          },
        }
      );

      if (res.data.success) {
        message.success("Status updated successfully");
        const updated = filteredData.map((item) =>
          item.key === record.key ? { ...item, status: newStatusLabel } : item
        );
        setData(updated);
        setFilteredData(updated);
        setEditingKey(null);
      } else {
        message.error("Failed to update status");
      }
    } catch (error) {
      message.error("Error updating status");
      console.error(error);
    }
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
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Branding Doc Code",
      dataIndex: "branding_doc_code",
      key: "branding_doc_code",
    },
    {
      title: "Document Name",
      dataIndex: "documentName",
      key: "documentName",
    },
    {
      title: "Brand Attachment",
      dataIndex: "brand_attachment",
      key: "brand_attachment",
      render: (url) =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            View Document
          </a>
        ) : (
          "No Document"
        ),
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      render: (text, record) => (
        <Space>
          {text ? (
            <>
              <span>{text}</span>
              <EditOutlined
                style={{ color: "#1890ff", cursor: "pointer" }}
                onClick={() => openRemarkModal(record.key)}
              />
            </>
          ) : (
            <Button
              type="link"
              icon={<PlusOutlined />}
              onClick={() => openRemarkModal(record.key)}
            >
              Add
            </Button>
          )}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        const isEditing = editingKey === record.key;
        const statusColors = {
          Pending: "#d63939",
          Approved: "#2fb344",
          UnApproved: "#d63939",
          Rejected: "#d63939",
          Active: "#2fb344",
          Inactive: "#d63939",
        };

        return isEditing ? (
          <Space>
            <Select
              value={editingStatus}
              onChange={(value) => setEditingStatus(value)}
              style={{ width: 120 }}
              options={[
                { label: "Pending", value: "Pending" },
                { label: "Approved", value: "Approved" },
                { label: "UnApproved", value: "UnApproved" },
                { label: "Rejected", value: "Rejected" },
              ]}
            />
            <Tooltip title="Save">
              <CheckOutlined
                style={{ color: "green", cursor: "pointer" }}
                onClick={() => handleStatusSave(record, editingStatus)}
              />
            </Tooltip>
            <Tooltip title="Cancel">
              <CloseOutlined
                style={{ color: "gray", cursor: "pointer" }}
                onClick={() => setEditingKey(null)}
              />
            </Tooltip>
          </Space>
        ) : (
          <Space>
            <Tag
              style={{
                backgroundColor: statusColors[status] || "#888",
                color: "#fff",
                border: "none",
              }}
            >
              {status}
            </Tag>
            <Tooltip title="Edit Status">
              <EditOutlined
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setEditingKey(record.key);
                  setEditingStatus(status);
                }}
              />
            </Tooltip>
          </Space>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => navigate("/viewbranding", { state: { record } })}
          >
            <span
              style={{
                backgroundColor: "#F0720B",
                padding: "6px",
                borderRadius: "4px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EyeOutlined style={{ color: "white" }} />
            </span>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 600 }}>
              Vendor Branding Records
            </span>

            <div style={{ display: "flex", gap: "10px" }}>
              <Input
                placeholder="Search Vendor ID or Doc Code"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchText}
                allowClear
                style={{ width: 250 }}
              />
              <Button onClick={fetchBrandingMaterials} loading={loading}>
                Refresh
              </Button>
            </div>
          </div>
        }
        bordered
        style={{ borderRadius: 12 }}
      >
        <Table
          dataSource={filteredData}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
          rowClassName={(_, index) =>
            index % 2 === 0 ? "table-row-white" : "table-row-gray"
          }
          style={{ border: "none" }}
        />
      </Card>

      <Modal
        title="Add/Edit Remark"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="remark"
            label="Remark"
            rules={[{ required: true, message: "Please enter a remark" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter remark here..." />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default VendorBranding;
