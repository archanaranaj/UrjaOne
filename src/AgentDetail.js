import React, { useState } from "react";
import {
    Card,
    Tag,
    Typography,
    Space,
    Tooltip,
    Table,
    Input,
    Tabs,
} from "antd";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TabPane } = Tabs;

const AgentDetail = () => {
    const agent = {
        name: "Gourav",
        agentId: "#890457",
        mobile: "+91 9890568943",
        email: "gourav@gmail.com",
        createdAt: "2025-03-03 | 11:31:38",
        paymentUrl: "https://deposit.com/#/payment?ref=gouravcashino",
        status: "active",
    };

    const [searchText, setSearchText] = useState("");

    const paymentData = [
        {
            key: "1",
            date: "20/03/25",
            username: "Deepak",
            game: "Cash Machine",
            amount: "$300",
            status: "Success",
        },
        {
            key: "2",
            date: "18/03/25",
            username: "Rahul",
            game: "Game Room",
            amount: "$400",
            status: "Success",
        },
    ];

    const payoutData = [
        {
            key: "1",
            date: "22/03/25",
            amount: "$200",
            method: "Bank Transfer",
            status: "Completed",
        },
        {
            key: "2",
            date: "19/03/25",
            amount: "$150",
            method: "UPI",
            status: "Pending",
        },
    ];

    const highlightText = (text, search) => {
        if (!search) return text;
        const regex = new RegExp(`(${search})`, "gi");
        return String(text).split(regex).map((part, index) =>
            part.toLowerCase() === search.toLowerCase() ? (
                <span key={index} style={{ backgroundColor: "yellow" }}>{part}</span>
            ) : (
                part
            )
        );
    };

    const filteredPayment = paymentData.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const filteredPayout = payoutData.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const paymentColumns = [
        {
            title: "S.no",
            dataIndex: "key",
            key: "key",
            width: 80,
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (text) => highlightText(text, searchText),
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            render: (text) => highlightText(text, searchText),
        },
        {
            title: "Game",
            dataIndex: "game",
            key: "game",
            render: (text) => highlightText(text, searchText),
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => <strong>{highlightText(amount, searchText)}</strong>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color="green" style={{ fontWeight: 500 }}>
                    {highlightText(status, searchText)}
                </Tag>
            ),
        },
    ];

    const payoutColumns = [
        {
            title: "S.no",
            dataIndex: "key",
            key: "key",
            width: 80,
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (text) => highlightText(text, searchText),
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (text) => <strong>{highlightText(text, searchText)}</strong>,
        },
        {
            title: "Method",
            dataIndex: "method",
            key: "method",
            render: (text) => highlightText(text, searchText),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "Completed" ? "green" : "orange"} style={{ fontWeight: 500 }}>
                    {highlightText(status, searchText)}
                </Tag>
            ),
        },
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(agent.paymentUrl);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {/* AGENT PROFILE CARD */}
            <Card style={{ margin: "auto", position: "relative" }} bodyStyle={{ paddingTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Title level={5} style={{ marginBottom: 0 }}>
                        {agent.name}
                    </Title>
                    <Tag
                        color="green"
                        style={{
                            fontSize: 14,
                            padding: "4px 12px",
                            borderRadius: 6,
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        }}
                        icon={<CheckOutlined />}
                    >
                        Active
                    </Tag>
                </div>

                <Space direction="vertical" size="small" style={{ marginTop: 12 }}>
                    <div><strong>Agent ID:</strong> <span style={{ color: "#555" }}>{agent.agentId}</span></div>
                    <div><strong>Mobile No.:</strong> <span style={{ color: "#555" }}>{agent.mobile}</span></div>
                    <div><strong>Email Id:</strong> <span style={{ color: "#555" }}>{agent.email}</span></div>
                    <div><strong>Register On:</strong> <span style={{ color: "#555" }}>{agent.createdAt}</span></div>
                    <div>
                        <strong>Payment Link:</strong>{" "}
                        <span style={{ color: "#555" }}>
                            <a href={agent.paymentUrl} target="_blank" rel="noreferrer">
                                {agent.paymentUrl}
                            </a>{" "}
                            <Tooltip title="Copy to clipboard">
                                <CopyOutlined
                                    style={{ cursor: "pointer", marginLeft: 4 }}
                                    onClick={copyToClipboard}
                                />
                            </Tooltip>
                        </span>
                    </div>
                </Space>
            </Card>

            {/* TABS SECTION */}
            <div style={{ padding: "20px", background: "#fff" }}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Payment Details" key="1">
                        <div style={{ marginBottom: 16, display: "flex", justifyContent: "flex-end", width: "200px", float: "right" }}>
                            <Input
                                placeholder="Search by any field"
                                onChange={(e) => setSearchText(e.target.value)}
                                value={searchText}
                                style={{ minWidth: 200 }}
                                allowClear
                            />
                        </div>
                        <Table
                            columns={paymentColumns}
                            dataSource={filteredPayment}
                            pagination={{ pageSize: 10 }}
                            scroll={{ x: "max-content" }}
                            bordered
                        />
                    </TabPane>
                    <TabPane tab="Payout Details" key="2">
                        {/* Summary Card */}
                        <Card
                            style={{ marginBottom: 20, background: "#f8f8f8", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                            bodyStyle={{ padding: 20 }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <div style={{ color: "#888" }}>Payout for this month (25 Feb to 25 Mar)</div>
                                    <div style={{ fontSize: 24, fontWeight: 600 }}>₹ 3400</div>
                                </div>
                                <button
                                    style={{
                                        backgroundColor: "#1677ff",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: 6,
                                        padding: "8px 16px",
                                        cursor: "pointer",
                                        fontWeight: 500,
                                    }}
                                >
                                    Mark Payout Done
                                </button>
                            </div>
                        </Card>

                        {/* Styled Table */}
                        <Table
                            bordered
                            pagination={false}
                            dataSource={[
                                {
                                    key: "1",
                                    date: "2024-05-05 11:31:38",
                                    payment: "₹300",
                                    commission: "₹30",
                                },
                                {
                                    key: "2",
                                    date: "2024-05-05 11:31:38",
                                    payment: "₹400",
                                    commission: "₹40",
                                },
                            ]}
                            columns={[
                                {
                                    title: "S.no",
                                    dataIndex: "key",
                                    key: "sno",
                                    width: 80,
                                },
                                {
                                    title: "Date & Time",
                                    dataIndex: "date",
                                    key: "date",
                                },
                                {
                                    title: "Payment",
                                    dataIndex: "payment",
                                    key: "payment",
                                    render: (text) => <strong>{text}</strong>,
                                },
                                {
                                    title: "Agent Commission",
                                    dataIndex: "commission",
                                    key: "commission",
                                    render: (text) => <strong>{text}</strong>,
                                },
                            ]}
                        />
                    </TabPane>

                </Tabs>
            </div>
        </Space>
    );
};

export default AgentDetail;
