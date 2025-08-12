import React from "react";
import { Form, Input, Button, Select, Card, Row, Col } from "antd";

const { Option } = Select;

const AddStaff = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("User Data Submitted:", values);
        alert("User added successfully!");
        form.resetFields();
    };

    return (
        <Card title="Add Staff">
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={[16, 16]}>
                    {/* Select Role */}
                    <Col xs={24} sm={12}>
                        <Form.Item name="role" label="Select Role" rules={[{ required: true, message: "Select Role" }]}>
                            <Select placeholder="Select Role">
                                <Option value="operations">Operations</Option>
                                <Option value="admin">Admin</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    {/* User Name */}
                    <Col xs={24} sm={12}>
                        <Form.Item name="username" label="User Name" rules={[{ required: true, message: "Enter User Name" }]}>
                            <Input placeholder="Enter User Name" />
                        </Form.Item>
                    </Col>

                    {/* Email */}
                    <Col xs={24} sm={12}>
                        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Enter valid Email" }]}>
                            <Input placeholder="Enter Email" />
                        </Form.Item>
                    </Col>

                    {/* Mobile Number */}
                    <Col xs={24} sm={12}>
                        <Form.Item name="mobile" label="Mobile No." rules={[{ required: true, message: "Enter Mobile No." }]}>
                            <Input placeholder="Enter Mobile No." />
                        </Form.Item>
                    </Col>

                    {/* Password */}
                    <Col xs={24} sm={12}>
                        <Form.Item name="password" label="Password" rules={[{ required: true, message: "Enter Password" }]}>
                            <Input.Password placeholder="Enter Password" />
                        </Form.Item>
                    </Col>

                    {/* Status */}
                    <Col xs={24} sm={12}>
                        <Form.Item name="status" label="Status" rules={[{ required: true, message: "Select Status" }]}>
                            <Select placeholder="Select Status">
                                <Option value="active">Active</Option>
                                <Option value="inactive">Inactive</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    {/* Submit Button */}
                    <Col xs={24} sm={8} md={3}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default AddStaff;
