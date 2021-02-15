import React, { useEffect } from "react";
import {
  Drawer,
  Button,
  Radio,
  Space,
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  message,
} from "antd";
const { forwardRef, useRef, useImperativeHandle } = React;
import { UploadOutlined, StarOutlined } from "@ant-design/icons";
const { Option } = Select;
export const OtherInformation = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const onFinish = (values) => {
    props.otherInformationFiniesh(values);
    // props.otherInformationFiniesh(values);
    // form.resetFields();
  };

  useImperativeHandle(ref, () => ({
    onFinish() {
      form.submit();
    },
  }));
  useEffect(
    (res) => {
      if (props.otherInformationData && props.otherInformationData.length) {
        // setInputField(props.basicInformationData[0]);
        form.setFieldsValue({
          ...props.otherInformationData[0],
        });
      }
    },
    [props.otherInformationData[0]]
  );

  return (
    <div>
      <Form layout="vertical" hideRequiredMark onFinish={onFinish} form={form}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="isMemberOfGang"
              label="टोळीचा सदस्य आहे का?"
              rules={[{ message: "Please select value" }]}
            >
              <Select placeholder="Please select value">
                <Option value="0">होय</Option>
                <Option value="1">नाही</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="accusedBusiness"
              label="आरोपीचा व्यवसाय/उत्पनाचे साधन"
              rules={[{ message: "Please enter value" }]}
            >
              <Input placeholder="Please enter value" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="accusedFamilyMember"
              label="आरोपीचा कुंटूबातील सदस्य"
              rules={[{ message: "Please enter value" }]}
            >
              <Input placeholder="Please enter value" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="accusedAssets"
              label="आरोपीचा कुंटूबातील सदस्य"
              rules={[{ message: "Please enter value" }]}
            >
              <Input placeholder="Please enter value" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="accusedResidence"
              label="आरोपीचे वास्तव्याचे ठिकाण Lat & Long"
              rules={[{ message: "Please enter value" }]}
            >
              <Input placeholder="Please enter value" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="accusedJurisdiction"
              label="आरोपीचे गुन्हे करण्याचे कार्यक्षेत्र"
              rules={[{ message: "Please enter value" }]}
            >
              <Input placeholder="Please enter value" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="accusedCourtCaseNo"
              label="दाखल गुन्ह्यांचे कोर्ट केस नंबर"
              rules={[{ message: "Please enter value" }]}
            >
              <Input placeholder="Please enter value" />
            </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item
              name="accusedCourtDate"
              label="आरोपीच्या कोर्टातील तारखा"
              
            >
              {/* <DatePicker /> */}
            </Form.Item>
             
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="accusedjailStatus"
              label="आरोपी सध्या जेलमध्ये /बाहेर"
              rules={[{ message: "Please enter value" }]}
            >
              <Input placeholder="Please enter value" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="accusedVehicalDetails"
              label="आरोपीकडील वापरती वाहणे व त्यांचे Rto नंबर"
              rules={[{ message: "Please enter value" }]}
            >
              <Input placeholder="Please enter value" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="accusedLawyerDetails"
              label="आरोपीच्या वकीलांचे नाव पत्ता व मोबाईल नंबर"
              rules={[
                {
                  message: "please enter address",
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="please enter address" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="accusedIdentifyingOfficer"
              label="आरोपीला ओळखणारे पोलीस अधिकारी /कमेचारी(नांव,हुद्दा नेमणूक व मोबाईल नं"
              rules={[
                {
                  message: "please enter values",
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="please enter values" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="accusedSupportingleaders"
              label="सपोर्ट करणारे नेता / संघटना"
              rules={[
                {
                  message: "please enter values",
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="please enter values" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row gutter={24}>
        <Col span={12} style={{ marginBottom: "30px" }}>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>प्रोफेशनल आरोपी तपशील</Button>
          </Upload>
        </Col>
        <Col span={12} style={{ marginBottom: "30px" }}>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>
              आरोपीचा 5 फोटो व 2 हाताच्या ठसे
            </Button>
          </Upload>
        </Col>
      </Row>
    </div>
  );
});
