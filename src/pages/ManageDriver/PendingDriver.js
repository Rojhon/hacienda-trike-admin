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
import React, { useState } from "react";
import {
    Row,
    Col,
    Card,
    Table,
    Button,
    Avatar,
    Typography,
    Space,
    Popconfirm,
    Image,
    message,
    Modal
} from "antd";
import { convertDate, convertDate2 } from "../../utils";
import haciendaTrikeDriver from "../../assets/images/HaciendaTrikeDriver.png"
import { deleteAccount, updateDriverStatus } from "../../api/AccountController";
import axios from "axios";

const { Title } = Typography;

const PendingDriver = ({ data, setData, isLoading }) => {
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);

    const [driverData, setDriverData] = useState({})
    const [approveLoading, setApproveLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);
    const [open, setOpen] = useState(false);


    // table code start
    const columns = [
        {
            title: 'Account',
            dataIndex: 'username',
            key: 'username',
            render: (_, record) => (
                <>
                    <Avatar.Group>
                        <Avatar
                            className="shape-avatar"
                            shape="square"
                            size={40}
                            src={
                                record?.profile_uri ?
                                    record?.profile_uri
                                    : haciendaTrikeDriver
                            }
                        ></Avatar>
                        <div className="avatar-info">
                            <Title level={5}>{record?.full_name}</Title>
                            <p>{record?.email}</p>
                        </div>
                    </Avatar.Group>{" "}
                </>
            ),
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (_, record) => (
                <>
                    <p>{record?.username}</p>
                </>
            ),
        },

        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
            render: (_, record) => (
                <>
                    <p>{record?.contact ? record?.contact : "N/A"}</p>
                </>
            ),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (_, record) => (
                <>
                    <p>{record?.gender ? record?.gender : "N/A"}</p>
                </>
            ),
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
            key: 'birthday',
            render: (_, record) => (
                <>
                    <p>{record?.birthday ? convertDate2(new Date(record?.birthday)) : "N/A"}</p>
                </>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (_, record) => (
                <>
                    <p>{record?.created_at ? convertDate(new Date(record?.created_at)) : "N/A"}</p>
                </>
            ),
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (_, record) => (
                <>
                    <p>{record?.updated_at ? convertDate(new Date(record?.updated_at)) : "N/A"}</p>
                </>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    {/* Update Action */}
                    <Button type="primary" onClick={() => viewDriver(record)}>
                        View
                    </Button>
                </Space>
            ),
        },
    ];

    const viewDriver = (record) => {
        // Implement your update logic here
        setOpen(true);
        setDriverData(record)
    };

    const handleDelete = async (record) => {
        // Implement your delete logic here
        message.loading("Deleting...", 0)
        const updatedDataSource = data.filter(item => item.username !== record);
        setData(updatedDataSource);

        const response = await deleteAccount("drivers", record)
        message.destroy()
        message.success(`Successfully deleted!`);
    };


    // Modal
    const handleCancel = () => {
        setOpen(false);
    };

    const rejectDriver = async () => {
        setRejectLoading(true)
        try {
            const response = await updateDriverStatus(driverData?.username, "Rejected")
            setRejectLoading(false)
            setOpen(false)

            message.loading("Loading...", 0)
            setTimeout(() => {
                window.location.reload()
            }, 2000)

            driverData.status = 'Rejected'
            const responseEmail = await axios.post("https://online-passenger-scheduling-system.netlify.app/api/accounts/send-hacienda-trike", driverData)
        } catch (error) {
            setRejectLoading(false)
            setOpen(false)
        }
    }

    const approveDriver = async () => {
        setApproveLoading(true)
        try {
            const response = await updateDriverStatus(driverData?.username, "Accepted")
            setApproveLoading(false)
            setOpen(false)

            message.loading("Loading...", 0)
            setTimeout(() => {
                window.location.reload()
            }, 2000)

            driverData.status = 'Approved'
            const responseEmail = await axios.post("https://online-passenger-scheduling-system.netlify.app/api/accounts/send-hacienda-trike", driverData)
        } catch (error) {
            setApproveLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <Modal
                visible={open}
                width={1000}
                title={`${driverData?.full_name} (Pending)`}
                onCancel={handleCancel}
                footer={[
                    <Button
                        key="reject"
                        type="danger"
                        loading={rejectLoading}
                        onClick={rejectDriver}
                    >
                        Reject
                    </Button>,
                    <Button
                        key="approve"
                        type="primary"
                        loading={approveLoading}
                        onClick={approveDriver}
                    >
                        Approve
                    </Button>,
                ]}
            >
                <h6>Username: {driverData?.username}</h6>
                <h6>Email: {driverData?.email}</h6>
                <h6>Contact: {driverData?.contact}</h6>
                <h6>Gender: {driverData?.gender}</h6>
                <h6>Plate Number: {driverData?.plate_number}</h6>

                <Row gutter={[16, 16]} justify="center">
                    <Col span={8}>
                        <h2>Selfie</h2>
                        <Image src={driverData?.selfie_uri} width={"100%"} />
                    </Col>
                    <Col span={8}>
                        <h2>Driver License</h2>
                        <Image src={driverData?.license_uri} width={"100%"} />
                    </Col>
                    <Col span={8}>
                        <h2>Franchise</h2>
                        <Image src={driverData?.franchise_uri} width={"100%"} />
                    </Col>
                </Row>
            </Modal>

            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title={`Waiting for Approval (${data?.length})`}
                            extra={
                                <>
                                    {/* <Radio.Group onChange={onChange} defaultValue="a">
                                        <Radio.Button value="a">All</Radio.Button>
                                        <Radio.Button value="b">ONLINE</Radio.Button>
                                    </Radio.Group> */}
                                </>
                            }
                        >
                            <div className="table-responsive">
                                <Table
                                    loading={isLoading}
                                    columns={columns}
                                    dataSource={data}
                                    className="ant-border-space"
                                    rowKey="username"
                                />
                            </div>
                        </Card>

                    </Col>
                </Row>
            </div>
        </>
    );
}

export default PendingDriver;