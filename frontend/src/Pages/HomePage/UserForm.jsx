import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const { forwardRef, useRef, useImperativeHandle } = React;
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
} from "antd";
const { Option } = Select;
export const UserForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [user, SetUser] = useState({});
  const [basicDistricts, SetBasicDistricts] = useState([]);
  const [pc_cities, SetPC_cities] = useState([]);
  const [isSave, setIsSave] = useState(null);
  useEffect(() => {
    SetUser(props.user);
  }, [props.user]);

  useEffect(() => {
     if(props.resetFrom && props.resetFrom){
      form.resetFields();
     }
  }, [props.resetFrom]);

  useImperativeHandle(ref, () => ({
    onFinish(flag) {
     setIsSave(flag);
      form.submit();
    },
  }));

  useEffect(() => {
    if (props.districtData && props.districtData.length) {
      SetBasicDistricts(props.districtData);
    }
    if (props.cityData && props.cityData.length) {
      SetPC_cities(props.cityData);
    }
  }, [props.cityData, props.districtData]);

  useEffect(() => {
    if (props.userFormEditData) {
        let val = props.userFormEditData;
        delete val.password;
      form.setFieldsValue({
        ...val
      });
    }
  }, [props.userFormEditData]);

  const onFinish = (values) => {
    if(isSave){
        props.onFormFinish(values);
      }else{
        props.onFormUpdate(values);
      }
     
  };

  console.log(basicDistricts);
  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="नाव"
            rules={[
              {
                required: true,
                message: "कृपया वापरकर्त्याचे नाव प्रविष्ट करा",
              },
            ]}
          >
            <Input placeholder="कृपया वापरकर्त्याचे नाव प्रविष्ट करा" />
          </Form.Item>
        </Col>
        {user && user.role && user.role === "8" ? (
          <Col span={12}>
            <Form.Item
              name="cityId"
              label="पोलीस चौकी"
              rules={[
                {
                  required: true,
                  message: "Please select  policestation",
                },
              ]}
            >
              <Select
                placeholder="Please select an City"
                rules={[{ required: true, message: "Please select an City" }]}
              >
                {pc_cities &&
                  pc_cities.length &&
                  pc_cities.map((res, index) => (
                    <Option key={index} value={res.id}>
                      {res.City}
                      {user.role}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        ) : user && user.role && user.role === "4" ? (
          <Col span={12}>
            <Form.Item
              name="districtId"
              label="पोलीस चौकी"
              rules={[
                {
                  required: true,
                  message: "Please select  policestation",
                },
              ]}
            >
              <Select
                placeholder="Please select an City"
                rules={[{ required: true, message: "Please select an City" }]}
              >
                {basicDistricts &&
                  basicDistricts.length &&
                  basicDistricts.map((res, index) => (
                    <Option key={index} value={res.id}>
                      {res.DistrictName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        ) : null}
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="userid"
            label="User Id"
            rules={[{ required: true, message: "Please Enter the User Id" }]}
          >
            <Input placeholder="Please Enter the User Id" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Mobile Number"
            rules={[{ required: true, message: "Please Enter the Mobile Number" }]}
          >
            <Input placeholder="Please Enter the Mobile Number" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please Enter the Password" }]}
          >
            <Input placeholder="Please Enter the Password" />
          </Form.Item>
        </Col>
      </Row>
      {/* <Row gutter={16}>
        <Col span={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row> */}
    </Form>
  );
});
