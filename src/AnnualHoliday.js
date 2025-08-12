import React, { useState } from "react";
import {
  Table,
  Tag,
  Input,
  Button,
  Card,
  Typography,
  Space,
  Modal,
  Form,
  message,
  DatePicker,
} from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title } = Typography;

const initialData = [
  {
    key: 1,
    holiday_id: "098765",
    year: "2023",
    holiday_name: "Republic Day",
    holiday_dt: "2023-01-01",
    createdDate: "2024-07-01T10:00:00",
    updatedDate: "2024-07-20T12:30:00",
    updatedBy: "admin001",
  },
  {
    key: 2,
    holiday_id: "987654",
    year: "2022",
    holiday_name: "New Year",
    holiday_dt: "2022-01-01",
    createdDate: "2024-06-15T09:20:00",
    updatedDate: "2024-07-15T15:45:00",
    updatedBy: "admin002",
  },
];

const AnnualHoliday = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
const [viewModalVisible, setViewModalVisible] = useState(false);
 const [selectedRecord, setSelectedRecord] = useState(null);
 const [editMode, setEditMode] = useState(false); // ✅
const [editingRecord, setEditingRecord] = useState(null); // ✅

 const showViewModal = (record) => {
   setSelectedRecord(record);
   setViewModalVisible(true);
 };
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter(
      (item) =>
        item.holiday_id.toLowerCase().includes(value.toLowerCase()) ||
        item.holiday_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const showAddModal = () => {
  setEditMode(false); // ✅ Add this
  form.resetFields();
  setIsModalVisible(true);
};
const showEditModal = (record) => {
  setEditMode(true); // ✅
  setEditingRecord(record); // ✅
  form.setFieldsValue({
    holiday_name: record.holiday_name,
    year: record.year,
    holiday_dt: dayjs(record.holiday_dt),
  });
  setIsModalVisible(true);
};


  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

 const handleFormSubmit = (values) => {
  const updatedDate = new Date().toISOString();

  if (editMode && editingRecord) {
    const updatedList = data.map((item) =>
      item.key === editingRecord.key
        ? {
            ...item,
            holiday_name: values.holiday_name,
            year: values.year,
            holiday_dt: values.holiday_dt.format("YYYY-MM-DD"),
            updatedDate,
            updatedBy: "admin",
          }
        : item
    );
    setData(updatedList);
    setFilteredData(updatedList);
    message.success("Holiday updated successfully.");
  } else {
    const newId = String(Math.floor(100000 + Math.random() * 900000));
    const newHoliday = {
      key: data.length + 1,
      holiday_id: newId,
      year: values.year,
      holiday_name: values.holiday_name,
      holiday_dt: values.holiday_dt.format("YYYY-MM-DD"),
      createdDate: updatedDate,
      updatedDate: updatedDate,
      updatedBy: "admin",
    };

    const updatedData = [...data, newHoliday];
    setData(updatedData);
    setFilteredData(updatedData);
    message.success("Holiday added successfully.");
  }

  form.resetFields();
  setIsModalVisible(false);
};


  //   const updatedData = [...data, newHoliday];
  //   setData(updatedData);
  //   setFilteredData(updatedData);
  //   message.success("Holiday added successfully.");
  //   form.resetFields();
  //   setIsModalVisible(false);
  // };

  const columns = [
    {
      title: "Holiday ID",
      dataIndex: "holiday_id",
      key: "holiday_id",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Holiday Name",
      dataIndex: "holiday_name",
      key: "holiday_name",
    },
    {
      title: "Holiday Date",
      dataIndex: "holiday_dt",
      key: "holiday_dt",
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
        onClick={() => showEditModal(record)}
        type="primary"
       
      />
      
    </Space>
  ),
},

  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", padding: 0 }}>
      <Card
        title={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 20, fontWeight: 600 }}>Annual Holiday</span>
            <Space>
              <Input
                placeholder="Search Holiday ID or Name"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchText}
                allowClear
                style={{ width: 250 }}
              />
              <Button icon={<PlusOutlined />} type="primary" onClick={showAddModal}>
                Add Holiday
              </Button>
            </Space>
          </div>
        }
        bordered
        style={{ borderRadius: 12 }}
        bodyStyle={{ paddingTop: 16 }}
        headStyle={{ marginBottom: 0, paddingBottom: 8, paddingTop: 16, borderBottom: "none" }}
      >
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowClassName={(_, index) => (index % 2 === 0 ? "table-row-white" : "table-row-gray")}
          style={{ border: "none" }}
        />
      </Card>

      {/* Modal Form */}
      <Modal
        title="Add Holiday"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="holiday_name"
            label="Holiday Name"
            rules={[{ required: true, message: "Please enter holiday name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="year"
            label="Year"
            rules={[{ required: true, message: "Please enter year" }]}
          >
            <Input placeholder="e.g. 2025" />
          </Form.Item>
          <Form.Item
            name="holiday_dt"
            label="Holiday Date"
            rules={[{ required: true, message: "Please select holiday date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
       <Modal
                      title="Annual Holiday"
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

export default AnnualHoliday;
