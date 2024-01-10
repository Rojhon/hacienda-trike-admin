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
} from "antd";
import { convertDate, convertDate2 } from "../../utils";
import haciendaTrikeDriver from "../../assets/images/HaciendaTrikeDriver.png"

const { Title } = Typography;

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
                <p>{record?.contact ? record?.contact : "None"}</p>
            </>
        ),
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        render: (_, record) => (
            <>
                <p>{record?.gender ? record?.gender : "None"}</p>
            </>
        ),
    },
    {
        title: 'Birthday',
        dataIndex: 'birthday',
        key: 'birthday',
        render: (_, record) => (
            <>
                <p>{record?.birthday ? convertDate2(new Date(record?.birthday)) : "None"}</p>
            </>
        ),
    },
    {
        title: 'Total Rides',
        dataIndex: 'rides',
        key: 'rides',
        render: (_, record) => (
            <>
                <p>{record?.rides?.length}</p>
            </>
        ),
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (_, record) => (
            <>
                <p>{record?.created_at ? convertDate(new Date(record?.created_at)) : "None"}</p>
            </>
        ),
    },
    {
        title: 'Updated At',
        dataIndex: 'updated_at',
        key: 'updated_at',
        render: (_, record) => (
            <>
                <p>{record?.updated_at ? convertDate(new Date(record?.updated_at)) : "None"}</p>
            </>
        ),
    },
];

const Driver = ({ data, isLoading }) => {
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Driver"
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

export default Driver;