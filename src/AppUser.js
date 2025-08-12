
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Radio,
  DatePicker,
  Select,
  Upload,
  Row,
  Col,
  message,
  Space,
} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  UploadOutlined,
  ReloadOutlined,
  SearchOutlined,
  FilterOutlined,
  FileExcelOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import axios from "axios";

const { Option } = Select;
const { confirm } = Modal;

const AppUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [mobileFilter, setMobileFilter] = useState("");
  const [statusDropdownFilter, setStatusDropdownFilter] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState([]);

  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
const params = new URLSearchParams();
// append all filters

const baseURL = process.env.REACT_APP_API_BASE_URL; // from .env
  // Get token from localStorage (or your auth storage)
  const token = localStorage.getItem("token");

  // Fetch users from API with filters
const fetchUsers = async (filters = {}) => {
  try {
    // Prepare query params
    const params = new URLSearchParams();

    if (filters.name) params.append("name", filters.name);
    if (filters.email) params.append("email", filters.email);
    if (filters.mobile) params.append("mobile", filters.mobile);

    // Map status from active/inactive to 1/0 or empty string
    if (filters.statusDropdownFilter) {
      params.append(
        "status",
        filters.statusDropdownFilter === "active"
          ? "1"
          : filters.statusDropdownFilter === "inactive"
          ? "0"
          : ""
      );
    }

    const url = `${baseURL}/admin/user?${params.toString()}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      const apiUsers = response.data.data.data.map((user, index) => ({
        key: index + 1,
        userId: user.user_id,
        name: user.user_name,
        mobile: user.mobile,
        email: user.email,
        gender: user.gender || "",
        language: user.language,
        creationDate: "",
        updationDate: user.updation_date,
        status: user.status_code === 1 ? "active" : "inactive",
        photo: user.photo,
      }));

      setUsers(apiUsers);
      setFilteredUsers(apiUsers);
    } else {
      message.error("Failed to fetch users");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    message.error("Error fetching users");
  }
};

  // Initial fetch and when filters change
  useEffect(() => {
    fetchUsers({
      name: nameFilter,
      email: emailFilter,
      mobile: mobileFilter,
      statusDropdownFilter,
    });
  }, [nameFilter, emailFilter, mobileFilter, statusDropdownFilter]);

  // Reload clears filters and fetches again
  const handleReload = () => {
    setSearchTerm("");
    setStatusFilter("");
    setNameFilter("");
    setEmailFilter("");
    setMobileFilter("");
    setStatusDropdownFilter("");
    setDateRangeFilter([]);
    fetchUsers({});
  };
  const filtersStyle = {
  maxHeight: filtersVisible ? 240 : 0,
  overflow: "hidden",
  transition: "max-height 0.4s ease",
  background: "#f9f9f9",
  padding: filtersVisible ? "16px" : "0 16px",
  marginBottom: filtersVisible ? 16 : 0,
  borderRadius: 4,
};


  // Optional: Function to update user status (active/inactive/delete)
  const updateUserStatus = async (userId, newStatus) => {
    try {
      const response = await axios.put(
        `${baseURL}/admin/user/${userId}/status`,
        { status: newStatus.toString() }, // status as string: "0","1","2"
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        message.success(response.data.message || "Status updated");
        // Refresh list after update
        fetchUsers({
          name: nameFilter,
          email: emailFilter,
          mobile: mobileFilter,
          statusDropdownFilter,
        });
      } else {
        message.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Error updating status");
    }
  };

  // ... rest of your existing code, filters, modals, exportToExcel, etc.

  // Table columns, mapping status color tag
  const columns = [
    { title: "User ID", dataIndex: "userId" },
    { title: "User Name", dataIndex: "name" },
    { title: "Mobile", dataIndex: "mobile" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (gender) =>
        gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "",
    },
    { title: "Language", dataIndex: "language" },
    {
      title: "Photo",
      dataIndex: "photo",
      render: (photo) =>
        photo ? (
          <img
            src={photo}
            alt="User"
            style={{ width: 40, height: 40, borderRadius: "50%" }}
          />
        ) : (
          "N/A"
        ),
    },
    { title: "Updation Date", dataIndex: "updationDate" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag
          style={{
            backgroundColor: status === "active" ? "#2fb344" : "#d63939",
            color: "#ffffff",
            border: "none",
            textTransform: "capitalize",
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => navigate("/viewappuser", { state: { record } })}
            icon={<EyeOutlined />}
            style={{
              backgroundColor: "#F0720B",
              borderColor: "#F0720B",
              color: "#fff",
            }}
          />
          {/* Example: Add a delete button to mark user deleted */}
         <Button
        type="primary"
        icon={<DeleteOutlined />}
        danger
        onClick={() => {
          confirm({
            title: 'Are you sure you want to delete this user?',
            content: `"${record.name}" will be permanently deleted.`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
              updateUserStatus(record.userId, 2);
            },
            onCancel() {
              // Optional: console.log('Cancel delete');
            },
          });
        }}
        style={{ marginLeft: 8 }}
      />
        </Space>
      ),
    },
  ];

  // Your filtersStyle and other existing UI code remain unchanged here.

  // Your exportToExcel and modal logic remains the same, no change needed there.

  return (
    <>
      <div
        style={{ background: "#fff", padding: "24px", borderRadius: "8px" }}
      >
        {/* <h2 style={{ marginBottom: 16 }}>
          <b>User Master</b>
        </h2> */}

        {/* Table Controls Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            paddingBottom: "8px",
          }}
        >
          {/* Title */}
          <h2 style={{ margin: 0, whiteSpace: "nowrap" }}>
            <b>User Master</b>
          </h2>

          <Space wrap size="small" style={{ flexWrap: "wrap" }}>
            <Button
              icon={<FilterOutlined />}
              onClick={() => setFiltersVisible(!filtersVisible)}
            >
              Filters
            </Button>

            <Input
              placeholder="Search by Name or Email"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                // Filter filteredUsers based on searchTerm locally
                const value = e.target.value.toLowerCase();
                setFilteredUsers(
                  users.filter(
                    (user) =>
                      user.name.toLowerCase().includes(value) ||
                      user.email.toLowerCase().includes(value)
                  )
                );
              }}
              prefix={<SearchOutlined />}
              allowClear
              style={{
                minWidth: 150,
                maxWidth: 300,
                flexGrow: 1,
                maxHeight: 40,
              }}
            />

            <Button icon={<ReloadOutlined />} onClick={handleReload}>
              Reload
            </Button>

            <Button
              icon={<FileExcelOutlined />}
              onClick={() => {
                // Call your exportToExcel function here, no change needed
              }}
              type="primary"
              style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
            >
              Export to Excel
            </Button>
          </Space>
        </div>

        {/* Filters Panel (unchanged) */}
        {filtersVisible && (
          <div style={filtersStyle}>
            {/* Your existing filters inputs (nameFilter, emailFilter, mobileFilter, statusDropdownFilter, dateRangeFilter) */}
            {/* Use your applyFilters function to call fetchUsers with updated filters if needed */}
          </div>
        )}

        {/* Data Table */}
        <Table
          columns={columns}
          dataSource={filteredUsers}
          pagination={{ pageSize: 5 }}
          rowClassName={(_, index) =>
            index % 2 === 0 ? "table-row-white" : "table-row-gray"
          }
          scroll={{ x: "max-content" }}
        />
      </div>

      {/* Modal for Add/Edit (unchanged) */}
      {/* ...Your existing modal code here... */}
    </>
  );
};

export default AppUser;
