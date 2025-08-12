import React, { useState } from "react";
import { Table, Tag, Button, Space, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const GameTable = () => {
    const [gameData, setGameData] = useState([
        { id: "1", name: "Cash Machine", status: "Active" },
        { id: "2", name: "Game Room", status: "Active" },
        { id: "3", name: "Orion Star", status: "Active" },
        { id: "4", name: "High Roller", status: "Active" },
        { id: "5", name: "Ludo", status: "Active" },
    ]);

    const [modal, contextHolder] = Modal.useModal();

    const handleDelete = (id) => {
        modal.confirm({
            title: "Are you sure you want to delete this game?",
            content: "This action cannot be undone.",
            okText: "Yes, Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk: () => {
                const updatedData = gameData.filter((game) => game.id !== id);
                setGameData(updatedData);
                message.success("Game deleted successfully.");
            },
        });
    };

    const columns = [
        {
            title: "#ID",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => Number(a.id) - Number(b.id),
        },
        {
            title: "Game Name",
            dataIndex: "name",
            key: "name",
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
                    <Link to={`/addgame?id=${record.id}`}>
                        <Button icon={<EditOutlined />} type="default" style={{ color: "blue" }} />
                    </Link>
                    <Button icon={<DeleteOutlined />} danger type="default" onClick={() => handleDelete(record.id)} />
                </Space>

            ),
        },
    ];

    return (
        <div style={{ padding: "20px", background: "#fff" }}>
            {contextHolder}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                }}
            >
                <h2 style={{ margin: 0 }}>Game List</h2>
                <Link to="/addgame">
                    <Button type="primary">Add Game</Button>
                </Link>
            </div>

            <Table
                columns={columns}
                dataSource={gameData}
                pagination={{ pageSize: 10 }}
                rowKey="id"
            />
        </div>
    );
};

export default GameTable;
