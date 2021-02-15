import React, { useEffect, useState } from "react";
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
import { KalamAndKayadTable } from "../FormsTable/KalamAndKayadTable";
const { Option } = Select;
export const GhunhaInfomation = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [kalamkayda, setKalamKyadaArr] = useState([]);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [kalams, setkalam] = useState([]);
  const [kayda, setkayda] = useState([]);
  const [district, seDistrict] = useState([]);
  const [status, SetStatus] = useState([]);
  const [crimeTitle, SetCrimeTitle] = useState([,]);

  const [citySelected, SetCitySelected] = useState(false);
  const [stateSelected, SetStateSelected] = useState(false);
  const [isKKButton, SetIsKKButton] = useState(false);
  const [isSave, setIsSave] = useState(null);
  const onFinish = (values) => {
    console.log("Success:", values);
    if(isSave){
      values.kalamAndkayda = [...kalamkayda];
      props.onGunhaFormFiniesh(values);
    }else{
      values.kalamAndkayda = [...kalamkayda];
      props.onGunhaFormUpdate(values);
    }
    form.resetFields();
  };


  useImperativeHandle(ref, () => ({
    onFinish(falg) {
      setIsSave(falg);
      form.submit();  
      // form.submit();
    },
  }));
  const addNewKalamKayda = () => {
    console.log(form.getFieldsValue().kalam);
    let ob = {
      rules: form.getFieldsValue().rules,
      kalam: form.getFieldsValue().kalam,
    };
    setKalamKyadaArr([
      ...kalamkayda,
      {
        ...ob,
      },
    ]);
  };

  useEffect(
    (res) => {
      if (
        props.dataStates &&
        props.dataStates.pc_countrystates &&
        props.dataStates.pc_countrystates
      ) {
        setStates([...props.dataStates.pc_countrystates]);
      }
      if (
        props.dataStates &&
        props.dataStates.pc_cities &&
        props.dataStates.pc_cities
      ) {
        setCities([...props.dataStates.pc_cities]);
      }
      if (
        props.dataStates &&
        props.dataStates.pc_acts &&
        props.dataStates.pc_acts
      ) {
        setkayda([...props.dataStates.pc_acts]);
      }
      if (
        props.dataStates &&
        props.dataStates.pc_status &&
        props.dataStates.pc_status
      ) {
        SetStatus([...props.dataStates.pc_status]);
      }
      if (
        props.dataStates &&
        props.dataStates.pc_crimetitles &&
        props.dataStates.pc_crimetitles
      ) {
        SetCrimeTitle([...props.dataStates.pc_crimetitles]);
      }
    },
    [props.dataStates]
  );
  useEffect(() => {
    form.resetFields();
    setKalamKyadaArr([]);
    setkalam([]);
    SetIsKKButton(false);
  }, [props.newGunha]);


  

  useEffect(
    (res) => {
      if (props.editData && props.editData.length && !props.newGunha) {
        // setInputField(props.basicInformationData[0]);
        console.log(props.editData)
        form.setFieldsValue({
            ...props.editData[0]
        })
        SetCitySelected(true);
        SetStateSelected(true);
        setKalamKyadaArr(props.editData[0].kalamAndkayda)
      }
    },
    [props.editData && props.editData]
  );
  useEffect(
    (res) => {
      if (props.dataStates && props.dataStates.gunhaDistricts) {
        // setInputField(props.basicInformationData[0]);
        seDistrict([...props.dataStates.gunhaDistricts]);
      }
    },
    [props.dataStates && props.dataStates.gunhaDistricts]
  );

  useEffect(
    (res) => {
      if (props.dataStates && props.dataStates.pc_kalams) {
        // setInputField(props.basicInformationData[0]);
        setkalam([...props.dataStates.pc_kalams]);
        // SetIsKKButton(true);
      }
    },
    [props.dataStates && props.dataStates.pc_kalams]
  );

  const onStateChange = (value) => {
    SetStateSelected(true);
  };
  const clearDistrictSelected = () => {
    form.resetFields(["district"]);
  };
  const onCityChange = (value) => {
    clearDistrictSelected();
    SetCitySelected(true);
    props.onCityChange(value, 2);
  };

  const loadMore = (value) => {
    console.log("test", value);
  };

  const onkaydaChange = (value) => {
    clearKalamSelected();
    
    props.onKaydaChange(value);
  };
  const clearKalamSelected = () => {
    SetIsKKButton(false);
    form.resetFields(["kalam"]);
    // SetIsKKButton(true);
  };

  return (
    <div>
      <Form layout="vertical" hideRequiredMark onFinish={onFinish} form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="state"
              label="गुन्हाचे राज्य"
              rules={[{ required: true, message: "Please select an state" }]}
            >
              <Select
                placeholder="Please select an state"
                onChange={onStateChange}
              >
                {states &&
                  states.length &&
                  states.map((res, index) => (
                    <Option key={index} value={res.id}>
                      {res.state}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="city"
              label="गुन्हाचे जिल्हा"
              rules={[{ required: true, message: "Please enter user city" }]}
            >
              <Select
                placeholder="Search to Select"
                optionFilterProp="children"
                onChange={onCityChange}
                disabled={!stateSelected}
                onPopupScroll={loadMore}
                placeholder="Please select an state"
              >
                {cities &&
                  cities.length &&
                  cities.map((res, index) => (
                    <Option key={index} value={res.id}>
                      {res.City}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="district"
              label="गुन्हाचे पोलीस ठाणे"
              rules={[
                { required: true, message: "Please enter user district" },
              ]}
            >
              <Select
                optionFilterProp="children"
                disabled={!citySelected}
                placeholder="Please select an district"
              >
                {district &&
                  district.length &&
                  district.map((res, index) => (
                    <Option key={index} value={res.id}>
                      {res.DistrictName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="registernumber"
              label="गु.र.नंबर"
              rules={[
                { required: true, message: "Please enter user registernumber" },
              ]}
            >
              <Input placeholder="Please enter user registernumber" />
            </Form.Item>
          </Col>
          <Col span={8}>
            {/* <Form.Item
              name="dateTime"
              label="गुन्हा दाखल दिनांक"
              rules={[
                { required: true, message: "Please choose the dateTime" },
              ]}
            >
              <DatePicker  />
            </Form.Item> */}
          </Col>
          <Col span={8}>
            <Form.Item
              name="heading"
              label="शिर्षक"
              rules={[{ required: true, message: "Please select an heading" }]}
            >
              <Select
                placeholder="Please select an heading"
                onChange={onStateChange}
              >
                {crimeTitle &&
                  crimeTitle.length &&
                  crimeTitle.map((res, index) => (
                    <Option key={index} value={res.id}>
                      {res.crime_title}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="status"
              label="सद्धस्थिती"
              rules={[{ required: true, message: "Please select an status" }]}
            >
              <Select
                placeholder="Please select an status"
                onChange={onStateChange}
              >
                {status &&
                  status.length &&
                  status.map((res, index) => (
                    <Option key={index} value={res.id}>
                      {res.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="rules"
              label="कायदा"
              rules={[{ required: true, message: "Please select an rules" }]}
            >
              <Select
                placeholder="Please select an rules"
                onChange={onkaydaChange}
              >
                {kayda &&
                  kayda.length &&
                  kayda.map((res, index) => (
                    <Option key={index} value={res.act_cd}>
                      {res.kayda}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="kalam"
              label="कलम"
              rules={[{ required: true, message: "Please select an kalam" }]}
            >
              <Select
                placeholder="Please select an kalam" onChange ={() => { SetIsKKButton(true)}}
              >
                {kalams &&
                  kalams.length &&
                  kalams.map((res, index) => (
                    <Option key={index} value={res.id}>
                      {res.section} - {res.section_desc}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item>
              <Button
                style={{ marginTop: "30px" }}
                type="button"
                disabled={!isKKButton}
                onClick={addNewKalamKayda}
              >
                कायदा आणि कलम जोडा
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}></Col>
        </Row>
        {/* <Row>
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row> */}
      </Form>
      {kalamkayda && kalamkayda.length ? (
        <KalamAndKayadTable data={kalamkayda} professionals={props.dataStates}></KalamAndKayadTable>
      ) : null}
    </div>
  );
});
