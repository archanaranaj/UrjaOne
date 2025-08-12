import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Upload,
  message,
  InputNumber,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const ProductCatalogue = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleFinish = (values) => {
    setData([...data, { ...values, key: Date.now() }]);
    form.resetFields();
    setIsModalVisible(false);
    message.success("Product added successfully");
  };

  const columns = [
    {
      title: "Major Category",
      dataIndex: "majorCategory",
      key: "majorCategory",
    },
    {
      title: "Minor Category",
      dataIndex: "minorCategory",
      key: "minorCategory",
    },
    {
      title: "Price Type",
      dataIndex: "priceType",
      key: "priceType",
    },
    {
      title: "Actual Price",
      dataIndex: "actualPrice",
      key: "actualPrice",
    },
    {
      title: "Discount Price",
      dataIndex: "discountPrice",
      key: "discountPrice",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (images) => images?.map((img, i) => <img key={i} src={URL.createObjectURL(img.originFileObj)} alt="" width="50" style={{ marginRight: 4 }} />),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ marginBottom: 16 }}>
        Add Product
      </Button>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Add Product"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="majorCategory" label="Major Category" rules={[{ required: true }]}> 
            <Select placeholder="Select Major Category">
              <Option value="Electronics">Electronics</Option>
              <Option value="Fashion">Fashion</Option>
            </Select>
          </Form.Item>
          <Form.Item name="minorCategory" label="Minor Category" rules={[{ required: true }]}> 
            <Select placeholder="Select Minor Category">
              <Option value="Mobiles">Mobiles</Option>
              <Option value="Laptops">Laptops</Option>
            </Select>
          </Form.Item>
          <Form.Item name="priceType" label="Select Price Type" rules={[{ required: true }]}> 
            <Select placeholder="Select">
              <Option value="Single Price">Single Price</Option>
              <Option value="Price Range">Price Range</Option>
            </Select>
          </Form.Item>
          <Form.Item name="actualPrice" label="Actual Price" rules={[{ required: true }]}> 
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
          <Form.Item name="discountPrice" label="Discount Price"> 
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
          <Form.Item name="description" label="Description"> 
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="images" label="Upload Images" valuePropName="fileList" getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}> 
            <Upload listType="picture" multiple beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductCatalogue;
