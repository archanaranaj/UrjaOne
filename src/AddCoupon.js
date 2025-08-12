import React from "react";
import { Form, Input, Button, DatePicker, Select, Card, Row, Col } from "antd";

const { Option } = Select;

const AddCoupon = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Coupon Submitted:", values);
        alert("Coupon added successfully!");
        form.resetFields();
    };

    return (
        <Card title="Add Discount Coupon">
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name="store" label="Select Store" rules={[{ required: true, message: "Select store" }]}>
                            <Select placeholder="Select Store">
                                <Option value="david_flour_cafe">David Flour Cafe</Option>
                                {/* Add more options if needed */}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name="code" label="Coupon Code" rules={[{ required: true, message: "Enter coupon code" }]}>
                            <Input placeholder="Enter coupon code" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name="discountType" label="Discount Type" rules={[{ required: true, message: "Select discount type" }]}>
                            <Select placeholder="Select type">
                                <Option value="fixed">Fixed</Option>
                                <Option value="percentage">Percentage</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name="percentage" label="Percentage">
                            <Input placeholder="Enter percentage" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name="minOrder" label="Min Order Value">
                            <Input placeholder="Enter min order value" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name="maxDiscount" label="Max Discount">
                            <Input placeholder="Enter max discount" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name="usageLimit" label="Usage Limit">
                            <Input placeholder="Enter usage limit" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name="expiryDate" label="Expiry Date">
                            <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name="status" label="Status">
                            <Select placeholder="Select status">
                                <Option value="active">Active</Option>
                                <Option value="inactive">Inactive</Option>
                            </Select>
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

export default AddCoupon;
