// import React, { useState } from "react";
// import { Table, Tag,Modal,Button,Space } from "antd";
// import { EyeOutlined } from "@ant-design/icons";
// import dayjs from "dayjs";

// const auditData = [
//   {
//     id: 1,
//     name: "Archana Patil",
//     email: "archana.patil@example.com",
//     mobile: "9876543210",
//     createdAt: "2024-07-22 12:45:00",
//     activity: "Vendor Approved",
//   },
//   {
//     id: 2,
//     name: "Suresh Kumar",
//     email: "suresh.k@example.com",
//     mobile: "9123456789",
//     createdAt: "2024-07-21 10:15:00",
//     activity: "User Deleted",
//   },
//   {
//     id: 3,
//     name: "Nikita Sharma",
//     email: "nikita.s@example.com",
//     mobile: "9988776655",
//     createdAt: "2024-07-20 09:30:00",
//     activity: "Banner Updated",
//   },
// ];

// const AuditTrail = () => {
  
//   const [viewModalVisible, setViewModalVisible] = useState(false);
//    const [selectedRecord, setSelectedRecord] = useState(null);
//    const showViewModal = (record) => {
//      setSelectedRecord(record);
//      setViewModalVisible(true);
//    };
//   const columns = [
//     { title: "#ID", dataIndex: "id", key: "id" },
//     { title: "Name", dataIndex: "name", key: "name" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     { title: "Mobile No.", dataIndex: "mobile", key: "mobile" },
//     // { title: "Created at", dataIndex: "createdAt", key: "createdAt" },
//     {
//       title: "Activity",
//       dataIndex: "activity",
//       key: "activity"
//     },
//      {
//           title: "Action",
//           key: "action",
//           render: (_, record) => (
//              <Button type="link"
//                                                        icon={ <EyeOutlined />}
//                                                                onClick={() => showViewModal(record)}
//                                                              style={{ backgroundColor: "#F0720B", borderColor: "#F0720B", color: "#fff" }}/>
//           ),
//         },
//   ];

//   return (
//     <div style={{ padding: "2px 2px" }}>
//       <div
//         style={{
//           background: "#fff",
//           padding: 24,
//           borderRadius: 8,
//           boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginBottom: 16,
//           }}
//         >
//           <h2 style={{ margin: 0 }}>Audit Trail</h2>
//         </div>

//         <Table
//           columns={columns}
//           dataSource={auditData}
//           rowKey="id"
//           pagination={{ pageSize: 10 }}
//            rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")}
//         />
//  <Modal
//                 title="Audit Trail"
//                 open={viewModalVisible}
//                 onCancel={() => setViewModalVisible(false)}
//                 footer={null}
//               >
//                 {selectedRecord && (
//                   <Space direction="vertical" size="middle" style={{ marginTop: 12 }}>
//                     <div>
//                       <strong>Created Date:</strong>{" "}
//                       {dayjs(selectedRecord.createdDate).format("DD-MM-YYYY HH:mm")}
//                     </div>
                    
//                   </Space>
//                 )}
//               </Modal>
//       </div>
//     </div>
//   );
// };

// export default AuditTrail;

import React, { useState } from "react";
import { Table, Modal, Button, Space, Input } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const auditData = [
  {
    id: 1,
    name: "Archana Patil",
    email: "archana.patil@example.com",
    mobile: "9876543210",
    createdAt: "2024-07-22 12:45:00",
    activity: "Vendor Approved",
  },
  {
    id: 2,
    name: "Suresh Kumar",
    email: "suresh.k@example.com",
    mobile: "9123456789",
    createdAt: "2024-07-21 10:15:00",
    activity: "User Deleted",
  },
  {
    id: 3,
    name: "Nikita Sharma",
    email: "nikita.s@example.com",
    mobile: "9988776655",
    createdAt: "2024-07-20 09:30:00",
    activity: "Banner Updated",
  },
];

const AuditTrail = () => {
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(auditData);

  const showViewModal = (record) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = auditData.filter((item) =>
      Object.values(item).some((field) =>
        String(field).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const columns = [
    { title: "#ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Mobile No.", dataIndex: "mobile", key: "mobile" },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => showViewModal(record)}
          style={{
            backgroundColor: "#F0720B",
            borderColor: "#F0720B",
            color: "#fff",
          }}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: "2px 2px" }}>
      <div
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
          <h2 style={{ margin: 0 }}>Audit Trail</h2>
          <Input
            placeholder="Search..."
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 240 }}
            allowClear
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          rowClassName={(_, index) =>
            index % 2 === 0 ? "table-row-white" : "table-row-gray"
          }
        />

        <Modal
          title="Audit Trail"
          open={viewModalVisible}
          onCancel={() => setViewModalVisible(false)}
          footer={null}
        >
          {selectedRecord && (
            <Space direction="vertical" size="middle" style={{ marginTop: 12 }}>
              <div>
                <strong>Created Date:</strong>{" "}
                {dayjs(selectedRecord.createdAt).format("DD-MM-YYYY HH:mm")}
              </div>
              <div>
                <strong>Name:</strong> {selectedRecord.name}
              </div>
              <div>
                <strong>Email:</strong> {selectedRecord.email}
              </div>
              <div>
                <strong>Mobile:</strong> {selectedRecord.mobile}
              </div>
              <div>
                <strong>Activity:</strong> {selectedRecord.activity}
              </div>
            </Space>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AuditTrail;
