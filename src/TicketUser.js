import React, { useState } from "react";
import {
  Table,
  Tag,
  Input,
  Card,
  Space,
  Select,
  Tooltip,
  message,
  Button,
} from "antd";
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const ticketData = [
  {
    key: 1,
    ticketNo: "TKT001",
    userId: "USR001",
    ticketMajorType: "Technical",
    ticketMinorType: "Login Issue",
    ticketText: "Cannot login to the platform after recent update.",
    ticketStatus: "Active",
    ticketImage: "./story.png",
    createdDate: "2024-06-10T09:15:00",
    updatedDate: "2024-06-15T10:00:00",
    updatedBy: "admin001",
  },
  {
    key: 2,
    ticketNo: "TKT002",
    userId: "USR002",
    ticketMajorType: "Billing",
    ticketMinorType: "Invoice Error",
    ticketText: "Incorrect amount shown in invoice #456.",
    ticketStatus: "Closed",
    ticketImage: "./story.png",
    createdDate: "2024-05-20T12:00:00",
    updatedDate: "2024-05-22T08:45:00",
    updatedBy: "admin002",
  },
];

const TicketUser = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(ticketData);
  const [filteredData, setFilteredData] = useState(ticketData);
  const [editingKey, setEditingKey] = useState(null);
  const [editingStatus, setEditingStatus] = useState("");
  const navigate = useNavigate();
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter(
      (item) =>
        item.ticketNo.toLowerCase().includes(value.toLowerCase()) ||
        item.ticketText.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const statusColors = {
    Active: "#2fb344",
    Inactive: "#d63939",
    Hold: "#d63939",
    Dropped: "#d63939",
    Closed: "#d63939",
  };

  const columns = [
    { title: "Ticket No", dataIndex: "ticketNo", key: "ticketNo" },
    { title: "User ID", dataIndex: "userId", key: "userId" },
    { title: "Major Type", dataIndex: "ticketMajorType", key: "ticketMajorType" },
    { title: "Minor Type", dataIndex: "ticketMinorType", key: "ticketMinorType" },
    {
      title: "Ticket Text",
      dataIndex: "ticketText",
      key: "ticketText",
      render: (text) => (
        <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "ticketStatus",
      key: "ticketStatus",
      render: (status, record) => {
        const isEditing = editingKey === record.key;

        return isEditing ? (
          <Space>
            <Select
              value={editingStatus}
              onChange={setEditingStatus}
              style={{ width: 120 }}
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
                { label: "Hold", value: "Hold" },
                { label: "Dropped", value: "Dropped" },
                { label: "Closed", value: "Closed" },
              ]}
            />
            <Tooltip title="Save">
              <CheckOutlined
                style={{ color: "green", cursor: "pointer" }}
                onClick={() => {
                  const updated = data.map((item) =>
                    item.key === record.key
                      ? { ...item, ticketStatus: editingStatus }
                      : item
                  );
                  setData(updated);
                  setFilteredData(updated);
                  setEditingKey(null);
                  message.success("Status updated successfully!");
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
      title: "Ticket Image",
      dataIndex: "ticketImage",
      key: "ticketImage",
      render: (src) => (
        <img
          src={src}
          alt="Ticket"
          style={{
            height: 40,
            width: "auto",
            objectFit: "cover",
            borderRadius: 4,
          }}
        />
      ),
    },
    // {
    //   title: "Created Date",
    //   dataIndex: "createdDate",
    //   key: "createdDate",
    //   render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
    // },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      key: "updatedDate",
      render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
    },
    // {
    //   title: "Updated By",
    //   dataIndex: "updatedBy",
    //   key: "updatedBy",
    // },
    {
  title: "Action",
  key: "action",
  render: (_, record) => (
    <Tooltip title="View">
        <Button
            icon={<EyeOutlined />}
            style={{ backgroundColor: "#F0720B", borderColor: "#F0720B", color: "#fff" }} 
            type="link"
        onClick={() => navigate("/viewuser", { state: { ticket: record } })}
      />
    </Tooltip>
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
            <span style={{ fontSize: 20, fontWeight: 600 }}>
              Ticket User List
            </span>
            <Input
              placeholder="Search by Ticket No or Text"
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

export default TicketUser;
