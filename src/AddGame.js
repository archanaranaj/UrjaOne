import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Input, Button, Form, Row, Col, Select } from "antd";

const { Option } = Select;

const AddGame = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const editId = params.get("id");

    const isEditMode = !!editId;

    const [form] = Form.useForm();

    useEffect(() => {
        if (isEditMode) {
            const gameToEdit = {
                name: "Example Game",
                status: "Active",
            };
            form.setFieldsValue(gameToEdit);
        }
    }, [editId, isEditMode, form]);

    const onFinish = (values) => {
        if (isEditMode) {
            console.log("Updating game ID:", editId, values);
        } else {
            console.log("Creating new game:", values);
        }
    };

    return (
        <div style={{ padding: 24, background: "#fff" }}>
            <h2>{isEditMode ? "Edit Game" : "Add Game"}</h2>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Game Name"
                            name="name"
                            rules={[{ required: true, message: "Please enter the game name" }]}
                        >
                            <Input placeholder="Enter game name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true, message: "Please select status" }]}
                        >
                            <Select placeholder="Select status">
                                <Option value="Active">Active</Option>
                                <Option value="Inactive">Inactive</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {isEditMode ? "Update Game" : "Add Game"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddGame;
