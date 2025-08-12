import React, { useState } from "react";
import {
  Table,
  Tag,
  Input,
  Card,
  Space,
  Button,
  Select,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import {
  ReloadOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

const sampleVendorTickets = [
  {
    key: 1,
    ticketNo: "TICK12345",
    vendorId: "VEN1023",
    ticketMajorType: "Service",
    ticketMinorType: "Delay",
    ticketText: "Service delayed beyond expected time.",
    ticketImage: "./story.png",
    ticketStatus: "Active",
    createdDate: "2025-07-29T10:00:00",
    updatedDate: "2025-07-30T09:30:00",
    updatedBy: "USER1001",
  },
  {
    key: 2,
    ticketNo: "TICK12346",
    vendorId: "VEN2045",
    ticketMajorType: "Logistics",
    ticketMinorType: "Late Delivery",
    ticketText: "Delivery was delayed beyond SLA agreement.",
    ticketImage: "./story.png",
    ticketStatus: "Closed",
    createdDate: "2025-06-20T08:00:00",
    updatedDate: "2025-06-22T14:20:00",
    updatedBy: "USER1002",
  },
];

const TicketVendor = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(sampleVendorTickets);
  const [filteredData, setFilteredData] = useState(sampleVendorTickets);
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

  const handleRefresh = () => {
    setFilteredData(data);
    setSearchText("");
  };

  const columns = [
    { title: "Ticket No", dataIndex: "ticketNo", key: "ticketNo" },
    { title: "Vendor ID", dataIndex: "vendorId", key: "vendorId" },
    { title: "Major Type", dataIndex: "ticketMajorType", key: "ticketMajorType" },
    { title: "Minor Type", dataIndex: "ticketMinorType", key: "ticketMinorType" },
    {
      title: "Ticket Text",
      dataIndex: "ticketText",
      key: "ticketText",
      render: (text) => (
        <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{text}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "ticketStatus",
      key: "ticketStatus",
      render: (status, record) => {
        const isEditing = editingKey === record.key;
        const statusColors = {
          Active: "#2fb344",
          Inactive: "#d63939",
          Hold: "#d63939",
          Dropped: "#d63939",
          Closed: "#d63939",
        };

        return isEditing ? (
          <Space>
            <Select
              value={editingStatus}
              onChange={(value) => setEditingStatus(value)}
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
  title: 'Action',
  key: 'action',
  render: (_, record) => (
    <Button
      icon={<EyeOutlined />}
      style={{ backgroundColor: "#F0720B", borderColor: "#F0720B", color: "#fff" }} 
      type="link"
      onClick={() =>
        navigate('/viewticket', {
          state: {
            ticket: {
              ...record,
              chat: [
                { from: 'user', message: 'Hello, I have an issue with the service.' },
                { from: 'admin', message: 'Hi, can you please share a screenshot?' },
                { from: 'user', message: 'Sure, attaching it here.', image: 'https://via.placeholder.com/120' },
                { from: 'admin', message: 'Thanks, we are checking it.' },
                { from: 'user', message: 'Any update?' },
                { from: 'admin', message: 'Yes, it’s resolved. Please verify.' },
              ],
            },
          },
        })
      }
    />
  ),
}

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
              Ticket Vendor List
            </span>
            <Space>
              <Input
                placeholder="Search by Ticket No or Text"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchText}
                allowClear
                style={{ width: 250 }}
              />
              <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
                Refresh
              </Button>
            </Space>
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

export default TicketVendor;
