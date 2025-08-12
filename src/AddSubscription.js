


import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Row,
  Col,
  Typography,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";

const { Option } = Select;
const { Title } = Typography;
const formItemStyle = { marginBottom: 10 };

const AddSubscription = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    message.success("Subscription plan added!");
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: 8 }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <Button
          type="text"
          icon={<ArrowBackIos style={{ fontSize: 20 }} />}
          onClick={() => navigate(-1)}
          style={{ padding: 0 }}
        />
        <Title level={4} style={{ margin: 0, marginLeft: 8 }}>
          Add Subscription Plan
        </Title>
      </div>

      <Form
        form={form}
        layout="horizontal"
        labelAlign="left"
        onFinish={handleSubmit}
   labelCol={{
  xs: { span: 24 },
  sm: { flex: "0 0 40%" },
  md: { flex: "0 0 40%" },
}}
wrapperCol={{
  xs: { span: 24 },
  sm: { flex: "0 0 55%" },
  md: { flex: "0 0 55%" },
}}


      >
        <Row gutter={[24, 24]}>
          {/* Column 1 */}
          <Col xs={24} md={8}>
            <Form.Item
              label="Plan Name"
              name="planName"
              style={formItemStyle}
              labelWrap={false} 
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Plan Sequence"
              name="planSequence"
              style={formItemStyle}
              labelWrap={false}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Status" name="status" labelWrap={false}  style={formItemStyle} >
              <Select>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>
             <Form.Item label="Business Listing" name="businessListing" labelWrap={false}  style={formItemStyle}>
              <Select>
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Dedicated Page" name="dedicatedPage" labelWrap={false}  style={formItemStyle}>
              <Select>
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Leads Category" name="leadsCategory" labelWrap={false}  style={formItemStyle}>
              <Select mode="multiple">
                <Option value="consumer">Consumer</Option>
                <Option value="commercial">Commercial</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Leads Count" name="leadsCount" labelWrap={false} style={formItemStyle}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Leads Region" name="leadsRegion" labelWrap={false}  style={formItemStyle}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            
          </Col>

          {/* Column 2 */}
          <Col xs={24} md={8}>
           <Form.Item label="Category Allowed" name="categoryAllowed" labelWrap={false}  style={formItemStyle}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Solar Plants Data" name="solarPlantsData" labelWrap={false}  style={formItemStyle}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Consumers List" name="consumersList" labelWrap={false}  style={formItemStyle}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Premium Listing" name="premiumListing" labelWrap={false}  style={formItemStyle}>
              <Select>
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Verified Badge" name="verifiedBadge" labelWrap={false}  style={formItemStyle}>
              <Select>
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Premium Support" name="premiumSupport" labelWrap={false}  style={formItemStyle}>
              <Select>
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Chat" name="chat" labelWrap={false}  style={formItemStyle}>
              <Select>
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Leads Whatsapp" name="leadsWhatsapp" labelWrap={false}  style={formItemStyle}>
              <Select>
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
           
          </Col>

          {/* Column 3 */}
          <Col xs={24} md={8}>
           <Form.Item label="Online Catalogue" name="onlineCatalogue" labelWrap={false}  style={formItemStyle}>
              <Select>
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Qtr Price" name="qtrPrice" labelWrap={false} style={formItemStyle}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="HY Price" name="hyPrice" labelWrap={false}  style={formItemStyle}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Year Price" name="yearPrice" labelWrap={false}  style={formItemStyle}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Qtr Discount" name="qtrPriceDiscount" labelWrap={false}  style={formItemStyle}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="HY Discount" name="hyPriceDiscount" labelWrap={false}  style={formItemStyle}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Year Discount" name="yearPriceDiscount" labelWrap={false}  style={formItemStyle}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="GST (%)" name="gst" labelWrap={false}  style={formItemStyle}>
              <InputNumber style={{ width: "100%" }} min={0} max={100} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "right", marginBottom: 12 }}>
          <Button type="primary" htmlType="submit">
            Submit Plan
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSubscription;
