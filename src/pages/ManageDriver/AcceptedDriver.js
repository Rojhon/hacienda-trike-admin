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
    message
} from "antd";
import { convertDate, convertDate2 } from "../../utils";
import haciendaTrikeDriver from "../../assets/images/HaciendaTrikeDriver.png"
import { deleteAccount } from "../../api/AccountController";

const { Title } = Typography;

const AcceptedDriver = ({ data, setData, isLoading }) => {
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);

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
        // {
        //     title: 'Actions',
        //     dataIndex: 'actions',
        //     key: 'actions',
        //     render: (_, record) => (
        //         <Space>
        //             {/* Update Action */}
        //             {/* <Button type="primary" onClick={() => handleUpdate(record?.username)}>
        //                 Update
        //             </Button> */}

        //             {/* Delete Action */}
        //             <Popconfirm
        //                 title="Are you sure to delete this record?"
        //                 onConfirm={() => handleDelete(record?.username)}
        //                 okText="Yes"
        //                 cancelText="No"
        //             >
        //                 <Button type="danger">Delete</Button>
        //             </Popconfirm>
        //         </Space>
        //     ),
        // },
    ];

    const handleUpdate = (record) => {
        // Implement your update logic here
        message.success(`Updating record with id ${record}`);
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


    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title={`Approved (${data?.length})`}
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

export default AcceptedDriver;