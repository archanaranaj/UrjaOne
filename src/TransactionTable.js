import React, { useState } from "react";
import { Table, Input, Tag } from "antd";

const TransactionTable = () => {
    const [search, setSearch] = useState("");

    const data = [
        {
            key: "1",
            id: "2CCD5678",
            agentName: "Deepak Kumar",
            agentId: "890457",
            gameName: "Cash Machine",
            amount: "$10",
            paidOn: "24 Mar, 2025 05:45",
            status: "Paid"
        },
        {
            key: "2",
            id: "5TE6921",
            agentName: "Rahul Sharma",
            agentId: "908762",
            gameName: "Game Room",
            amount: "$15",
            paidOn: "23 Mar, 2025 05:45",
            status: "Paid"
        },
        {
            key: "3",
            id: "56IT45T2",
            agentName: "Ravi Kumar",
            agentId: "093478",
            gameName: "High Roller",
            amount: "$20",
            paidOn: "22 Mar, 2025 04:45",
            status: "Paid"
        },
        {
            key: "4",
            id: "9IRTHE34",
            agentName: "Gourav Jain",
            agentId: "379125",
            gameName: "Ultrapanda",
            amount: "$15",
            paidOn: "21 Mar, 2025 15:40",
            status: "Paid"
        },
        {
            key: "5",
            id: "934UJRT1",
            agentName: "Pradeep Kumar",
            agentId: "127893",
            gameName: "Cash Machine",
            amount: "$20",
            paidOn: "20 Mar, 2025 21:20",
            status: "Paid"
        }
    ];

    const handleSearch = (value) => {
        setSearch(value);
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

    const filteredData = data.filter(
        (item) =>
            item.agentName.toLowerCase().includes(search.toLowerCase()) ||
            item.agentId.includes(search)
    );

    const columns = [
        { title: "#S.No", dataIndex: "key", key: "key" },
        { title: "Id", dataIndex: "id", key: "id" },
        {
            title: "Agent Name",
            dataIndex: "agentName",
            key: "agentName",
            render: (text) => highlightText(text, search),
        },
        {
            title: "Agent Id",
            dataIndex: "agentId",
            key: "agentId",
            render: (text) => highlightText(text, search),
        },
        { title: "Game Name", dataIndex: "gameName", key: "gameName" },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => <strong>{amount}</strong>,
        },
        { title: "Paid On", dataIndex: "paidOn", key: "paidOn" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "Paid" ? "green" : "volcano"}>{status}</Tag>
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
                    flexWrap: "wrap", // 💥 this allows wrapping on small screens
                    gap: "10px"
                }}
            >
                <h2 style={{ margin: 0 }}>Transaction History</h2>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        justifyContent: "flex-end"
                    }}
                >
                    <Input
                        placeholder="Search by Agent Name or ID"
                        onChange={(e) => handleSearch(e.target.value)}
                        value={search}
                        style={{ minWidth: 250, flex: "1 1 250px" }}
                        allowClear
                    />
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

export default TransactionTable;
