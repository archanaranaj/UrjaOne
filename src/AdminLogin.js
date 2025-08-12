import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    // ✅ Simulating login (in real apps, verify credentials with API)
    if (values.username === "admin" && values.password === "1234") {
      localStorage.setItem("isAuthenticated", "true");  // ✅ Store login state
      navigate("/"); // ✅ Redirect to home
    } else {
      alert("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#ff4d4f"
    }}>
      <Card title="Admin Login" style={{ width: 400, margin: "100px auto", padding: 20, boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
        <Form onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: "Enter username" }]}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Enter password" }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>Login</Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;