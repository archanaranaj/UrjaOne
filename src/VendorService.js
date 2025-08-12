// import React, { useState } from "react";
// import {
//   Table,
//   Tag,
//   Input,
//   Button,
//   Card,
//   Space,
//   Popconfirm,
//   message,
//   Modal,
//   Tooltip,
//   Select,
// } from "antd";
// import { EditOutlined, DeleteOutlined, EyeOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
// import dayjs from "dayjs";
// import { useNavigate } from "react-router-dom";
// const dataSource = [
//   {
//     key: 1,
//     vendorServiceId: "VS001",
//     name:"Sikha",
//     serviceId: "SVC101",
//     vendorId: "VID001",
//     vendorServiceName: "Home Cleaning",
//     majorCategoryId: "MCAT01",
//     minorCategoryId: "MICAT01",
//     serviceBanner: "./story.png",
//     serviceImage: "./story.png",
//     serviceType: "Service",
//     serviceUnit: "Hour",
//     description: "Professional home cleaning services for your comfort.",
//     singlePriceActual: 1500,
//     singlePriceDiscounted: 1200,
//     minPrice: 1000,
//     maxPrice: 2000,
//     attachment: "./story.png",
//     status: "Pending",
//     createdDate: "2024-07-01T10:00:00",
//     updatedDate: "2024-07-20T12:30:00",
//     updatedBy: "admin001",
//   },
// ];

// const VendorService = () => {
//   const [searchText, setSearchText] = useState("");
//   const [data, setData] = useState(dataSource);
//   const [filteredData, setFilteredData] = useState(dataSource);
//    const [filtersVisible, setFiltersVisible] = useState(false);
//      const [statusFilter, setStatusFilter] = useState("");
//      const [editingKey, setEditingKey] = useState(null);
//            const [editingStatus, setEditingStatus] = useState("");
         
//          const [statusDropdownFilter, setStatusDropdownFilter] = useState("");
//   const navigate = useNavigate();
//   const handleSearch = (value) => {
//     setSearchText(value);
//     const filtered = data.filter(
//       (item) =>
//         item.vendorServiceId.toLowerCase().includes(value.toLowerCase()) ||
//         item.vendorServiceName.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   const handleEdit = (record) => {
//     message.info(`Edit service: ${record.vendorServiceId}`);
//   };

//   const handleDelete = (key) => {
//     const updatedData = data.filter((item) => item.key !== key);
//     setData(updatedData);
//     setFilteredData(updatedData);
//     message.success("Service deleted successfully.");
//   };

//   const columns = [
//     { title: "Vendor Service ID", dataIndex: "vendorServiceId", key: "vendorServiceId" },
//      {
//       title: "Vendor Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     { title: "Service ID", dataIndex: "serviceId", key: "serviceId" },
//     { title: "Vendor ID", dataIndex: "vendorId", key: "vendorId" },
//     { title: "Vendor Service Name", dataIndex: "vendorServiceName", key: "vendorServiceName" },
//     { title: "Major Category Id", dataIndex: "majorCategoryId", key: "majorCategoryId" },
//     { title: "Minor Category Id", dataIndex: "minorCategoryId", key: "minorCategoryId" },
// //   {
// //   title: "Service Banner",
// //   dataIndex: "serviceBanner",
// //   key: "serviceBanner",
// //   render: (text) => (
// //     <img
// //       src={text}
// //       alt="Service Banner"
// //       style={{
// //         height: 40,
// //         width: "auto",
// //         objectFit: "cover",
// //         borderRadius: 4,
// //       }}
// //     />
// //   ),
// // },
// {
//   title: "Service Image",
//   dataIndex: "serviceImage",
//   key: "serviceImage",
//   render: (text) => (
//     <img
//       src={text}
//       alt="Service"
//       style={{
//         height: 40,
//         width: "auto",
//         objectFit: "cover",
//         borderRadius: 4,
//       }}
//     />
//   ),
// },


//     // { title: "Service Type", dataIndex: "serviceType", key: "serviceType" },
//     // { title: "Service Unit", dataIndex: "serviceUnit", key: "serviceUnit" },
//     // {
//     //   title: "Description",
//     //   dataIndex: "description",
//     //   key: "description",
//     //   ellipsis: false,
//     //   render: (text) => (
//     //     <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{text}</div>
//     //   ),
//     // },
//     // { title: "Single Price Actual", dataIndex: "singlePriceActual", key: "singlePriceActual" },
//     // { title: "Single Price Discounted", dataIndex: "singlePriceDiscounted", key: "singlePriceDiscounted" },
//     // { title: "Min Price", dataIndex: "minPrice", key: "minPrice" },
//     // { title: "Max Price", dataIndex: "maxPrice", key: "maxPrice" },
//     // { title: "Attachment", dataIndex: "attachment", key: "attachment" },
//     {
//                  title: "Status",
//                  dataIndex: "status",
//                  key: "status",
//                  render: (status, record) => {
//                    const isEditing = editingKey === record.key;
//                    const statusColors = {
//                     Pending:"#d63939",
//                      Active: "#2fb344",
//                      Inactive: "#d63939",
                    
//                    };
           
//                    return isEditing ? (
//                      <Space>
//                        <Select
//                          value={editingStatus}
//                          onChange={(value) => setEditingStatus(value)}
//                          style={{ width: 120 }}
//                          options={[
//                           { label: "Pending", value: "Pending" },
//                            { label: "Active", value: "Active" },
//                            { label: "Inactive", value: "Inactive" },
                           
//                          ]}
//                        />
//                        <Tooltip title="Save">
//                          <CheckOutlined
//                            style={{ color: "green", cursor: "pointer" }}
//                            onClick={() => {
//                           const updated = filteredData.map((item) =>
//         item.key === record.key
//           ? { ...item, status: editingStatus }
        
//             : item
//         );
//         setFilteredData(updated);
//         setEditingKey(null);
        
        
                            
//                            }}
//                          />
//                        </Tooltip>
//                        <Tooltip title="Cancel">
//                          <CloseOutlined
//                            style={{ color: "gray", cursor: "pointer" }}
//                            onClick={() => setEditingKey(null)}
//                          />
//                        </Tooltip>
//                      </Space>
//                    ) : (
//                      <Space>
//                        <Tag
//                          style={{
//                            backgroundColor: statusColors[status] || "#888",
//                            color: "#fff",
//                            border: "none",
//                          }}
//                        >
//                          {status}
//                        </Tag>
//                        <Tooltip title="Edit Status">
//                          <EditOutlined
//                            style={{ cursor: "pointer" }}
//                            onClick={() => {
//                              setEditingKey(record.key);
//                              setEditingStatus(status);
//                            }}
//                          />
//                        </Tooltip>
//                      </Space>
//                    );
//                  },
//                },
//     // {
//     //   title: "Created_date",
//     //   dataIndex: "createdDate",
//     //   key: "createdDate",
//     //   render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
//     // },
//     // {
//     //   title: "Updated_Date",
//     //   dataIndex: "updatedDate",
//     //   key: "updatedDate",
//     //   render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
//     // },
    
//          {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Button   type="link"
//           onClick={() => navigate("/viewvendorservice", { state: { record } })}>
//           <span
//              style={{
//                backgroundColor: "#F0720B",
//                padding: "6px",
//                borderRadius: "4px",
//                display: "inline-flex",
//                alignItems: "center",
//                justifyContent: "center",
//              }}
//            >
//              <EyeOutlined style={{ color: "white" }} />
//            </span>
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <Space
//       direction="vertical"
//       size="large"
//       style={{ width: "100%", padding: 0, borderRadius: "10px" }}
//     >
//       <Card
//         title={
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: "wrap",
//               gap: "10px",
//             }}
//           >
//             <span style={{ fontSize: 20, fontWeight: 600 }}>
//               Vendor Services
//             </span>
//             <Input
//               placeholder="Search by ID or Name"
//               onChange={(e) => handleSearch(e.target.value)}
//               value={searchText}
//               allowClear
//               style={{ width: 250 }}
//             />
//           </div>
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
//           dataSource={filteredData}
//           columns={columns}
//           pagination={{ pageSize: 5 }}
//           scroll={{ x: "max-content" }}
//           rowClassName={(_, index) =>
//             index % 2 === 0 ? "table-row-white" : "table-row-gray"
//           }
//           style={{ border: "none", wordBreak: "break-word" }}
//         />
//       </Card>
     
//     </Space>
//   );
// };

// export default VendorService;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Tag,
  Input,
  Button,
  Card,
  Space,
  Tooltip,
  Select,
  message,
} from "antd";
import {
  EditOutlined,
  EyeOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const VendorService = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editingKey, setEditingKey] = useState(null);
  const [editingStatus, setEditingStatus] = useState("");
  const navigate = useNavigate();

  const VENDOR_ID = 2; // Change dynamically if needed
  const BASE_URL = process.env.REACT_APP_API_BASE_URL; // read from env file

  // Fetch data from API
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWNiYTJmOTY1YzEzNmEzYzgyOWQxMjE2NjQ4YTAyOGZmODVhNGQyOGJlZDNlOWY3YzY0ZjJmYWRkMjk4YzdhZGIxM2ZmMGY0YjU0NjhlZmQiLCJpYXQiOjE3NTQ4ODk5NDkuNjYwMjk4LCJuYmYiOjE3NTQ4ODk5NDkuNjYwMzAyLCJleHAiOjE3ODY0MjU5NDkuNjQ5ODE5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.MNhyeRUjB-Fx9p9-6CAFRf42wteF3Q0Qb4i-9rvT6mkuXeVEhe91tgtCyENV_0HPRfu23ZmR1kbZ2n6XA4WnYAQY6rKGePI8r97frKUvHc94Sk2PnVNmaThoeDd8A0ee1OiwH3MIfsuzcnrpBn6TZS14LGiwyE09nktdFxu6e2kbllap_sTeIpcnRuKbCX48fAgLhZsOpTw_YnysXoHkFF8wHNqe9Uhayr5TF9NZ-92V7Cs_aHfJMMsTd60sCG9xBnRaYGCB69UHmPaDT2eBaZMzWZOApUNDcS9mRbEUhdwT8vTF3m121_uCPy3ac1o35PdM_nYTCIvaqRap0hu6USrCo7evn4bdgXgfb3m9yagf-zT1TjbRmYwJmhGy_EaJauiFwqt1HIDpEpRcRjOhF0R3j0i-oQQEjDKOIEn27wAZSN1GNer5a48mQYOqBXYA4_fxf6QRiARkbnmcKLwaCplV6qv2039b-5guMKCC-VceNxSp7El-QTDff-GLrb94GNoOZX7HDT5MGaMgaGU35RY6Y-W-gUtHAlYLNU_4bXsoW7_p4U9UWWkKZMMW0G4H0sZW0-Lna_1dtxI2XRBBFQ9_S7D6axxQriOXWWtRe0JoBN7IQn9bF_yuEsL-gQqRJL93tANSFGft2qZ21PUVdkfifTJyz5rVz1IR7WpK6xY"; 

        const response = await axios.get(
          `${BASE_URL}/admin/vendortab/service-data`,
          {
            params: { vendor_id: VENDOR_ID },
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const apiData = response.data.data.data.map((item) => ({
            key: item.id,
            vendorServiceId: `VS${item.id.toString().padStart(3, "0")}`,
            name: item.vendor?.name || "",
            serviceId: `SVC${item.service_id.toString().padStart(3, "0")}`,
            vendorId: `VID${item.vendor_id.toString().padStart(3, "0")}`,
            vendorServiceName: item.vendor_service_name || "",
            majorCategoryId: item.major_category_id?.toString() || "",
            minorCategoryId: item.minor_category_id?.toString() || "",
            serviceBanner: item.service_banner
              ? `${BASE_URL.replace("/api", "")}/content/${item.service_banner}`
              : "",
            serviceImage: item.service_image_1
              ? `${BASE_URL.replace("/api", "")}/content/${item.service_image_1}`
              : "",
            serviceType: item.service_type || "",
            serviceUnit: item.service_master?.service_default_unit || "",
            description: item.description || "",
            singlePriceActual: parseFloat(item.single_price_actual) || 0,
            singlePriceDiscounted: parseFloat(item.single_price_discounted) || 0,
            minPrice: item.min_price || null,
            maxPrice: item.max_price || null,
            attachment: item.attachment_1
              ? `${BASE_URL.replace("/api", "")}/content/${item.attachment_1}`
              : "",
            status:
              item.status === 0
                ? "Pending"
                : item.status === 1
                ? "Active"
                : item.status === 3
                ? "Inactive"
                : "Unknown",
            createdDate: item.created_at,
            updatedDate: item.updated_at,
            updatedBy: item.updated_by?.toString() || "",
          }));

          setData(apiData);
          setFilteredData(apiData);
        } else {
          message.error("Failed to fetch service data");
        }
      } catch (error) {
        console.error(error);
        message.error("Error fetching service data");
      }
    };

    fetchServiceData();
  }, []);

  // Search filter
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter(
      (item) =>
        item.vendorServiceId.toLowerCase().includes(value.toLowerCase()) ||
        item.vendorServiceName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // ... rest of your component code unchanged, including columns and UI

  const columns = [
    { title: "Vendor Service ID", dataIndex: "vendorServiceId", key: "vendorServiceId" },
    { title: "Vendor Name", dataIndex: "name", key: "name" },
    { title: "Service ID", dataIndex: "serviceId", key: "serviceId" },
    { title: "Vendor ID", dataIndex: "vendorId", key: "vendorId" },
    { title: "Vendor Service Name", dataIndex: "vendorServiceName", key: "vendorServiceName" },
    { title: "Major Category Id", dataIndex: "majorCategoryId", key: "majorCategoryId" },
    { title: "Minor Category Id", dataIndex: "minorCategoryId", key: "minorCategoryId" },
    {
      title: "Service Image",
      dataIndex: "serviceImage",
      key: "serviceImage",
      render: (text) => (
        <img
          src={text}
          alt="Service"
          style={{ height: 40, width: "auto", objectFit: "cover", borderRadius: 4 }}
        />
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
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
              ]}
            />
            <Tooltip title="Save">
              <CheckOutlined
                style={{ color: "green", cursor: "pointer" }}
                onClick={() => {
                  const updated = filteredData.map((item) =>
                    item.key === record.key ? { ...item, status: editingStatus } : item
                  );
                  setFilteredData(updated);
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
        <Button
          type="link"
          onClick={() => navigate("/viewvendorservice", { state: { record } })}
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
      ),
    },
  ];

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", padding: 0, borderRadius: "10px" }}
    >
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
            <span style={{ fontSize: 20, fontWeight: 600 }}>Vendor Services</span>
            <Input
              placeholder="Search by ID or Name"
              onChange={(e) => handleSearch(e.target.value)}
              value={searchText}
              allowClear
              style={{ width: 250 }}
            />
          </div>
        }
        bordered
        style={{ borderRadius: 12 }}
        bodyStyle={{ paddingTop: 16 }}
        headStyle={{
          marginBottom: 0,
          paddingBottom: 8,
          paddingTop: 16,
          borderBottom: "none",
        }}
      >
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
          rowClassName={(_, index) =>
            index % 2 === 0 ? "table-row-white" : "table-row-gray"
          }
          style={{ border: "none", wordBreak: "break-word" }}
        />
      </Card>
    </Space>
  );
};

export default VendorService;
