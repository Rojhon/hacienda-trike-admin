/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { Component } from "react";
import { signUp } from "../api/AuthController";
import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  message
} from "antd";

function onChange(checked) {
  console.log(`switch to ${checked}`);
}

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const SignUp = () => {

  const onFinish = async (values) => {
    message.loading("Loading...", 0)
    try {
      const response = await signUp(values)

      if (response?.status == 200) {
        message.destroy()
        message.success("Success!")
      } else {
        message.destroy()
        message.error(response?.data)
      }
    } catch (error) {

    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Layout className="layout-default">
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col>
              <Title className="mb-15">Register</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your email and password to sign in
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input placeholder="Username" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Full Name"
                  name="full_name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Full Name!",
                    },
                  ]}
                >
                  <Input placeholder="Full Name" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    SIGN UP
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  <Link to="/sign-in" className="text-dark font-bold">
                    Sign In
                  </Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Content>
        {/* <Footer>
            <p className="copyright">
              {" "}
              Copyright © 2021 Muse by <a href="#pablo">Creative Tim</a>.{" "}
            </p>
          </Footer> */}
      </Layout>
    </>
  );
}

export default SignUp