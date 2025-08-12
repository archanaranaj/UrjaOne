import React from "react";
import { Form, Button, Upload, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const About = () => {
    const [form] = Form.useForm();
    const [content, setContent] = React.useState("");

    const onFinish = (values) => {
        console.log("Submitted:", { ...values, about: content });
        alert("Form submitted successfully!");
        form.resetFields();
        setContent("");
    };

    return (
        <Card title="Terms & Condition">
            {/* Inline style for CKEditor height */}
            <style>
                {`
                    .editor-wrapper .ck-editor__editable_inline {
                        min-height: 200px !important;
                        max-height: 200px !important;
                        overflow-y: auto;
                    }
                `}
            </style>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                encType="multipart/form-data"
            >
                <Form.Item label="Content" required>
                    <div className="editor-wrapper">
                        <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setContent(data);
                            }}
                        />
                    </div>
                </Form.Item>

              

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default About;