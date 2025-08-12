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
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const initialData = [
  {
    key: 1,
    unitId: "VND001",
    name: "2023",
    status: "Active",
    createdDate: "2024-07-01T10:00:00",
    updatedDate: "2024-07-20T12:30:00",
    updatedBy: "admin001",
  },
  {
    key: 2,
    unitId: "VND002",
    name: "2022",
    status: "Inactive",
    createdDate: "2024-06-15T09:20:00",
    updatedDate: "2024-07-15T15:45:00",
    updatedBy: "admin002",
  },
];

const UnitMaster = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(initialData);
  // const [filteredData, setFilteredData] = useState(initialData);
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
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter(
      (unit) =>
        unit.unitId.toLowerCase().includes(value.toLowerCase()) ||
        unit.name.toLowerCase().includes(value.toLowerCase())
    );
    // setFilteredData(filtered);
  };
const filteredData = data.filter((unit) => {
  const matchesSearch =
    unit.unitId.toLowerCase().includes(searchText.toLowerCase()) ||
    unit.name.toLowerCase().includes(searchText.toLowerCase());

  const matchesFilterUnitId = filterValues.unitId
    ? unit.unitId.toLowerCase().includes(filterValues.unitId.toLowerCase())
    : true;

  const matchesFilterName = filterValues.name
    ? unit.name.toLowerCase().includes(filterValues.name.toLowerCase())
    : true;

  return matchesSearch && matchesFilterUnitId && matchesFilterName;
});

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
    // Editing existing record
    const newData = data.map((item) =>
      item.key === editingKey
        ? {
            ...item,
            name: values.name,
            status: values.status,
            updatedDate: new Date().toISOString(),
            updatedBy: "currentUser",
          }
        : item
    );
    setData(newData);
    message.success("Unit updated successfully");
  } else {
    // Adding new record
    const newKey = data.length ? Math.max(...data.map((item) => item.key)) + 1 : 1;
    const newUnit = {
      key: newKey,
      unitId: `VND${String(newKey).padStart(3, "0")}`, // auto-generate ID
      name: values.name,
      status: values.status,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      updatedBy: "currentUser",
    };
    setData([...data, newUnit]);
    message.success("Unit added successfully");
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
    message.success("Unit deleted successfully.");
  };

  const columns = [
    {
      title: "Unit ID",
      dataIndex: "unitId",
      key: "unitId",
    },
    {
      title: "Unit Name",
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
            title="Are you sure you want to delete this unit?"
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
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
     <Card
  title={
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <span style={{ fontSize: 20, fontWeight: 600 }}>Service Unit Master</span>
      <Space wrap>
        <Input
          placeholder="Search Unit ID or Name"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchText}
          allowClear
          style={{ width: 250 }}
        />
        <Button onClick={() => setFiltersVisible(!filtersVisible)}>Filters</Button>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add Unit
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
    onFinish={(values) => {
      setFilterValues(values);
    }}
    style={{ marginBottom: 16 }}
  >
    <Form.Item name="unitId" >
      <Input placeholder="Unit ID" allowClear />
    </Form.Item>

    <Form.Item name="name" >
      <Input placeholder="Unit Name" allowClear />
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
        />
      </Card>

      {/* Add Unit Modal */}
     <Modal
  title={editMode ? "Edit Unit" : "Add New Unit"}
  visible={isModalVisible}
  onCancel={() => {
    setIsModalVisible(false);
    form.resetFields();
    setEditMode(false);
    setEditingKey(null);
  }}
  onOk={() => {
    form
      .validateFields()
      .then((values) => handleSubmit(values))
      .catch((info) => console.log("Validate Failed:", info));
  }}
  okText={editMode ? "Update" : "Add"}
>
  <Form form={form} layout="vertical" name="unit_form">
    <Form.Item
      name="name"
      label="Unit Name"
      rules={[{ required: true, message: "Please enter unit name" }]}
    >
      <Input placeholder="Enter Unit Name" />
    </Form.Item>
    <Form.Item
      name="status"
      label="Status"
      rules={[{ required: true, message: "Please enter status" }]}
    >
      <Input placeholder="Active or Inactive" />
    </Form.Item>
  </Form>
</Modal>

       <Modal
                title="Unit Master"
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

export default UnitMaster;
