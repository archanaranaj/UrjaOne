
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";

const { Option } = Select;

const ServiceForm = () => {
  const [form] = Form.useForm();
  const [banner, setBanner] = useState([]);
  const [images, setImages] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const isEdit = location.pathname.includes("edit-service");
  const record = location.state?.record;

  useEffect(() => {
    if (isEdit && record) {
      form.setFieldsValue(record);
    }
  }, [record, isEdit, form]);

  const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

  const onFinish = (values) => {
    console.log("Form values:", values);
    message.success(isEdit ? "Service updated!" : "Service added!");
    navigate("/services");
  };

  return (
    <div style={{ padding: 20, background: "#fff", borderRadius: 10 }}>
      {/* Back Button and Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <Button
          type="text"
          icon={<ArrowBackIos style={{ fontSize: 20 }} />}
          onClick={() => navigate(-1)}
          style={{ padding: 0 }}
        />
        <h2 style={{ margin: 0 }}>{isEdit ? "Edit Service" : "Submit"}</h2>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="service_name"
              label="Service Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="major_category_id"
              label="Major Category"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="5674567">Solar</Option>
                <Option value="987659">Wind</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="minor_category_id"
              label="Minor Category"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="87634678">Rooftop</Option>
                <Option value="23456789">Farm</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="service_type"
              label="Service Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="product">Product</Option>
                <Option value="service">Service</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="service_unit"
              label="Default Unit"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

       <Row gutter={16}>
  <Col span={12}>
    <Form.Item
      label="Banner"
      name="banner"
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <Upload
        beforeUpload={() => false}
        fileList={banner}
        onChange={({ fileList }) => setBanner(fileList)}
      >
        <Button icon={<UploadOutlined />}>Upload Banner</Button>
      </Upload>
    </Form.Item>
  </Col>
  <Col span={12}>
    <Form.Item
      label="Images"
      name="images"
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <Upload
        beforeUpload={() => false}
        fileList={images}
        onChange={({ fileList }) => setImages(fileList)}
        multiple
      >
        <Button icon={<UploadOutlined />}>Upload Images</Button>
      </Upload>
    </Form.Item>
  </Col>
</Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEdit ? "Update Service" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ServiceForm;
