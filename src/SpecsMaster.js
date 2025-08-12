import React, { useState } from "react";
import {
  Table,
  Tag,
  Input,
  Button,
  Card,
  Space,
  Popconfirm,
  message,
  Modal,
  Form,
  Select,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

const dataSource = [
  {
    key: 1,
    specsId: "MSR002",
    serviceId: "2089722",
    name: "Sample Specs",
    status: "Active",
    createdDate: "2024-07-01T10:00:00",
    updatedDate: "2024-07-20T12:30:00",
    updatedBy: "admin001",
  },
  {
    key: 2,
    specsId: "VND002",
    serviceId: "209822",
    name: "Sample Specs",
    status: "Inactive",
    createdDate: "2024-06-15T09:20:00",
    updatedDate: "2024-07-15T15:45:00",
    updatedBy: "admin002",
  },
];

const SpecsMaster = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(dataSource);
  // const [filteredData, setFilteredData] = useState(dataSource);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
 const [viewModalVisible, setViewModalVisible] = useState(false);
 const [selectedRecord, setSelectedRecord] = useState(null);
 const [filtersVisible, setFiltersVisible] = useState(false);
const [filterValues, setFilterValues] = useState({});
const [filterForm] = Form.useForm();
const [editMode, setEditMode] = useState(false);
const [editingKey, setEditingKey] = useState(null);


 const showViewModal = (record) => {
   setSelectedRecord(record);
   setViewModalVisible(true);
 };
 const filteredData = data.filter((spec) => {
  const matchesSearch =
    spec.specsId.toLowerCase().includes(searchText.toLowerCase()) ||
    spec.name.toLowerCase().includes(searchText.toLowerCase());

  const matchesSpecsId = filterValues.specsId
    ? spec.specsId.toLowerCase().includes(filterValues.specsId.toLowerCase())
    : true;

  const matchesName = filterValues.name
    ? spec.name.toLowerCase().includes(filterValues.name.toLowerCase())
    : true;

  const matchesStatus = filterValues.status
    ? spec.status === filterValues.status
    : true;

  return matchesSearch && matchesSpecsId && matchesName && matchesStatus;
});

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter(
      (spec) =>
        spec.specsId.toLowerCase().includes(value.toLowerCase()) ||
        spec.name.toLowerCase().includes(value.toLowerCase())
    );
    // setFilteredData(filtered);
  };

 const showModal = () => {
  form.resetFields();
  setEditMode(false);
  setEditingKey(null);
  setIsModalVisible(true);
};
const showEditModal = (record) => {
  form.setFieldsValue({
    name: record.name,
    status: record.status,
  });
  setEditMode(true);
  setEditingKey(record.key);
  setIsModalVisible(true);
};


  const handleCancel = () => {
    setIsModalVisible(false);
  };

 const handleSubmit = (values) => {
  if (editMode && editingKey !== null) {
    // Editing existing spec
    const updatedData = data.map((item) =>
      item.key === editingKey
        ? {
            ...item,
            name: values.name,
            status: values.status,
            updatedDate: new Date().toISOString(),
            updatedBy: "currentUser", // Change if needed
          }
        : item
    );
    setData(updatedData);
    message.success("Specs updated successfully");
  } else {
    // Adding new spec
    const newKey = data.length ? Math.max(...data.map((item) => item.key)) + 1 : 1;
    const newSpec = {
      key: newKey,
      specsId: `SPC${String(newKey).padStart(3, "0")}`,
      serviceId: `SRV${Math.floor(Math.random() * 900000 + 100000)}`,
      name: values.name,
      status: values.status,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      updatedBy: "currentUser",
    };
    setData([...data, newSpec]);
    message.success("Specs added successfully");
  }

  setIsModalVisible(false);
  form.resetFields();
  setEditMode(false);
  setEditingKey(null);
};


  const handleEdit = (record) => {
  showEditModal(record);
};


  const handleDelete = (key) => {
    const updatedData = data.filter((item) => item.key !== key);
    setData(updatedData);
    // setFilteredData(updatedData);
    message.success("Specification deleted successfully.");
  };

  const columns = [
    {
      title: "Specs ID",
      dataIndex: "specsId",
      key: "specsId",
    },
    {
      title: "Service ID",
      dataIndex: "serviceId",
      key: "serviceId",
    },
    {
      title: "Specs Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          style={{
            backgroundColor: status === "Active" ? "#2fb344" : "#d63939",
            color: "#ffffff",
            border: "none",
          }}
        >
          {status}
        </Tag>
      ),
    },
    // {
    //   title: "Created Date",
    //   dataIndex: "createdDate",
    //   key: "createdDate",
    //   render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
    // },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      key: "updatedDate",
      render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
    },
    // {
    //   title: "Updated By",
    //   dataIndex: "updatedBy",
    //   key: "updatedBy",
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
           <Button type="link"
                       icon={ <EyeOutlined />}
                               onClick={() => showViewModal(record)}
                             style={{ backgroundColor: "#F0720B", borderColor: "#F0720B", color: "#fff" }}/>
                               
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this specification?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="primary" danger />
          </Popconfirm>
           
        </Space>
      ),
    },
  ];

  return (
    <Space
      direction="vertical"
      size="large"
      style={{
        width: "100%",
        padding: "0px",
        borderRadius: "10px",
      }}
    >
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 600 }}>
              Service Specs Master
            </span>
            <Space>
              <Input
                placeholder="Search Specs ID or Name"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchText}
                allowClear
                style={{ width: 250 }}
              />
               <Button onClick={() => setFiltersVisible(!filtersVisible)}>Filters</Button>

              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showModal}
              >
                Add Specs
              </Button>
             
            </Space>
          </div>
        }
        bordered
        style={{ borderRadius: 12 }}
        bodyStyle={{ paddingTop: 16 }}
        headStyle={{
          marginBottom: 0,
          paddingBottom: 8,
          paddingTop: 16,
          borderBottom: "none",
        }}
      >
        {filtersVisible && (
  <Form
    form={filterForm}
    layout="inline"
    onFinish={(values) => setFilterValues(values)}
    style={{ marginBottom: 16 }}
  >
    <Form.Item name="specsId" >
      <Input placeholder="Specs ID" allowClear />
    </Form.Item>
     <Form.Item name="serviceId" >
      <Input placeholder="Service ID" allowClear />
    </Form.Item>
    <Form.Item name="name">
      <Input placeholder="Name" allowClear />
    </Form.Item>
   
    <Form.Item>
      <Space>
        <Button type="primary" htmlType="submit">
          Apply
        </Button>
        {/* <Button
          onClick={() => {
            filterForm.resetFields();
            setFilterValues({});
          }}
        >
          Reset
        </Button> */}
      </Space>
    </Form.Item>
  </Form>
)}

        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 5 }}
         rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")}
          style={{ border: "none" }}
        />
      </Card>

      {/* Modal for Add Specs */}
     <Modal
  title={editMode ? "Edit Specs" : "Add New Specs"}
  visible={isModalVisible}
  onCancel={() => {
    setIsModalVisible(false);
    setEditMode(false);
    setEditingKey(null);
    form.resetFields();
  }}
  onOk={() => {
    form
      .validateFields()
      .then((values) => handleSubmit(values))
      .catch((info) => console.log("Validation failed:", info));
  }}
  okText={editMode ? "Update" : "Add"}
>
  <Form form={form} layout="vertical" name="specs_form">
    <Form.Item
      name="name"
      label="Specs Name"
      rules={[{ required: true, message: "Please enter Specs Name" }]}
    >
      <Input placeholder="Enter Specs Name" />
    </Form.Item>
    <Form.Item
      name="status"
      label="Status"
      rules={[{ required: true, message: "Please select status" }]}
    >
      <Select placeholder="Select Status">
        <Option value="Active">Active</Option>
        <Option value="Inactive">Inactive</Option>
      </Select>
    </Form.Item>
  </Form>
</Modal>

       <Modal
                title="Specs Master"
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
                    <div>
                      <strong>Updated By:</strong> {selectedRecord.updatedBy}
                    </div>
                  </Space>
                )}
              </Modal>
              
    </Space>
  );
};

export default SpecsMaster;
