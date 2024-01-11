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
    Button,
    Space,
    Popconfirm,
    message
} from "antd";
import { getActiveRides, deleteRide } from "../../api/RidesController";
import { convertDate, convertDate2 } from "../../utils";

const { Text, Title } = Typography;

const RidesTable = ({ data, setData, isLoading }) => {
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);

    // table code start
    const columns = [
        {
            title: 'Passenger',
            dataIndex: 'passenger_username',
            key: 'passenger_username',
            render: (_, record) => (
                <>
                    <p>{record?.passenger}</p>
                </>
            ),
        },
        {
            title: 'Driver',
            dataIndex: 'driver_username',
            key: 'driver_username',
            render: (_, record) => (
                <>
                    <p>{record?.driver_username ? record?.driver_username : "N/A"}</p>
                </>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <>
                    <p style={{
                        color:
                            record?.status == 'Completed' ? "#1677ff"
                                : record?.status == "Ongoing" ? "orange" : "red"
                    }}>{record?.status}</p>
                </>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => (
                <>
                    <p>{record?.price ? record?.price : "N/A"}</p>
                </>
            ),
        },
        {
            title: 'Estimated Travel Time',
            dataIndex: 'travel_time',
            key: 'travel_time',
            render: (_, record) => (
                <>
                    <p>{record?.travel_time ? record?.travel_time : "N/A"}</p>
                </>
            ),
        },
        {
            title: 'Pick Up',
            dataIndex: 'pick_up_address',
            key: 'pick_up_address',
            render: (_, record) => (
                <>
                    <p>{record?.pick_up_address ? record?.pick_up_address : "N/A"}</p>
                </>
            ),
        },
        {
            title: 'Drop off',
            dataIndex: 'drop_off_address',
            key: 'drop_off_address',
            render: (_, record) => (
                <>
                    <p>{record?.drop_off_address ? record?.drop_off_address : "N/A"}</p>
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
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    {/* Update Action */}
                    {/* <Button type="primary" onClick={() => handleUpdate(record?._id)}>
                        Update
                    </Button> */}

                    {/* Delete Action */}
                    <Popconfirm
                        title="Are you sure to delete this record?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="danger">Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const handleUpdate = (record) => {
        // Implement your update logic here
        message.success(`Updating record with id ${record}`);
    };

    const handleDelete = async (_id) => {
        // Implement your delete logic here
        message.loading("Deleting...", 0)
        const updatedDataSource = data.filter(item => item._id !== _id);
        setData(updatedDataSource);

        const response = await deleteRide(_id)
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
                            title={`Rides (${data?.length})`}
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
                                    rowKey="_id"
                                />
                            </div>
                        </Card>

                    </Col>
                </Row>
            </div>
        </>
    );
}

export default RidesTable;