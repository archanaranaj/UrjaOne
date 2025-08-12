import React, { useState } from "react";
import { Table, Tag, Button, Input, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const BannerTables = () => {
    const bannerData = [
        {
            key: "1",
            id: 1,
            image: "http://139.59.67.166/flour-buddy-admin/assets/images/banner.png",
            storeName: "David Flour Cafe",
            title: "Lorem Ipsum",
            status: "Active",
        },
        {
            key: "2",
            id: 2,
            image: "http://139.59.67.166/flour-buddy-admin/assets/images/banner.png",
            storeName: "Joseph Flour Cafe",
            title: "Lorem Ipsum",
            status: "Active",
        },
    ];

    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(bannerData);

    const handleSearch = (value) => {
        setSearchText(value);
        const filtered = bannerData.filter(
            (item) =>
                item.storeName.toLowerCase().includes(value.toLowerCase()) ||
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
            width: 80,
        },
        {
            title: "Banner Image",
            dataIndex: "image",
            key: "image",
            render: (src) => (
                <img
                    src={src}
                    alt="Banner"
                    style={{
                        width: 150,
                        height: "auto",
                        borderRadius: 8,
                        objectFit: "cover",
                    }}
                />
            ),
        },
        {
            title: "Store Name",
            dataIndex: "storeName",
            key: "storeName",
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
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
                <h2 style={{ margin: 0 }}>Store Banner List</h2>
                <div
                    style={{
                        display: "flex",
                        // flexWrap: "wrap",
                        gap: "10px",
                        justifyContent: "flex-end"
                    }}
                >
                    <Input
                        placeholder="Search by Store, Title, or ID"
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchText}
                        style={{ minWidth: 200, flex: "1 1 250px" }}
                        allowClear
                    />
                    <Link to="/addbanner">
                        <Button type="primary">Add Banner</Button>
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

export default BannerTables;
