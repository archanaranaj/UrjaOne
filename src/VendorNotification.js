import React, { useState } from 'react';
import {
  Table,
  Tag,
  Button,
  Space,
  Image,
  Card,
  Typography,
  Modal,
  Form,
  Input,
  Upload,
  Select,
  message as AntMessage,
} from 'antd';
import { BellOutlined, UserOutlined, UploadOutlined,EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
const { Title } = Typography;
const { Option } = Select;

const sampleData = [
  {
    id: 1,
    name: 'Vendor A',
    title: 'Offer Alert',
    message: 'Special discount this weekend!',
    type: 'General',
    image: '/story.png',
    createdAt: '2025-08-01',
    status: 'Sent',
  },
  {
    id: 2,
    name: 'Vendor B',
    title: 'Maintenance Notice',
    type: 'Vendor',
    message: 'System update at 2 AM',
    image: '/story.png',
    createdAt: '2025-08-02',
    status: 'Pending',
  },
];

const VendorNotification = () => {
  const [notifications, setNotifications] = useState(sampleData);
  const [vendorModalVisible, setVendorModalVisible] = useState(false);
  const [generalModalVisible, setGeneralModalVisible] = useState(false);
  const [vendorForm] = Form.useForm();
  const [generalForm] = Form.useForm();
  const [fileList, setFileList] = useState([]);
const [viewModalVisible, setViewModalVisible] = useState(false);
 const [selectedRecord, setSelectedRecord] = useState(null);
 const showViewModal = (record) => {
   setSelectedRecord(record);
   setViewModalVisible(true);
 };
  const uploadProps = {
    beforeUpload: () => false,
    onChange: ({ fileList }) => setFileList(fileList),
    fileList,
  };

  const handleSend = (values, type = 'vendor') => {
    const imageUrl =
      fileList[0]?.url || fileList[0]?.thumbUrl || '/story.png';
    const newNotification = {
      ...values,
      image: imageUrl,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Sent',
    };
    setNotifications((prev) => [...prev, newNotification]);
    AntMessage.success('Notification sent!');

    if (type === 'vendor') {
      vendorForm.resetFields();
      setVendorModalVisible(false);
    } else {
      generalForm.resetFields();
      setGeneralModalVisible(false);
    }

    setFileList([]);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Message', dataIndex: 'message', key: 'message' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Image src={image} width={60} />,
    },
    // { title: 'Creation Date', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag
                 style={{
                   backgroundColor: status === "Sent" ? "#2fb344" : "#d63939",
                   color: "#fff",
                 }}
               >
                 {status}
               </Tag>
      ),
    },
     {
          title: "Action",
          key: "action",
          render: (_, record) => (
           <Button type="link"
                                                     icon={ <EyeOutlined />}
                                                             onClick={() => showViewModal(record)}
                                                           style={{ backgroundColor: "#F0720B", borderColor: "#F0720B", color: "#fff" }}/>
          ),
        },
  ];

  return (
    <div style={{ padding: '2px 2px' }}>
      <Card
        title={<Title level={4}>Vendor Notifications</Title>}
        extra={
          <Space>
            <Button
              icon={<UserOutlined />}
              type="primary"
              onClick={() => setVendorModalVisible(true)}
            >
              Vendor Specific
            </Button>
            <Button
              icon={<BellOutlined />}
              type="default"
              onClick={() => setGeneralModalVisible(true)}
            >
              General Notification
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={notifications}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: 'max-content' }}
          size="small"
        />
      </Card>

      {/* Vendor Specific Modal */}
      <Modal
        title="Send Vendor Specific Notification"
        open={vendorModalVisible}
        onCancel={() => setVendorModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" form={vendorForm} onFinish={(vendor) => handleSend(vendor, 'vendor')}>
         
<Form.Item name="name" label="Name" rules={[{ required: true }]}>
  <Select
    showSearch
    placeholder="Select a vendor"
    optionFilterProp="children"
    filterOption={(input, option) =>
      option.children.toLowerCase().includes(input.toLowerCase())
    }
  >
    <Option value="Vendor A">Vendor A</Option>
    <Option value="Vendor B">Vendor B</Option>
    <Option value="Vendor C">Vendor C</Option>
  </Select>
</Form.Item>

          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="message" label="Message" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item name="image" label="Image">
            <Upload {...uploadProps} listType="picture-card" maxCount={1}>
              {fileList.length < 1 && (
                <div>
                  <UploadOutlined /> Upload
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* General Notification Modal */}
      <Modal
        title="Send General Notification"
        open={generalModalVisible}
        onCancel={() => setGeneralModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" form={generalForm} onFinish={(vendor) => handleSend(vendor, 'general')}>
        
         


        

          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="message" label="Message" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item name="image" label="Image">
            <Upload {...uploadProps} listType="picture-card" maxCount={1}>
              {fileList.length < 1 && (
                <div>
                  <UploadOutlined /> Upload
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send
            </Button>
          </Form.Item>
        </Form>
      </Modal>
       <Modal
                      title="Vendor Notification"
                      open={viewModalVisible}
                      onCancel={() => setViewModalVisible(false)}
                      footer={null}
                    >
                      {selectedRecord && (
                        <Space direction="vertical" size="middle" style={{ marginTop: 12 }}>
                          <div>
                            <strong>Created Date:</strong>{" "}
                            {dayjs(selectedRecord.createdDate).format("DD-MM-YYYY HH:mm")}
                          </div>
                          
                        </Space>
                      )}
                    </Modal>
    </div>
  );
};

export default VendorNotification;
