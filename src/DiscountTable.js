import React, { useState } from "react";
import { Table, Tag, Button, Input, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const DiscountTable = () => {
    const couponData = [
        {
            key: "1",
            id: 1,
            code: "REALFLOUR",
            type: "Percentage",
            percentage: "10%",
            minOrder: "₹ 40.00",
            maxDiscount: "₹ 500.00",
            usageLimit: "Multiple",
            active: true,
            expiryDate: "28 Feb, 2025",
        },
        {
            key: "2",
            id: 2,
            code: "REALFLOUR",
            type: "Percentage",
            percentage: "10%",
            minOrder: "₹ 40.00",
            maxDiscount: "₹ 500.00",
            usageLimit: "Multiple",
            active: true,
            expiryDate: "28 Feb, 2025",
        },
        {
            key: "3",
            id: 3,
            code: "REALFLOUR",
            type: "Percentage",
            percentage: "10%",
            minOrder: "₹ 40.00",
            maxDiscount: "₹ 500.00",
            usageLimit: "Multiple",
            active: true,
            expiryDate: "28 Feb, 2025",
        },
    ];

    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(couponData);

    const handleSearch = (value) => {
        setSearchText(value);
        const filtered = couponData.filter(
            (item) =>
                item.code.toLowerCase().includes(value.toLowerCase()) ||
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
        { title: "#ID", dataIndex: "id", key: "id", sorter: (a, b) => a.id - b.id },
        {
            title: "Coupon Code",
            dataIndex: "code",
            key: "code",
            render: (text) => highlightText(text, searchText),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Percentage",
            dataIndex: "percentage",
            key: "percentage",
        },
        {
            title: "Min Order Value",
            dataIndex: "minOrder",
            key: "minOrder",
        },
        {
            title: "Max Discount",
            dataIndex: "maxDiscount",
            key: "maxDiscount",
        },
        {
            title: "Usage Limit",
            dataIndex: "usageLimit",
            key: "usageLimit",
        },
        {
            title: "Activate",
            dataIndex: "active",
            key: "active",
            render: (active) => (
                <Tag color={active ? "green" : "red"}>{active ? "Active" : "Inactive"}</Tag>
            ),
        },
        {
            title: "Expiry Date",
            dataIndex: "expiryDate",
            key: "expiryDate",
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
                <h2 style={{ margin: 0 }}>Discount Coupon List</h2>
                <div
                    style={{
                        display: "flex",
                        // flexWrap: "wrap",
                        gap: "10px",
                        justifyContent: "flex-end"
                    }}
                >
                    <Input
                        placeholder="Search by Coupon or ID"
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchText}
                        style={{ minWidth: 200, flex: "1 1 250px" }}
                        allowClear
                    />
                    <Link to="/addcoupon">
                        <Button type="primary">Add Coupon</Button>
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

export default DiscountTable;
