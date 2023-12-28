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

// Images
import ava1 from "../../assets/images/logo-shopify.svg";
import ava2 from "../../assets/images/logo-atlassian.svg";
import ava3 from "../../assets/images/logo-slack.svg";
import ava5 from "../../assets/images/logo-jira.svg";
import ava6 from "../../assets/images/logo-invision.svg";
import face from "../../assets/images/face-1.jpg";
import face2 from "../../assets/images/face-2.jpg";
import face3 from "../../assets/images/face-3.jpg";
import face4 from "../../assets/images/face-4.jpg";
import face5 from "../../assets/images/face-5.jpeg";
import face6 from "../../assets/images/face-6.jpeg";
import pencil from "../../assets/images/pencil.svg";

const { Title } = Typography;

const convertDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    // Format the date and time
    const formattedDateTime = date.toLocaleDateString('en-US', options);

    return formattedDateTime;
};

const convertDate2 = (timestamp) => {
    const date = new Date(timestamp);

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    // Format only the date
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
};

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
                        src={record?.profile_uri}
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
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (_, record) => (
            <>
                <p>{record?.created_at ? convertDate(new Date(record?.created_at)) : "None"}</p>
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

export default LatestCreatedAccount;