import React, { useState } from "react";
import { Table, Tag, Button, Input, Select, Space } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const StaffTable = () => {
    // Ensuring userData is always an array
    const userData = [
        { key: "1", id: "1", name: "Deepak Rajor", email: "deepak@gmail.com", mobile: "8279417800", createdAt: "2023-03-28 00:15:41", roles: "Operations", permission: ["User", "Banner"], status: "Active" },
        { key: "2", id: "2", name: "Deepak Rajor", email: "deepak@gmail.com", mobile: "8279417800", createdAt: "2023-03-28 00:15:41", roles: "Operations", permission: ["User", "Banner"], status: "Active" },
        { key: "3", id: "3", name: "Deepak Rajor", email: "deepak@gmail.com", mobile: "8279417800", createdAt: "2023-03-28 00:15:41", roles: "Operations", permission: ["User", "Banner"], status: "Active" },
    ] || [];

    const [filteredData, setFilteredData] = useState(userData);
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState(null);

    const handleSearch = (value) => {
        setSearchText(value);
        const filtered = userData.filter((user) =>
            user.name.toLowerCase().includes(value.toLowerCase()) ||
            user.mobile.includes(value)
        );
        setFilteredData(filtered);
    };

    const handleStatusFilter = (value) => {
        setStatusFilter(value);
        const filtered = value ? userData.filter((user) => user.status === value) : userData;
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
        { title: "#ID", dataIndex: "id", key: "id", sorter: (a, b) => a.id - b.id },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (text) => highlightText(text, searchText),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: "Mobile No",
            dataIndex: "mobile",
            key: "mobile",
            sorter: (a, b) => a.mobile.localeCompare(b.mobile),
            render: (text) => highlightText(text, searchText),
        },
        {
            title: "Created at",
            dataIndex: "createdAt",
            key: "createdAt",
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: "Roles",
            dataIndex: "roles",
            key: "roles",
            sorter: (a, b) => a.roles.localeCompare(b.roles),
        },
        {
            title: "Permission",
            dataIndex: "permission",
            key: "permission",
            render: (permissions) => (
                <Space>
                    {permissions.map((perm, index) => (
                        <Tag color="blue" key={index}>{perm}</Tag>
                    ))}
                </Space>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            filters: [
                { text: "Active", value: "Active" },
                { text: "Inactive", value: "Inactive" },
            ],
            onFilter: (value, record) => record.status === value,
            render: (status) => (
                <Tag color={status === "Active" ? "green" : "red"}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} style={{ color: "blue" }} />
                    <Button icon={<DeleteOutlined />} danger />
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
                    gap: "10px"
                }}
            >
                <h2 style={{ margin: 0 }}>Staff List</h2>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        justifyContent: "flex-end"
                    }}
                >
                    <Input
                        placeholder="Search Name or Mobile"
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchText}
                        style={{ minWidth: 200, flex: "1 1 250px" }}
                        allowClear
                    />
                    <Select
                        placeholder="Filter by Status"
                        onChange={handleStatusFilter}
                        allowClear
                        style={{ minWidth: 150, flex: "1 1 150px" }}
                    >
                        <Option value="Active">Active</Option>
                        <Option value="Inactive">Inactive</Option>
                    </Select>
                    <Link to="/addstaff">
                        <Button type="primary">Add Staff</Button>
                    </Link>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={filteredData || []} // 🔹 Prevent undefined data
                scroll={{ x: "max-content" }}
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default StaffTable;

