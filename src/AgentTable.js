import React, { useState } from "react";
import { Table, Tag, Button, Input, Space } from "antd";
import { Link } from "react-router-dom";
import {
    EditOutlined,
    DeleteOutlined,
    StopOutlined,
} from "@ant-design/icons";

const AgentTable = () => {
    const agentData = [
        {
            key: "1",
            id: 1,
            name: "Deepak Kumar",
            email: "deepak@gmail.com",
            mobile: "8279417800",
            createdAt: "2023-03-28 00:15:41",
            agentId: "#7890",
            paymentUrl: "https://deposit.com/#/payment?ref=deepakcasino",
            active: true,
        },
        {
            key: "2",
            id: 2,
            name: "Rahul Sharma",
            email: "rahul@gmail.com",
            mobile: "8279417800",
            createdAt: "2023-03-28 00:15:41",
            agentId: "#9052",
            paymentUrl: "https://deposit.com/#/payment?ref=rahulcashino",
            active: true,
        },
        {
            key: "3",
            id: 3,
            name: "Ravi Kumar",
            email: "ravi@gmail.com",
            mobile: "8279417800",
            createdAt: "2023-03-28 00:15:41",
            agentId: "#3502",
            paymentUrl: "https://deposit.com/#/payment?ref=ravicashino",
            active: true,
        },
    ];

    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(agentData);

    const handleSearch = (value) => {
        setSearchText(value);
        const filtered = agentData.filter(
            (item) =>
                item.name.toLowerCase().includes(value.toLowerCase()) ||
                item.email.toLowerCase().includes(value.toLowerCase()) ||
                item.mobile.includes(value) ||
                item.agentId.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

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

    const columns = [
        {
            title: "#S.No",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <Link to={`/agentdetail/${record.id}`}>
                    {highlightText(text, searchText)}
                </Link>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (text) => highlightText(text, searchText),
        },
        {
            title: "Mobile No.",
            dataIndex: "mobile",
            key: "mobile",
            render: (text) => highlightText(text, searchText),
        },
        {
            title: "Created at",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {
            title: "Agent Id",
            dataIndex: "agentId",
            key: "agentId",
            render: (text) => highlightText(text, searchText),
        },
        {
            title: "Unique Payment URL",
            dataIndex: "paymentUrl",
            key: "paymentUrl",
            render: (text) => (
                <a href={text} target="_blank" rel="noopener noreferrer">
                    {text}
                </a>
            ),
        },
        {
            title: "Status",
            dataIndex: "active",
            key: "active",
            render: (active) => (
                <Tag color={active ? "green" : "red"}>
                    {active ? "Active" : "Inactive"}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} style={{ color: "blue" }} />
                    <Button icon={<DeleteOutlined />} />
                    <Button icon={<StopOutlined />} danger />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: "20px", background: "#fff" }}>
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
                <h2 style={{ margin: 0 }}>Agent List</h2>
                <div style={{ display: "flex", gap: "10px" }}>
                    <Input
                        placeholder="Search by name, email, mobile or agent ID"
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchText}
                        style={{ minWidth: 310, flex: "1 1 250px" }}
                        allowClear
                    />
                    <Link to="/AddAgent">
                        <Button type="primary">Add Agent</Button>
                    </Link>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={filteredData}
                scroll={{ x: "max-content" }}
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default AgentTable;
