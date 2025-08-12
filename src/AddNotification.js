import React from "react";
import { Form, Input, Button, Select, Card, Row, Col, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

const AddNotification = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Notification Submitted:", values);
        alert("Notification added successfully!");
        form.resetFields();
    };

    return (
        <Card title="Add Notification">
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                encType="multipart/form-data"
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="store"
                            label="Select Store"
                            rules={[{ required: true, message: "Please select a store" }]}
                        >
                            <Select placeholder="Select Store">
                                <Option value="david_flour_cafe">David Flour Cafe</Option>
                                {/* Add more store options here */}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="customer"
                            label="Select Customer"
                            rules={[{ required: true, message: "Please select customer group" }]}
                        >
                            <Select placeholder="Select Customer">
                                <Option value="all">All Customer</Option>
                                {/* Add more customer options here */}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: "Please enter title" }]}
                        >
                            <Input placeholder="Enter notification title" />
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
                        <Form.Item
                            name="message"
                            label="Message"
                            rules={[{ required: true, message: "Please enter message" }]}
                        >
                            <TextArea rows={4} placeholder="Enter notification message" />
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
                        <Form.Item
                            name="image"
                            label="Image"
                            valuePropName="file"
                        >
                            <Upload beforeUpload={() => false}>
                                <Button icon={<UploadOutlined />}>Choose file</Button>
                            </Upload>
                        </Form.Item>
                    </Col>

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

export default AddNotification;
