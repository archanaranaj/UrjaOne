import React, { useState } from "react";
import { Input, Button, Card, Row, Col, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const AddSetting = () => {
    const [fields, setFields] = useState([{ name: "", percentage: "" }]);

    const handleChange = (index, key, value) => {
        const updatedFields = [...fields];
        updatedFields[index][key] = value;
        setFields(updatedFields);
    };

    const handleAdd = () => {
        setFields([...fields, { name: "", percentage: "" }]);
    };

    const handleDelete = (index) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        setFields(updatedFields);
    };

    const handleSave = () => {
        console.log("Saved fields:", fields);
        alert("Changes saved successfully!");
    };

    return (
        <Card title="Add Setting">
            {fields.map((field, index) => (
                <Row gutter={16} align="middle" key={index} style={{ marginBottom: 16 }}>
                    <Col span={10}>
                        <Input
                            placeholder="Tax Name"
                            value={field.name}
                            onChange={(e) => handleChange(index, "name", e.target.value)}
                        />
                    </Col>
                    <Col span={10}>
                        <Input
                            placeholder="Tax Percentages"
                            value={field.percentage}
                            onChange={(e) => handleChange(index, "percentage", e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(index)}>
                        </Button>
                    </Col>
                </Row>
            ))}

            <Space direction="vertical">
                <Button type="primary" onClick={handleAdd}>
                    + Add
                </Button>

                <Button type="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Space>
        </Card>
    );
};

export default AddSetting;
