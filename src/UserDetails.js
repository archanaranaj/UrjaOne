
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Image, Button, Space,  Typography } from "antd";
import {  ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { ArrowBackIos } from "@mui/icons-material";

const { Title } = Typography;

const sampleUsers = [
  {
    key: 1,
    name: "John Doe",
    email: "john@example.com",
    mobile: "1234567890",
    plants: [
      {
        key: 101,
        plantAddress: "Address 1",
        plantType: "On Grid",
        plantSize: "250",
        structureType: "RCC Structure",
        installationYear: 2025,
        plantCategory: "Residential",
        plantStatus: "Working",
        panelMake: "Panel A",
        currentStatus: "Under Repair",
        inverterMake: "Inverter X",
        plantImages: [
          "/solar1.jpg",
          "/solar2.jpg",
        ],
        createdDate: dayjs().subtract(5, "day").format("YYYY-MM-DD"),
        updatedDate: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
        status: "Active",
      },
    ],
  },
  {
    key: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    mobile: "0987654321",
    plants: [
      {
        key: 102,
        plantAddress: "Address 2",
        plantType: "Hybrid",
        plantSize: "500",
        structureType: "Ground Mounted",
        installationYear: 2024,
        plantCategory: "Commercial",
        plantStatus: "Damaged",
        panelMake: "Panel B",
        currentStatus: "Under Repair",
        inverterMake: "Inverter Y",
        plantImages: ["/public/solar1.jpg"],
        createdDate: dayjs().subtract(10, "day").format("YYYY-MM-DD"),
        updatedDate: dayjs().subtract(2, "day").format("YYYY-MM-DD"),
        status: "Active",
      },
    ],
  },
];

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = sampleUsers.find((u) => String(u.key) === userId);
    setUser(foundUser || null);
  }, [userId]);

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
        <p>User not found</p>
      </div>
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", padding: "0px 0px 0px 0", borderRadius: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Button
      type="text"
      icon={<ArrowBackIos style={{ fontSize: 20 }} />}
      onClick={() => navigate(-1)}
      style={{ padding: 0 }}
    />

        <Title level={4} style={{ margin: 0 }}>Details</Title>
      </div>

      <Card style={{ position: "relative" }} bodyStyle={{ paddingTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Title level={5} style={{ marginBottom: 0 }}>{user.name}</Title>
          {/* <Tag
            color="green"
            style={{
              fontSize: 14,
              padding: "4px 12px",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
            icon={<CheckOutlined />}
          >
            Active
          </Tag> */}
        </div>

        <Space direction="vertical" size="small" style={{ marginTop: 12 }}>
          <div><strong>Email:</strong> <span style={{ color: "#555" }}>{user.email}</span></div>
          <div><strong>Mobile:</strong> <span style={{ color: "#555" }}>{user.mobile}</span></div>
        </Space>
      </Card>

      {user.plants.length === 0 && <p>No solar plants registered.</p>}

      {user.plants.map((plant) => (
        <Card
          key={plant.key}
          title="Solar Plant Registration Details"
          bordered
          style={{ borderRadius: 12 }}
        headStyle={{ marginBottom: 0, paddingBottom: 8, paddingTop: 16 }}

        >
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Plant Address">{plant.plantAddress}</Descriptions.Item>
            <Descriptions.Item label="Plant Type">{plant.plantType}</Descriptions.Item>
            <Descriptions.Item label="Plant Size">{plant.plantSize}</Descriptions.Item>
            <Descriptions.Item label="Structure Type">{plant.structureType}</Descriptions.Item>
            <Descriptions.Item label="Installation Year">{plant.installationYear}</Descriptions.Item>
            <Descriptions.Item label="Plant Category">{plant.plantCategory}</Descriptions.Item>
            <Descriptions.Item label="Plant Status">{plant.plantStatus}</Descriptions.Item>
            <Descriptions.Item label="Panel Make">{plant.panelMake || "-"}</Descriptions.Item>
            <Descriptions.Item label="Current Status">{plant.currentStatus}</Descriptions.Item>
            <Descriptions.Item label="Inverter Make">{plant.inverterMake || "-"}</Descriptions.Item>
            <Descriptions.Item label="Plant Images">
              {plant.plantImages && plant.plantImages.length > 0 ? (
                <div style={{ display: "flex", gap: 12 }}>
                  {plant.plantImages.map((url, idx) => (
                    <Image
                      key={idx}
                      src={url}
                      alt={`Plant Image ${idx + 1}`}
                      width={150}
                      style={{ borderRadius: 4 }}
                      preview={{ mask: <div>Preview</div> }}
                    />
                  ))}
                </div>
              ) : (
                "-"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Created Date">{plant.createdDate}</Descriptions.Item>
            <Descriptions.Item label="Updated Date">{plant.updatedDate}</Descriptions.Item>
            <Descriptions.Item label="Status">{plant.status}</Descriptions.Item>

          </Descriptions>
        </Card>
      ))}
    </Space>
  );
};

export default UserDetails;
