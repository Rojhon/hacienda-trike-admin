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
import React, { useState, useEffect } from "react";
import { signIn } from "../api/AuthController";
import { Link, useHistory } from "react-router-dom";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  message
} from "antd";

const { Title } = Typography;
const { Content } = Layout;

const SignIn = () => {
  const history = useHistory();
  const [isLoading, setIsloading] = useState(true)
  const [rememberMe, setRememberMe] = useState(true)
  const [account, setAccount] = useState({})

  useEffect(() => {
    if (localStorage.getItem("remember_me")) {
      const rememberMeValue = JSON.parse(localStorage.getItem("remember_me"))
      setRememberMe(rememberMeValue)

      if (rememberMeValue && localStorage.getItem("account")) {
        setAccount(JSON.parse(localStorage.getItem("account")))
      }

      setIsloading(false)
    } else {
      setRememberMe(false)
      setIsloading(false)
    }
  }, [])

  const handleSignIn = async (values) => {
    message.loading("Loading...", 0)
    localStorage.removeItem("account")
    try {
      const response = await signIn(values)

      if (response?.status == 200) {
        message.destroy()
        message.success("Success!")

        if (rememberMe) {
          localStorage.setItem("remember_me", true)
          localStorage.setItem("account", JSON.stringify(response?.data))
        }

        localStorage.setItem("username", response?.data?.username)
        history.push("/home")

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

  const onChange = (checked) => {
    localStorage.setItem("remember_me", JSON.stringify(checked))
    setRememberMe(checked)

    if (!checked) {
      localStorage.clear()
    }
  }

  return (
    <>
      {
        !isLoading ?
          <Layout className="layout-default">
            <Content className="signin">
              <Row gutter={[24, 0]} justify="space-around">
                <Col>
                  <Title className="mb-15">Admin<p>Haciendatrike</p></Title>
                  <Title className="font-regular text-muted" level={5}>
                    Enter your email and password to sign in
                  </Title>
                  <Form
                    onFinish={handleSignIn}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    className="row-col"
                    initialValues={
                      account
                    }
                  >
                    <Form.Item
                      className="username"
                      label="Username"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Username!",
                        },
                      ]}
                    >
                      <Input placeholder="Username" />
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

                    <Form.Item
                      className="aligin-center"
                      valuePropName="checked"
                    >
                      <Switch checked={rememberMe} onChange={onChange} />
                      Remember me
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}
                      >
                        SIGN IN
                      </Button>
                    </Form.Item>
                    {/* <p className="font-semibold text-muted">
                      Don't have an account?{" "}
                      <Link to="/sign-up" className="text-dark font-bold">
                        Sign Up
                      </Link>
                    </p> */}
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
          </Layout> : ""
      }
    </>
  );
}

export default SignIn