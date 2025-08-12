import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Input,
  Space,
  Modal,
  Form,
  Select,
  Upload,
  message,
  DatePicker,
  
} from "antd";
import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";

const { Option } = Select;
const { confirm } = Modal;

const initialLeads = [
  {
    key: "1",
    leadId: "UL00000001",
    userId: "U001",
     userName: "John Doe",
    addressId: "ADDR001",
    addressCategory: "Home",
    state: "Karnataka",
    city: "Bangalore",
    leadType: "Generic",
    vendorId: "45667",
    vendorServiceId: "09877",
    majorCategoryCode: "MC001",
    minorCategoryCode: "m001",
    description: "Need solar panel installation",
    image: "/story.png",
    leadDate: "2025-07-29",
    leadPeriod: "3 months",
    leadStatus: "Open",
    status: "Active",
    createdDate: "2025-07-29",
    updatedDate: "2025-07-29",
    updatedBy: "admin",
  },
];

const BusinessLeads = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
const [searchText, setSearchText] = useState("");

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const showAddModal = () => {
    setEditMode(false);
    form.resetFields();
    setFileList([]);
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setEditMode(true);
    setEditingRecord(record);
    form.setFieldsValue({
      ...record,
      leadDate: moment(record.leadDate),
      createdDate: moment(record.createdDate),
      updatedDate: moment(record.updatedDate),
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    confirm({
      title: "Delete this lead?",
      content: `Lead ID: ${record.leadId}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const newLeads = leads.filter((item) => item.leadId !== record.leadId);
        setLeads(newLeads);
        message.success("Lead deleted successfully!");
      },
    });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const photoBase64 =
        fileList.length > 0 && fileList[0].originFileObj
          ? await getBase64(fileList[0].originFileObj)
          : editingRecord?.image || "";

      const formattedValues = {
        ...values,
        leadDate: values.leadDate.format("YYYY-MM-DD"),
        createdDate: values.createdDate.format("YYYY-MM-DD"),
        updatedDate: values.updatedDate.format("YYYY-MM-DD"),
        image: photoBase64,
      };

      if (editMode) {
        const updated = leads.map((lead) =>
          lead.leadId === editingRecord.leadId ? { ...lead, ...formattedValues } : lead
        );
        setLeads(updated);
        message.success("Lead updated!");
      } else {
        const newLead = {
          ...formattedValues,
          leadId: `UL${(leads.length + 1).toString().padStart(8, "0")}`,
          key: (leads.length + 1).toString(),
        };
        setLeads([...leads, newLead]);
        message.success("Lead added!");
      }

      setIsModalVisible(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.log("Form error:", error);
    }
  };

  const uploadProps = {
    beforeUpload: () => false,
    onRemove: () => setFileList([]),
    fileList,
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList.slice(-1));
    },
    accept: "image/*",
  };

  const columns = [
    { title: "Lead ID", dataIndex: "leadId", key: "leadId" },
    { title: "User ID", dataIndex: "userId", key: "userId" },
    { title: "User Name", dataIndex: "userName", key: "userName" }, 
     {title:"Address ID", dataIndex:"addressId", key:"addressId"},
    {title:"Address Category", dataIndex:"addressCategory", key:"addressCategory" },
       {title:"State", dataIndex:"state",key:"state"},
    { title: "City", dataIndex: "city", key: "city" },
    { title: "Lead Type", dataIndex: "leadType", key: "leadType" },
    // {title: "Vendor ID", dataIndex:"vendorId", key:"vendorId"},
    // {title:"Vendor Service ID", dataIndex:"vendorServiceId", key:"vendorServiceId"},
    //  { title: "Major Category", dataIndex: "majorCategoryCode", key: "majorCategoryCode" },
    // { title: "Minor Category", dataIndex: "minorCategoryCode", key: "minorCategoryCode" },
    // {title:"Lead Description", dataIndex:"description", key:"description"},
    // {title:"Image", dataIndex:"image", key:"image", render: (text) => <img src={text} alt="Image" style={{ width: 50, height: 50 }} />},
    // {title:"Lead Date", dataIndex:"leadDate", key:"leadDate"},
    // {title:"Lead Period",dataIndex:"leadPeriod", key:"leadPeriod" },
    // {title:"Lead Status", dataIndex:"leadStatus", key:"leadStatus"},

    { title: "Status", dataIndex: "status", key: "status", render: (status) => (
      <Tag
                             style={{
                               backgroundColor: status === "Active" ? "#2fb344" : "#d63939", // dark green / dark red
                               color: "#ffffff", // white text
                               border: "none",
                             }}
                           >
                             {status}
                           </Tag>
    ) },
   {
  title: "Action",
  key: "action",
  render: (_, record) => (
    <Space>
     
      {/* <Button
  icon={<DeleteOutlined style={{ color: "#fff" }} />}
  onClick={() => handleDelete(record)}
  style={{ backgroundColor: "#d63939", borderColor: "#d63939" }}
/> */}

<Link
        to={`/viewlead/${record.leadId}`}
        state={{ lead: record }}
      >
       <Button  type="link" >
         <span
            style={{
              backgroundColor: "#F0720B",
              padding: "6px",
              borderRadius: "4px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <EyeOutlined style={{ color: "white" }} />
          </span>
        </Button>
      </Link>


    </Space>
  ),
}


  ];

  return (
    <div style={{ padding: 20, background: "#fff", borderRadius: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Leads Master</h2>
        {/* <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
          Add Lead
        </Button> */}
        <Input.Search
  placeholder="Search by User Name"
  onChange={(e) => setSearchText(e.target.value)}
  style={{ width: 250 }}
  allowClear
/>

      </div>

      <Table columns={columns}  dataSource={leads.filter((lead) =>
    lead.userName?.toLowerCase().includes(searchText.toLowerCase()))} scroll={{ x: "max-content" }} pagination={{ pageSize: 10 }}  rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")} />

      <Modal
        title={editMode ? "Edit Lead" : "Add Lead"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editMode ? "Update" : "Add"}
        destroyOnClose
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="userId" label="User ID" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="addressId" label="User Address ID" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="addressCategory" label="Address Category" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="state" label="State" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="city" label="City" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="leadType" label="Lead Type" rules={[{ required: true }]}> <Select><Option value="Generic">Generic</Option><Option value="Vendor Specific">Vendor Specific</Option></Select> </Form.Item>
          <Form.Item name="vendorId" label="Vendor ID"> <Input /> </Form.Item>
          <Form.Item name="vendorServiceId" label="Vendor Service ID"> <Input /> </Form.Item>
          <Form.Item name="majorCategoryCode" label="Major Category Code" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="minorCategoryCode" label="Minor Category Code" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="minorCategoryCode" label="Minor Category Code" rules={[{ required: true }]}> <Input /> </Form.Item>
          
          <Form.Item name="description" label="Lead Description" rules={[{ required: true }]}> <Input.TextArea rows={3} /> </Form.Item>
          <Form.Item name="leadDate" label="Lead Date" rules={[{ required: true }]}> <DatePicker style={{ width: "100%" }} /> </Form.Item>
          <Form.Item name="leadPeriod" label="Lead Period" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="leadStatus" label="Lead Status" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}> <Select><Option value="Active">Active</Option><Option value="Inactive">Inactive</Option></Select> </Form.Item>
          {/* <Form.Item name="createdDate" label="Created Date" rules={[{ required: true }]}> <DatePicker style={{ width: "100%" }} /> </Form.Item>
          <Form.Item name="updatedDate" label="Updated Date" rules={[{ required: true }]}> <DatePicker style={{ width: "100%" }} /> </Form.Item>
          <Form.Item name="updatedBy" label="Updated By" rules={[{ required: true }]}> <Input /> </Form.Item> */}
          <Form.Item name="image" label="Image">
            <Upload {...uploadProps} listType="picture-card" maxCount={1}>
              {fileList.length < 1 && <div><UploadOutlined /> Upload</div>}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BusinessLeads;