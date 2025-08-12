// import React, { useState } from "react";
// import { Table, Input, Card, Typography, Space, Tag } from "antd";
// import dayjs from "dayjs";

// const { Title } = Typography;

// const initialData = [
//   {
//     key: 1,
//     orderId: "ORD123",
//     vendorId: "VND001",
//     planId: "PLN1001",
//     planStartDate: "2024-07-01",
//     planEndDate: "2024-12-31",
//     planAmt: 5000,
//     planGST: 900,
//     planTotalAmt: 5900,
//     paymentDate: "2024-07-01",
//     status: "Active",
//     createdDate: "2024-06-25T10:00:00",
//     updatedDate: "2024-07-01T12:30:00",
//     updatedBy: "admin001",
//   },
//   {
//     key: 2,
//     orderId: "ORD124",
//     vendorId: "VND002",
//     planId: "PLN1002",
//     planStartDate: "2023-01-01",
//     planEndDate: "2023-12-31",
//     planAmt: 4000,
//     planGST: 720,
//     planTotalAmt: 4720,
//     paymentDate: "2023-01-01",
//     status: "Expired",
//     createdDate: "2022-12-15T09:20:00",
//     updatedDate: "2023-01-01T11:00:00",
//     updatedBy: "admin002",
//   },
// ];

// const statusColorMap = {
//   Active: "#2fb344",
//   Expired: "#d63939",
//   Cancelled: "#fa541c",
//   Inactive: "#8c8c8c",
// };

// const Orders = () => {
//   const [searchText, setSearchText] = useState("");
//   const [data, setData] = useState(initialData);

//   const handleSearch = (value) => {
//     setSearchText(value);
//     const filtered = initialData.filter((item) =>
//       Object.values(item).some((val) =>
//         String(val).toLowerCase().includes(value.toLowerCase())
//       )
//     );
//     setData(filtered);
//   };

//   const columns = [
//   { title: "Order ID", dataIndex: "orderId", key: "orderId"},
//   { title: "Vendor ID", dataIndex: "vendorId", key: "vendorId", responsive: ['md'] },
//   { title: "Plan ID", dataIndex: "planId", key: "planId", responsive: ['md'] },
//   {
//     title: "Plan Start Date",
//     dataIndex: "planStartDate",
//     key: "planStartDate",
//     render: (date) => dayjs(date).format("DD-MM-YYYY"),
//     responsive: ['lg'],
//   },
//   {
//     title: "Plan End Date",
//     dataIndex: "planEndDate",
//     key: "planEndDate",
//     render: (date) => dayjs(date).format("DD-MM-YYYY"),
//     responsive: ['lg'],
//   },
//   { title: "Plan Amt", dataIndex: "planAmt", key: "planAmt", responsive: ['lg'] },
//   { title: "Plan GST", dataIndex: "planGST", key: "planGST", responsive: ['lg'] },
//   { title: "Plan Total Amt", dataIndex: "planTotalAmt", key: "planTotalAmt", responsive: ['md'] },
//   {
//     title: "Payment Date",
//     dataIndex: "paymentDate",
//     key: "paymentDate",
//     render: (date) => dayjs(date).format("DD-MM-YYYY"),
//     responsive: ['lg'],
//   },
//   {
//     title: "Status",
//     dataIndex: "status",
//     key: "status",
//     render: (status) => (
//       <Tag
//         style={{
//           backgroundColor: statusColorMap[status] || "#d9d9d9",
//           color: "#fff",
//           border: "none",
//         }}
//       >
//         {status}
//       </Tag>
//     ),
 
//   },
//   {
//     title: "Created Date",
//     dataIndex: "createdDate",
//     key: "createdDate",
//     render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
//     responsive: ['xl'],
//   },
//   {
//     title: "Updated Date",
//     dataIndex: "updatedDate",
//     key: "updatedDate",
//     render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
//     responsive: ['xl'],
//   },
//   { title: "Updated By", dataIndex: "updatedBy", key: "updatedBy", responsive: ['xl'] },
// ];


//   return (
//     <Space
//       direction="vertical"
//       size="small"
//       style={{ width: "100%", padding: "0", borderRadius: "10px" }}
//     >
//       <Card
//         title={
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <span style={{ fontSize: 20, fontWeight: 600 }}>Vendor Plan</span>
//             <Input
//               placeholder="Search Plan..."
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
//     </Space>
//   );
// };

// export default Orders;

import React, { useState } from "react";
import {
  Table,
  Input,
  Card,
  Typography,
  Space,
  Tag,
  Modal,
  Tooltip,
  Button,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title } = Typography;

const initialData = [
  {
    key: 1,
    orderId: "ORD123",
    vendorId: "VND001",
    planId: "PLN1001",
    state:"Karnataka",
    city:"Bangalore",
    planStartDate: "2024-07-01",
    planEndDate: "2024-12-31",
    planAmt: 5000,
    planGST: 900,
    planTotalAmt: 5900,
    paymentDate: "2024-07-01",
    status: "Active",
    createdDate: "2024-06-25T10:00:00",
    updatedDate: "2024-07-01T12:30:00",
    updatedBy: "admin001",
  },
  {
    key: 2,
    orderId: "ORD124",
    vendorId: "VND002",
    state:"Karnataka",
    city:"Bangalore",
    planId: "PLN1002",
    planStartDate: "2023-01-01",
    planEndDate: "2023-12-31",
    planAmt: 4000,
    planGST: 720,
    planTotalAmt: 4720,
    paymentDate: "2023-01-01",
    status: "Expired",
    createdDate: "2022-12-15T09:20:00",
    updatedDate: "2023-01-01T11:00:00",
    updatedBy: "admin002",
  },
];

const statusColorMap = {
  Active: "#2fb344",
  Expired: "#d63939",
  Cancelled: "#fa541c",
  Inactive: "#8c8c8c",
};

const Orders = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(initialData);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = initialData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setData(filtered);
  };

  const showViewModal = (record) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };

  const columns = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Vendor ID", dataIndex: "vendorId", key: "vendorId", responsive: ["md"] },
    {title: "State", dataIndex: "state", key: "state", responsive: ["md"] },
    {title: "City", dataIndex: "city", key: "city", responsive: ["md"] },
    { title: "Plan ID", dataIndex: "planId", key: "planId", responsive: ["md"] },
    {
      title: "Plan Start Date",
      dataIndex: "planStartDate",
      key: "planStartDate",
      render: (date) => dayjs(date).format("DD-MM-YYYY"),
      responsive: ["lg"],
    },
    {
      title: "Plan End Date",
      dataIndex: "planEndDate",
      key: "planEndDate",
      render: (date) => dayjs(date).format("DD-MM-YYYY"),
      responsive: ["lg"],
    },
   {
  title: "Plan Amt",
  dataIndex: "planAmt",
  key: "planAmt",
  responsive: ["lg"],
  render: (text) => (
    <span dangerouslySetInnerHTML={{
      __html: `&#8377;${Number(text).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
    }} />
  ),
},
    { title: "Plan GST", dataIndex: "planGST", key: "planGST", responsive: ["lg"] , render: (text) => (
    <span dangerouslySetInnerHTML={{
      __html: `&#8377;${Number(text).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
    }} />
  ),

    },
    {
      title: "Plan Total Amt",
      dataIndex: "planTotalAmt",
      key: "planTotalAmt",
      responsive: ["md"],
      render: (text) => (
    <span dangerouslySetInnerHTML={{
      __html: `&#8377;${Number(text).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
    }} />
  ),

    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
      render: (date) => dayjs(date).format("DD-MM-YYYY"),
      responsive: ["lg"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          style={{
            backgroundColor: statusColorMap[status] || "#d9d9d9",
            color: "#fff",
            border: "none",
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      key: "updatedDate",
      render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
      responsive: ["xl"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Tooltip title="View Details">
                     <Button type="link"
                                 icon={ <EyeOutlined />}
                                         onClick={() => showViewModal(record)}
                                       style={{ backgroundColor: "#F0720B", borderColor: "#F0720B", color: "#fff" }}/>
        </Tooltip>
      ),
    },
  ];

  return (
    <Space direction="vertical" size="small" style={{ width: "100%" }}>
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 600 }}>Vendor Plan</span>
            <Input
              placeholder="Search Plan..."
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
          paddingBottom: 8,
          paddingTop: 16,
          borderBottom: "none",
        }}
      >
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
          rowClassName={(_, index) =>
            index % 2 === 0 ? "table-row-white" : "table-row-gray"
          }
        />
      </Card>
<Modal
  title="Vendor Plan"
  open={viewModalVisible}
  onCancel={() => setViewModalVisible(false)}
  footer={null}
>
  {selectedRecord && (
    <Space
      direction="vertical"
      size="middle"
      style={{ width: "100%", marginTop: 12 }} // 👈 Spacing after title
    >
      <div>
        <strong>Created Date:</strong>{" "}
        {dayjs(selectedRecord.createdDate).format("DD-MM-YYYY HH:mm")}
      </div>
      <div>
        <strong>Updated By:</strong> {selectedRecord.updatedBy}
      </div>
    </Space>
  )}
</Modal>

    </Space>
  );
};

export default Orders;
