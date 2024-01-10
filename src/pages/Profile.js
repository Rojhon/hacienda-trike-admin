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
import { useState, useEffect } from "react";

import {
  Row,
  Col,
  Card,
  Button,
  Avatar,
  Input,
  Form,
  message,
} from "antd";

import BgProfile from "../assets/images/bg-profile.jpg";
import haciendaTrikeDriver from "../assets/images/HaciendaTrikeDriver.png"

import { signUp } from "../api/AuthController";

function Profile() {
  const [account, setAccount] = useState({})

  useEffect(() => {
    if (localStorage.getItem("account")) {
      setAccount(JSON.parse(localStorage.getItem("account")))
    }

  }, [])

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
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={haciendaTrikeDriver} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{account?.full_name ? account?.full_name : "No Name"}</h4>
                  <p>{account?.email ? account?.email : "No Email"}</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">About</h6>}
            className="header-solid h-full card-profile-information"
            // extra={<Button type="link">{pencil}</Button>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark">
              {" "}

              HaciendaTrike introduces a groundbreaking concept in urban transportation, functioning as a tricycle-based ride-hailing service that transforms the way people navigate through bustling city streets. Reshaping traditional tricycle commuting, HaciendaTrike utilizes a modern app interface, allowing users to effortlessly hail a ride and experience the convenience of efficient point-to-point travel.{" "}
            </p>
          </Card>
        </Col>


        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Create new Admin Account</h6>}
            className="header-solid h-full card-profile-information"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            {/* <Title className="mb-15">Register</Title> */}
            {/* <Title className="font-regular text-muted" level={5}>
                Create new Admin Account
              </Title> */}
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
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Card>

        </Col>

        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Researchers</h6>}
            className="header-solid h-full card-profile-information"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark">
              Ericka H. Ambrocio
            </p>
            <p className="text-dark">
              Florence Jean O. Garcia
            </p>
            <p className="text-dark">
              Andrei Louise O. Lozano
            </p>
            <p className="text-dark">
              Kevin B. Lozarita
            </p>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Profile;
