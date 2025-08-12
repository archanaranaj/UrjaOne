// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Table,
//   Tag,
//   Input,
//   Button,
//   Card,
//   Typography,
//   Space,
//   Modal,
//   Form,
//   Select,
//   Tooltip,
//   Upload,
// } from "antd";
// import { PlusOutlined, EditOutlined, EyeOutlined, CloseOutlined , CheckOutlined, NotificationOutlined, FileExcelOutlined } from "@ant-design/icons";
// import dayjs from "dayjs";
// import * as XLSX from "xlsx"; 
// const { Title } = Typography;

// // Sample Data
// const initialData = [
//   {
//     key: 1,
//     vendorId: "VND001",
//     name:"Rahul",
//     company:"Tech Innovations",
//     kyc_doc_code: "PAN",
//     doc_id_no: "2341 5467 8976",
//     doc_attachment: "./story.png",
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
//     company:"Tech Innovations",
//     kyc_doc_code: "ADHAR CARD",
//     doc_id_no: "4321 2467 3214",
//     doc_attachment: "./story.png",
//     remarks: "",
//     status: "Pending",
//     createdDate: "2024-06-15T09:20:00",
//     updatedDate: "2024-07-15T15:45:00",
//     updatedBy: "admin002",
//   },
// ];

// const VendorKyc = () => {
//   const navigate = useNavigate();
//   const [searchText, setSearchText] = useState("");
//   const [data, setData] = useState(initialData);
//   const [form] = Form.useForm();
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedKey, setSelectedKey] = useState(null);
  
//    const [filteredData, setFilteredData] = useState(initialData);
//   const [editingKey, setEditingKey] = useState(null);
//    const [editingStatus, setEditingStatus] = useState("");

// const [docModalVisible, setDocModalVisible] = useState(false);
// const [docForm] = Form.useForm();
// const [currentRecordKey, setCurrentRecordKey] = useState(null);
// const [isEditMode, setIsEditMode] = useState(false);
// const openDocModal = (record) => {
//   setCurrentRecordKey(record.key);
//   setIsEditMode(!!record.doc_id_no || !!record.doc_attachment);

//   docForm.setFieldsValue({
//     doc_id_no: record.doc_id_no || "",
//     doc_attachment: record.doc_attachment
//       ? [
//           {
//             uid: "-1",
//             name: record.doc_attachment.split("/").pop(),
//             status: "done",
//             url: record.doc_attachment,
//           },
//         ]
//       : [],
//   });

//   setDocModalVisible(true);
// };

// const handleDocModalOk = () => {
//   docForm.validateFields().then((values) => {
//     // Extract file url or name from uploaded file list
//     const uploadedFile = values.doc_attachment?.[0];
//     let doc_attachment = "";

//     if (uploadedFile) {
//       // uploadedFile.originFileObj is the actual File object
//       // For now, since no upload backend, just use filename as doc_attachment placeholder
//       doc_attachment = uploadedFile.name || "";
//     }

//     if (isEditMode) {
//       // Edit existing record (use currentRecordKey)
//       const updated = data.map((item) =>
//         item.key === currentRecordKey
//           ? {
//               ...item,
//               doc_id_no: values.doc_id_no,
//               kyc_doc_code: values.kyc_doc_code,
//               doc_attachment: doc_attachment || item.doc_attachment,
//             }
//           : item
//       );
//       setData(updated);
//     } else {
//       // Add new record with selected vendor
//       const newVendorKey = data.length ? Math.max(...data.map(d => d.key)) + 1 : 1;
//       const selectedVendor = data.find(v => v.vendorId === values.vendorId);

//       const newRecord = {
//         key: newVendorKey,
//         vendorId: values.vendorId,
//         name: selectedVendor ? selectedVendor.name : "",
//         company: selectedVendor ? selectedVendor.company : "",
//         kyc_doc_code: values.kyc_doc_code,
//         doc_id_no: values.doc_id_no,
//         doc_attachment,
//         remarks: "",
//         status: "Pending",
//         createdDate: new Date().toISOString(),
//         updatedDate: new Date().toISOString(),
//         updatedBy: "admin", // you can replace this with actual user
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
//       (item) =>
//         item.vendorId.toLowerCase().includes(value.toLowerCase()) ||
//         item.kyc_doc_code.toLowerCase().includes(value.toLowerCase())
//     );
//     setData(filtered);
//   };

//   const openRemarkModal = (key) => {
//     const selectedRecord = data.find((item) => item.key === key);
//     setSelectedKey(key);
//     setIsModalVisible(true);
//     form.setFieldsValue({ remark: selectedRecord?.remarks || "" });
//   };

//   const handleModalOk = () => {
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
  
//     const exportToExcel = () => {
//       const worksheet = XLSX.utils.json_to_sheet(initialData);
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Vendor KYC");
//       XLSX.writeFile(workbook, "Vendor_Kyc.xlsx");
//     };

//   const columns = [
//     {
//       title: "Vendor ID",
//       dataIndex: "vendorId",
//       key: "vendorId",
//     },
//      {
//       title: "Vendor Name",
//       dataIndex: "name",
//       key: "name",
//     },
//      {
//       title: "Company Name",
//       dataIndex: "company",
//       key: "company",
//     },
//     {
//       title: "KYC Document Code",
//       dataIndex: "kyc_doc_code",
//       key: "kyc_doc_code",
//        responsive: ["sm"],
//     },
//     // {
//     //   title: "Document ID No",
//     //   dataIndex: "doc_id_no",
//     //   key: "doc_id_no",
//     //    responsive: ["md"],
//     // },
//     {
//       title: "Document Attachment",
//       dataIndex: "doc_attachment",
//       key: "doc_attachment",

//       render: (url) => (
//         <a href={url} target="_blank" rel="noopener noreferrer">
//           View Document
//         </a>
//       ),
//       responsive: ["md"],
//     },
  

//    {
//               title: "Status",
//               dataIndex: "status",
//               key: "status",
//               render: (status, record) => {
//                 const isEditing = editingKey === record.key;
//                 const statusColors = {
//                  Pending:"#d63939",
//                   Active: "#2fb344",
//                   Inactive: "#d63939",
                 
//                 };
        
//                 return isEditing ? (
//                   <Space>
//                     <Select
//                       value={editingStatus}
//                       onChange={(value) => setEditingStatus(value)}
//                       style={{ width: 120 }}
//                       options={[
//                        { label: "Pending", value: "Pending" },
//                         { label: "Active", value: "Active" },
//                         { label: "Inactive", value: "Inactive" },
                        
//                       ]}
//                     />
//                     <Tooltip title="Save">
//                       <CheckOutlined
//                         style={{ color: "green", cursor: "pointer" }}
//                         onClick={() => {
//                        const updated = filteredData.map((item) =>
//      item.key === record.key
//        ? { ...item, status: editingStatus }
     
//          : item
//      );
//      setFilteredData(updated);
//      setEditingKey(null);
     
     
                         
//                         }}
//                       />
//                     </Tooltip>
//                     <Tooltip title="Cancel">
//                       <CloseOutlined
//                         style={{ color: "gray", cursor: "pointer" }}
//                         onClick={() => setEditingKey(null)}
//                       />
//                     </Tooltip>
//                   </Space>
//                 ) : (
//                   <Space>
//                     <Tag
//                       style={{
//                         backgroundColor: statusColors[status] || "#888",
//                         color: "#fff",
//                         border: "none",
//                       }}
//                     >
//                       {status}
//                     </Tag>
//                     <Tooltip title="Edit Status">
//                       <EditOutlined
//                         style={{ cursor: "pointer" }}
//                         onClick={() => {
//                           setEditingKey(record.key);
//                           setEditingStatus(status);
//                         }}
//                       />
//                     </Tooltip>
//                   </Space>
//                 );
//               },
//             },


//     // {
//     //   title: "Created Date",
//     //   dataIndex: "createdDate",
//     //   key: "createdDate",
//     //   render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
//     //    responsive: ["lg"],
//     // },
//     // {
//     //   title: "Updated Date",
//     //   dataIndex: "updatedDate",
//     //   key: "updatedDate",
//     //   render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
//     //   responsive: ["lg"],
//     // },
//     // {
//     //   title: "Updated By",
//     //   dataIndex: "updatedBy",
//     //   key: "updatedBy",
//     //    responsive: ["lg"],
//     // },
// //      {
// //   title: "Action",
// //   key: "action",
// //   render: (_, record) => (
// //     <Button
// //       type="link"
// //       onClick={() => navigate("/viewvendorkyc", { state: { record } })}
// //     >
// //       <span
// //         style={{
// //           backgroundColor: "#F0720B",
// //           padding: "6px",
// //           borderRadius: "4px",
// //           display: "inline-flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //         }}
// //       >
// //         <EyeOutlined style={{ color: "white" }} />
// //       </span>
// //     </Button>
// //   ),
// // }
// {
//   title: "Action",
//   key: "action",
//   render: (_, record) => (
//     <Space>
//       {/* View button */}
//       <Button
//         type="link"
//         onClick={() => navigate("/viewvendorkyc", { state: { record } })}
//         title="View Details"
//         style={{ padding: 0 }}
//       >
//         <span
//           style={{
//             backgroundColor: "#F0720B",  // orange
//             padding: 6,
//             borderRadius: "4px",
//             display: "inline-flex",
//             alignItems: "center",
//             justifyContent: "center",
//             width: 32,
//             height: 32,
//           }}
//         >
//           <EyeOutlined style={{ color: "white", fontSize: 16 }} />
//         </span>
//       </Button>

//       {/* Edit Document button */}
//       {(record.doc_id_no || record.doc_attachment) && (
//         <Button
//           type="link"
//           onClick={() => openDocModal(record)}
//           title="Edit Document"
//           style={{ padding: 0 }}
//         >
//           <span
//             style={{
//               backgroundColor: "#1890ff",  // Antd primary blue
//               padding: 6,
//               borderRadius: "4px",
//               display: "inline-flex",
//               alignItems: "center",
//               justifyContent: "center",
//               width: 32,
//               height: 32,
//             }}
//           >
//             <EditOutlined style={{ color: "white", fontSize: 16 }} />
//           </span>
//         </Button>
//       )}

//       {/* Notify (Send Remark) button */}
//       <Button
//         type="link"
//         onClick={() => openRemarkModal(record.key)}
//         title="Send Remark"
//         style={{ padding: 0 }}
//       >
//         <span
//           style={{
//             backgroundColor: "#fa8c16",  // orange gold
//             padding: 6,
//             borderRadius: "4px",
//             display: "inline-flex",
//             alignItems: "center",
//             justifyContent: "center",
//             width: 32,
//             height: 32,
//           }}
//         >
//           <NotificationOutlined style={{ color: "white", fontSize: 16 }} />
//         </span>
//       </Button>
//     </Space>
//   ),
// }


//   ];

//   return (
//     <Space direction="vertical" size="small" style={{ width: "100%", padding: "0px 0px 0px 0", borderRadius: "10px" }}>
//      <Card
//   title={
//     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//       <span style={{ fontSize: 20, fontWeight: 600 }}>Vendor KYC Apparel</span>
//       <Space>
//          <Button
//   type="primary"
//   icon={<PlusOutlined />}
//   onClick={() => {
//     setDocModalVisible(true);
//     setCurrentRecordKey(null);
//     setIsEditMode(false);
//     docForm.resetFields();
//   }}
// >
//   Add Doc
// </Button>

//         <Input
//           placeholder="Search Vendor ID or KYC Code"
//           onChange={(e) => handleSearch(e.target.value)}
//           value={searchText}
//           allowClear
//           style={{ width: 250 }}
//         />
//         <Button
//             icon={<FileExcelOutlined />}
//             type="primary"
//             style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
//             onClick={exportToExcel}
//           >
//             Export to Excel
//           </Button>
//       </Space>
//     </div>
//   }

//         bordered
//         style={{ borderRadius: 12 }}
//         bodyStyle={{ paddingTop: 16 }}
//         headStyle={{ marginBottom: 0, paddingBottom: 8, paddingTop: 16, borderBottom: "none" }}
//       >
//         <Table
//           dataSource={data}
//           columns={columns}
//           pagination={{ pageSize: 5 }}
//           scroll={{ x: "max-content" }} 
//           rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")}
//           style={{ border: "none" }}
//         />
//       </Card>
// <Modal
//   title={isEditMode ? "Edit Document Info" : "Add Document Info"}
//   open={docModalVisible}
//   onOk={handleDocModalOk}
//   onCancel={handleDocModalCancel}
//   okText="Save"
// >
//   <Form form={docForm} layout="vertical">
//     {/* Select Vendor - only when adding (not editing) */}
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

//     {/* Select Document Type */}
//     <Form.Item
//       name="kyc_doc_code"
//       label="Select Document Type"
//       rules={[{ required: true, message: "Please select document type" }]}
//     >
//       <Select placeholder="Select Document Type">
//         <Select.Option value="PAN">PAN</Select.Option>
//         <Select.Option value="ADHAR CARD">ADHAR CARD</Select.Option>
//         <Select.Option value="Passport">Passport</Select.Option>
//         {/* Add more options if needed */}
//       </Select>
//     </Form.Item>

//     {/* Document ID No */}
//     <Form.Item
//       name="doc_id_no"
//       label="Document ID No"
//       rules={[{ required: true, message: "Please enter Document ID No" }]}
//     >
//       <Input placeholder="Enter Document Number" />
//     </Form.Item>

//     {/* Upload Document */}
//    <Form.Item
//   label="Upload Document"
//   name="doc_attachment"
//   rules={[{ required: true, message: "Please upload a document" }]}
//   valuePropName="fileList"
//   getValueFromEvent={e => {
//     if (Array.isArray(e)) {
//       return e;
//     }
//     return e && e.fileList ? e.fileList : [];
//   }}
// >
//   <Upload
//     accept="image/*,.pdf"
//     beforeUpload={() => false} // prevent automatic upload
//     maxCount={1}
//   >
//     <Button icon={<PlusOutlined />}>Click to Upload</Button>
//   </Upload>
// </Form.Item>

//   </Form>
// </Modal>

//       <Modal
//         title="Add/Edit Remark"
//         open={isModalVisible}
//         onOk={handleModalOk}
//         onCancel={handleModalCancel}
//         okText="Save"
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="remark"
//             label="Remark"
//             rules={[{ required: true, message: "Please enter a remark" }]}
//           >
//             <Input.TextArea rows={4} placeholder="Enter remark here..." />
//           </Form.Item>
//         </Form>
//       </Modal>
     
      

//     </Space>
//   );
// };

// export default VendorKyc;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Tag,
  Input,
  Button,
  Card,
  Typography,
  Space,
  Modal,
  Form,
  Select,
  Tooltip,
  message,
  Upload,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  CloseOutlined,
  CheckOutlined,
  NotificationOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import axios from "axios";
import * as XLSX from "xlsx";

const { Title } = Typography;

const VendorKyc = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const [editingStatus, setEditingStatus] = useState("");
    const [docModalVisible, setDocModalVisible] = useState(false);
  const [docForm] = Form.useForm();
  const [currentRecordKey, setCurrentRecordKey] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://13.201.150.234/t2/api";
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWNiYTJmOTY1YzEzNmEzYzgyOWQxMjE2NjQ4YTAyOGZmODVhNGQyOGJlZDNlOWY3YzY0ZjJmYWRkMjk4YzdhZGIxM2ZmMGY0YjU0NjhlZmQiLCJpYXQiOjE3NTQ4ODk5NDkuNjYwMjk4LCJuYmYiOjE3NTQ4ODk5NDkuNjYwMzAyLCJleHAiOjE3ODY0MjU5NDkuNjQ5ODE5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.MNhyeRUjB-Fx9p9-6CAFRf42wteF3Q0Qb4i-9rvT6mkuXeVEhe91tgtCyENV_0HPRfu23ZmR1kbZ2n6XA4WnYAQY6rKGePI8r97frKUvHc94Sk2PnVNmaThoeDd8A0ee1OiwH3MIfsuzcnrpBn6TZS14LGiwyE09nktdFxu6e2kbllap_sTeIpcnRuKbCX48fAgLhZsOpTw_YnysXoHkFF8wHNqe9Uhayr5TF9NZ-92V7Cs_aHfJMMsTd60sCG9xBnRaYGCB69UHmPaDT2eBaZMzWZOApUNDcS9mRbEUhdwT8vTF3m121_uCPy3ac1o35PdM_nYTCIvaqRap0hu6USrCo7evn4bdgXgfb3m9yagf-zT1TjbRmYwJmhGy_EaJauiFwqt1HIDpEpRcRjOhF0R3j0i-oQQEjDKOIEn27wAZSN1GNer5a48mQYOqBXYA4_fxf6QRiARkbnmcKLwaCplV6qv2039b-5guMKCC-VceNxSp7El-QTDff-GLrb94GNoOZX7HDT5MGaMgaGU35RY6Y-W-gUtHAlYLNU_4bXsoW7_p4U9UWWkKZMMW0G4H0sZW0-Lna_1dtxI2XRBBFQ9_S7D6axxQriOXWWtRe0JoBN7IQn9bF_yuEsL-gQqRJL93tANSFGft2qZ21PUVdkfifTJyz5rVz1IR7WpK6xY";

  // Fetch KYC data on mount
  useEffect(() => {
    fetchKycData();
  }, []);

  const fetchKycData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/vendortab/kyc`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    console.log("API Response:", response.data);

    if (response.data.success && response.data.data.length > 0) {
      const apiData = response.data.data.map((item) => ({
        key: item.id,
        vendorId: `VID${item.vendor_id.toString().padStart(3, "0")}`,
        name: item.vendor?.name || "",
        company: item.company_name || "",
        kyc_doc_code: item.pancard ? "PAN" : item.aadhar_card ? "ADHAR CARD" : "",
        doc_id_no: item.pancard || item.aadhar_card || "",
        doc_attachment: item.pancard_image
          ? `${BASE_URL.replace("/api", "")}/content/${item.pancard_image}`
          : item.aadhar_card_image
          ? `${BASE_URL.replace("/api", "")}/content/${item.aadhar_card_image}`
          : "",
        remarks: item.remark || "",
        status:
          item.kyc_status === 0
            ? "Pending"
            : item.kyc_status === 1
            ? "Active"
            : item.kyc_status === 3
            ? "Rejected"
            : "Unknown",
        createdDate: item.created_at,
      }));

      setData(apiData);
      setFilteredData(apiData);
    } else {
      message.info("No KYC data found");
      setData([]);
      setFilteredData([]);
    }
  } catch (error) {
    console.error(error);
    message.error("Error fetching KYC data");
  }
};
const openDocModal = (record) => {
  setCurrentRecordKey(record.key);
  setIsEditMode(!!record.doc_id_no || !!record.doc_attachment);

  docForm.setFieldsValue({
    doc_id_no: record.doc_id_no || "",
    doc_attachment: record.doc_attachment
      ? [
          {
            uid: "-1",
            name: record.doc_attachment.split("/").pop(),
            status: "done",
            url: record.doc_attachment,
          },
        ]
      : [],
  });

  setDocModalVisible(true);
};

const handleDocModalOk = () => {
  docForm.validateFields().then((values) => {
    // Extract file url or name from uploaded file list
    const uploadedFile = values.doc_attachment?.[0];
    let doc_attachment = "";

    if (uploadedFile) {
      // uploadedFile.originFileObj is the actual File object
      // For now, since no upload backend, just use filename as doc_attachment placeholder
      doc_attachment = uploadedFile.name || "";
    }

    if (isEditMode) {
      // Edit existing record (use currentRecordKey)
      const updated = data.map((item) =>
        item.key === currentRecordKey
          ? {
              ...item,
              doc_id_no: values.doc_id_no,
              kyc_doc_code: values.kyc_doc_code,
              doc_attachment: doc_attachment || item.doc_attachment,
            }
          : item
      );
      setData(updated);
    } else {
      // Add new record with selected vendor
      const newVendorKey = data.length ? Math.max(...data.map(d => d.key)) + 1 : 1;
      const selectedVendor = data.find(v => v.vendorId === values.vendorId);

      const newRecord = {
        key: newVendorKey,
        vendorId: values.vendorId,
        name: selectedVendor ? selectedVendor.name : "",
        company: selectedVendor ? selectedVendor.company : "",
        kyc_doc_code: values.kyc_doc_code,
        doc_id_no: values.doc_id_no,
        doc_attachment,
        remarks: "",
        status: "Pending",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        updatedBy: "admin", // you can replace this with actual user
      };
      setData([...data, newRecord]);
    }

    setDocModalVisible(false);
    setCurrentRecordKey(null);
    docForm.resetFields();
  });
};

const handleDocModalCancel = () => {
  setDocModalVisible(false);
  setCurrentRecordKey(null);
};

 


  const openRemarkModal = (key) => {
    const selectedRecord = data.find((item) => item.key === key);
    setSelectedKey(key);
    setIsModalVisible(true);
    form.setFieldsValue({ remark: selectedRecord?.remarks || "" });
  };

  const handleModalOk = () => {
    form.validateFields().then(({ remark }) => {
      const updated = data.map((item) =>
        item.key === selectedKey ? { ...item, remarks: remark } : item
      );
      setData(updated);
      setIsModalVisible(false);
      setSelectedKey(null);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedKey(null);
  };


  // Search filter: filter on vendorId or kyc_doc_code
  const handleSearch = (value) => {
    setSearchText(value);
    if (!value) {
      setFilteredData(data);
      return;
    }
    const filtered = data.filter(
      (item) =>
        item.vendorId.toLowerCase().includes(value.toLowerCase()) ||
        item.kyc_doc_code.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vendor KYC");
    XLSX.writeFile(workbook, "Vendor_Kyc.xlsx");
  };

  const columns = [
    { title: "Vendor ID", dataIndex: "vendorId", key: "vendorId" },
    { title: "Vendor Name", dataIndex: "name", key: "name" },
    { title: "Company Name", dataIndex: "company", key: "company" },
    {
      title: "KYC Document Code",
      dataIndex: "kyc_doc_code",
      key: "kyc_doc_code",
      responsive: ["sm"],
    },
    {
      title: "Document Attachment",
      dataIndex: "doc_attachment",
      key: "doc_attachment",
      render: (url) =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            View Document
          </a>
        ) : (
          "No Document"
        ),
      responsive: ["md"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        const isEditing = editingKey === record.key;
        const statusColors = {
          Pending: "#d63939",
          Active: "#2fb344",
          Inactive: "#d63939",
          Rejected: "#d63939",
        };

        return isEditing ? (
          <Space>
            <Select
              value={editingStatus}
              onChange={(value) => setEditingStatus(value)}
              style={{ width: 120 }}
              options={[
                { label: "Pending", value: "Pending" },
                { label: "Active", value: "Active" },
                { label: "Rejected", value: "Rejected" },
              ]}
            />
            <Tooltip title="Save">
              <CheckOutlined
                style={{ color: "green", cursor: "pointer" }}
                onClick={() => {
                  // You can implement your update logic here
                  setEditingKey(null);
                }}
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
          <Tag
            style={{
              backgroundColor: statusColors[status] || "#888",
              color: "#fff",
              border: "none",
            }}
          >
            {status}
          </Tag>
        );
      },
    },
     {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          {/* View button */}
          <Button
            type="link"
            onClick={() => navigate("/viewvendorkyc", { state: { record } })}
            title="View Details"
            style={{ padding: 0 }}
          >
            <span
              style={{
                backgroundColor: "#F0720B", // orange
                padding: 6,
                borderRadius: "4px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
              }}
            >
              <EyeOutlined style={{ color: "white", fontSize: 16 }} />
            </span>
          </Button>

          {/* Edit Document button */}
          {(record.doc_id_no || record.doc_attachment) && (
            <Button
              type="link"
              onClick={() => openDocModal(record)}
              title="Edit Document"
              style={{ padding: 0 }}
            >
              <span
                style={{
                  backgroundColor: "#1890ff", // Antd primary blue
                  padding: 6,
                  borderRadius: "4px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                }}
              >
                <EditOutlined style={{ color: "white", fontSize: 16 }} />
              </span>
            </Button>
          )}

          {/* Notify (Send Remark) button */}
          <Button
            type="link"
            onClick={() => openRemarkModal(record.key)}
            title="Send Remark"
            style={{ padding: 0 }}
          >
            <span
              style={{
                backgroundColor: "#fa8c16", // orange gold
                padding: 6,
                borderRadius: "4px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
              }}
            >
              <NotificationOutlined style={{ color: "white", fontSize: 16 }} />
            </span>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Space
      direction="vertical"
      size="small"
      style={{ width: "100%", padding: 0, borderRadius: "10px" }}
    >
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 600 }}>
              Vendor KYC Apparel
            </span>
            <Space>
              <Input
                placeholder="Search Vendor ID or KYC Code"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchText}
                allowClear
                style={{ width: 250 }}
              />
              <Button
                icon={<FileExcelOutlined />}
                type="primary"
                style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
                onClick={exportToExcel}
              >
                Export to Excel
              </Button>
            </Space>
          </div>
        }
        bordered
        style={{ borderRadius: 12 }}
      >
        {/* Edit Document Modal */}
<Modal
  title={isEditMode ? "Edit Document Info" : "Add Document Info"}
  visible={docModalVisible}
  onOk={handleDocModalOk}
  onCancel={handleDocModalCancel}
  okText="Save"
>
  <Form form={docForm} layout="vertical">
    {!isEditMode && (
      <Form.Item
        name="vendorId"
        label="Select Vendor"
        rules={[{ required: true, message: "Please select a vendor" }]}
      >
        <Select placeholder="Select Vendor">
          {data.map((vendor) => (
            <Select.Option key={vendor.vendorId} value={vendor.vendorId}>
              {vendor.vendorId} - {vendor.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    )}

    <Form.Item
      name="kyc_doc_code"
      label="Select Document Type"
      rules={[{ required: true, message: "Please select document type" }]}
    >
      <Select placeholder="Select Document Type">
        <Select.Option value="PAN">PAN</Select.Option>
        <Select.Option value="ADHAR CARD">ADHAR CARD</Select.Option>
        <Select.Option value="Passport">Passport</Select.Option>
      </Select>
    </Form.Item>

    <Form.Item
      name="doc_id_no"
      label="Document ID No"
      rules={[{ required: true, message: "Please enter Document ID No" }]}
    >
      <Input placeholder="Enter Document Number" />
    </Form.Item>

    <Form.Item
      label="Upload Document"
      name="doc_attachment"
      valuePropName="fileList"
      getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList || [])}
      rules={[{ required: true, message: "Please upload a document" }]}
    >
      <Upload
        accept="image/*,.pdf"
        beforeUpload={() => false} // prevent automatic upload
        maxCount={1}
      >
        <Button icon={<PlusOutlined />}>Click to Upload</Button>
      </Upload>
    </Form.Item>
  </Form>
</Modal>

{/* Remark Modal */}
<Modal
  title="Add/Edit Remark"
  visible={isModalVisible}
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

        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
          rowClassName={(_, index) =>
            index % 2 === 0 ? "table-row-white" : "table-row-gray"
          }
          style={{ border: "none", minHeight: 200 }}
        />
      </Card>
    </Space>
  );
};

export default VendorKyc;
