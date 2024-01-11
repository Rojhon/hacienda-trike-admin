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
    Avatar,
    Typography,
} from "antd";
import { convertDate, convertDate2 } from "../../utils";
import haciendaTrikeDriver from "../../assets/images/HaciendaTrikeDriver.png"
import profileUser from "../../assets/images/profile-user.png"

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
                                : record?.type == "driver" ? haciendaTrikeDriver : profileUser
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
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (_, record) => (
            <>
                <p>{record?.type}</p>
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
];

const LatestCreatedAccount = ({ data, isLoading }) => {
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Latest Created Account"
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
                                    rowKey="created_at"
                                />
                            </div>
                        </Card>

                    </Col>
                </Row>
            </div>
        </>
    );
}

export default LatestCreatedAccount;