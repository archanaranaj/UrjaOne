import React, { useState } from "react";
import { Table, Tag, Button, Input, Select, Space, } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const RolesTable = () => {
    const roleData = [
        {
            key: "1",
            id: "1",
            name: "Deepak Rajor",
            mobile: "8279417800",
            role: "Operations",
            permission: ["User", "Banner"],
            status: "Active",
        },
        {
            key: "2",
            id: "2",
            name: "John Doe",
            mobile: "9123456789",
            role: "Admin",
            permission: ["Admin", "Settings"],
            status: "Inactive",
        }
    ];

    const [filteredData, setFilteredData] = useState(roleData);
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState(null);

    const handleSearch = (value) => {
        setSearchText(value);
        const filtered = roleData.filter((role) =>
            role.name.toLowerCase().includes(value.toLowerCase()) ||
            role.mobile.includes(value)
        );
        setFilteredData(filtered);
    };

    const handleStatusFilter = (value) => {
        setStatusFilter(value);
        const filtered = value ? roleData.filter((role) => role.status === value) : roleData;
        setFilteredData(filtered);
    };

    const columns = [
        {
            title: "#ID",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            sorter: (a, b) => a.role.localeCompare(b.role),
            render: (text) => <strong>{text}</strong>,
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
            render: () => (
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
                <h2 style={{ margin: 0 }}>Role List</h2>
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
                    <Link to="/addrole">
                        <Button type="primary">Add Role</Button>
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

export default RolesTable;
