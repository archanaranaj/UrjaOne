import React, { useState } from "react";
import { Table, Button, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const NotificationTable = () => {
    const notificationData = [
        {
            key: "1",
            id: 1,
            title: "Jowar (Sorghum) Flour",
            description: "Our Jowar (Sorghum) Flour is now available at a special d...",
            type: "All Customer",
        },
        {
            key: "2",
            id: 2,
            title: "Makka (Maize) Flour",
            description: "Our Makka (Maize) Flour is now available at a special d...",
            type: "All Customer",
        },
    ];

    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(notificationData);

    const handleSearch = (value) => {
        setSearchText(value);
        const filtered = notificationData.filter(
            (item) =>
                item.title.toLowerCase().includes(value.toLowerCase()) ||
                String(item.id).includes(value)
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
            title: "#ID",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (text) => highlightText(text, searchText),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ellipsis: true,
            render: (text) => highlightText(text, searchText),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Action",
            key: "action",
            render: () => (
                <Button icon={<DeleteOutlined />} danger />
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
                <h2 style={{ margin: 0 }}>Notification List</h2>

                <div
                    style={{
                        display: "flex",
                        // flexWrap: "wrap",
                        gap: "10px",
                        justifyContent: "flex-end"
                    }}
                >
                    <Input
                        placeholder="Search by Title or ID"
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchText}
                        style={{ minWidth: 200, flex: "1 1 250px" }}
                        allowClear
                    />
                    <Link to="/addnotification">
                        <Button type="primary">Add Notification</Button>
                    </Link>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={filteredData}
                pagination={{ pageSize: 10 }}
                scroll={{ x: "max-content" }}
            />
        </div>
    );
};

export default NotificationTable;
