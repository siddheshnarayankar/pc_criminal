import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { professionalAction, userActions } from "../../_actions";
import { AppTable } from "../../_components/AppTable";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Divider,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UserForm } from "./UserForm";
const FormItem = Form.Item;
let columns = [];
let data = [];
class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isCreateUserDrawerVisible: false,
    isUpdate:false,
    userFormEditData:[],
    resetFrom:false
  };
  userForm = React.createRef();

  componentDidMount() {
    const { user } = this.props;
    this.props.dispatch(professionalAction.getCity());

    if (user.cityId && user.cityId) {
      this.props.dispatch(userActions.getAll(user.cityId, 2));
    } else if (user.role && user.role === "8") {
      this.props.dispatch(userActions.getAdminUsers(4));
    }

    // this.props.dispatch(professionalAction.getCity());

    if (user.role && user.role === "8") {
      // this.props.dispatch(professionalAction.getCity());
    } else if (user.role && user.role === "4") {
      this.props.dispatch(professionalAction.getDistrict(user.cityId, 1));
    }
  }

  onOpenCrateUserDrawer = () => {
    this.setState({
      isCreateUserDrawerVisible: true,
      resetFrom:true
    });
  };
  onCloseCrateUserDrawer = () => {
    this.setState({
      isCreateUserDrawerVisible: false,
      resetFrom:false
    });
  };


  onFormFinish = (values) => {
    const { user } = this.props;
    let ob = {
      ...values,
      role: user.role === "8" ? "4" : user.role === "4" ? "2" : null,
      stateId: "1",
      cityId:
        user.role === "8"
          ? values.cityId
          : user.role === "4"
          ? user.cityId
          : null,
    };
    this.props.dispatch(userActions.createUser(ob));
    this.onCloseCrateUserDrawer();
  };
  onFormUpdate = (values) =>{
    console.log(values)
  }
  getDistrictName = (id) => {
    const { basicDistricts } = this.props;
    if (basicDistricts && basicDistricts.length) {
      return _.filter(basicDistricts, function (o) {
        return o.id === id;
      })[0] &&  _.filter(basicDistricts, function (o) {
        return o.id === id;
      })[0].DistrictName;
    }
  };
  getCityName = (id) => {
    const { pc_cities } = this.props;
    if (pc_cities && pc_cities.length) {
      return _.filter(pc_cities, function (o) {
        return o.id === id;
      })[0].City;
    }
  };

  onEdituser = (data) => {
    this.setState((prevState) => ({
      isCreateUserDrawerVisible: true,
      isUpdate:true,
      userFormEditData:data
    }));
  };


  onUserFormSave = () =>{
      this.userForm.current.onFinish(true);
  }
  onUserFormUpdate = () =>{
    this.userForm.current.onFinish(false);
}

  render() {
    const { users } = this.props;
    const { user } = this.props;
    const { pc_cities, basicDistricts } = this.props;

    const requiredKeys = ["userid", "name", "city", "district", "phone"];
    if (users && users.users && users.users.length > 0) {
      let columns1 =
        users &&
        users.users &&
        users.users.map((itemObj, index) => {
          return {
            ...itemObj,
            key: index + 1,
            district: this.getDistrictName(itemObj.districtId),
            city: this.getCityName(itemObj.cityId),
          };
        });

      let tablelabes = columns1 && Object.keys(columns1[0]);

      let tableColumns = [];
      tablelabes.forEach((item) => {
        if (
          _.filter(requiredKeys, function (o) {
            return o === item;
          }).length
        ) {
          tableColumns.push(item);
        }
      });

      console.log(tableColumns);

      let columnList = tableColumns.map((item) => {
           return {
          title: item,
          dataIndex: item,
          key: item,
        };
      });

      data = columns1;
      columns = columnList;
    }
    return (
      <div className="col-md-6 col-md-offset-3">
        <Button
          type="primary"
          className="mb-4"
          onClick={this.onOpenCrateUserDrawer}
        >
          नवीन जोडा
        </Button>
        <Divider />
        <Drawer
          title="नवीन वापरकर्ता जोडा"
          placement="right"
          width={720}
          closable={true}
          onClose={this.onCloseCrateUserDrawer}
          visible={this.state.isCreateUserDrawerVisible}
          footer={
            <div
              style={{
                textAlign: "right",
              }}
            >
              <Button
                onClick={this.onCloseCrateUserDrawer}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
              {!this.state.isUpdate ? (
                <Button
                  onClick={this.onUserFormSave}
                  type="primary"
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={this.onUserFormUpdate}
                  type="primary"
                >
                  Update
                </Button>
              )}
            </div>
          }
        >
          <UserForm
            ref={this.userForm}
            user={user}
            cityData={pc_cities}
            districtData ={basicDistricts}
            onFormFinish = {this.onFormFinish}
            onFormUpdate = {this.onFormUpdate}
            userFormEditData= {this.state.userFormEditData}
            resetFrom= {this.state.resetFrom}
          ></UserForm>
        </Drawer>
        <AppTable
          onEdituser={this.onEdituser}
          data={data}
          columns={columns}
        ></AppTable>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication, professionals } = state;
  const { user } = authentication;
  const { pc_cities, basicDistricts } = professionals;
  return {
    user,
    users,
    pc_cities,
    basicDistricts,
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
