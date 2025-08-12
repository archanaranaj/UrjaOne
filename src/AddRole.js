import React from "react";
import { Form, Input, Button, Select, Card, Row, Col, Tag } from "antd";

const { Option } = Select;

const AddRole = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Role Data Submitted:", values);
        alert("Role added successfully!");
        form.resetFields();
    };

    return (
        <Card title="Add Role">
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={[16, 16]}>
                    {/* Add Role */}
                    <Col xs={24} sm={12}>
                        <Form.Item name="role" label="Add Role" rules={[{ required: true, message: "Enter Role Name" }]}>
                            <Input placeholder="Enter Role Name" />
                        </Form.Item>
                    </Col>

                    {/* Add Permission */}
                    <Col xs={24} sm={12}>
                        <Form.Item name="permission" label="Add Permission" rules={[{ required: true, message: "Select Permission" }]}>
                            <Select mode="tags" placeholder="Select or Add Permissions">
                                <Option value="User">User</Option>
                                <Option value="Banner">Banner</Option>
                                <Option value="Admin">Admin</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    {/* Status */}
                    <Col xs={24} sm={12}>
                        <Form.Item name="status" label="Status" rules={[{ required: true, message: "Select Status" }]}>
                            <Select placeholder="Select Status">
                                <Option value="Active">Active</Option>
                                <Option value="Inactive">Inactive</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    {/* Submit Button */}
                    <Col xs={24}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default AddRole;
