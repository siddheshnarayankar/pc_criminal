import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const AppLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [users, setUsers] = useState();
  const onCollapse = () => {
    console.log(collapsed);
    setCollapsed(!collapsed);
  };
  let user = JSON.parse(localStorage.getItem("user"));

  // useEffect(()=>{
  //   setUsers()
  // },[])

  return (
    <Layout
      style={{ minHeight: "100vh" }}
      className={`${!collapsed ? "" : "collapsed"}`}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          {collapsed ? (
            <span style={{ whiteSpace: "nowrap" }}>PC</span>
          ) : (
            <span style={{ whiteSpace: "nowrap" }}>P Criminal</span>
          )}
        </div>
        <Menu theme="dark" defaultSelectedKeys={["4"]} mode="inline">
          {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item> */}
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            icon={<UserOutlined />}
            title="प्रोफेशनल क्रिमिनल"
          >
            <Menu.Item key="3">आरोपी शोधा</Menu.Item>
            <Menu.Item key="4">
              <Link to="/ProfessionalForm">नवीन आरोपी समाविष्ट</Link>
            </Menu.Item>
          </SubMenu>
          {/* <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu> */}
        </Menu>
      </Sider>
      <Layout
        className="site-layout"
        className={`${!collapsed ? "" : "collapsed"}`}
      >
        <Header
          className="site-layout-background"
          style={{ padding: 0, position: "fixed" }}
          className={`${!collapsed ? "" : "collapsed"}`}
        >
          <Menu theme="dark" mode="horizontal">
           
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.userid}>
              <Menu.Item key="setting:1">Profile {users}</Menu.Item>
              <Menu.Item key="setting:2">
                <Link to="/login">Logout</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Header>
        <Content
          style={{ margin: "0 16px", paddingTop: "60px" }}
          className={`${!collapsed ? "" : "collapsed"}`}
        >
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb> */}
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {props.component}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©2021 Created by Imark Technology
        </Footer>
      </Layout>
    </Layout>
  );
};
