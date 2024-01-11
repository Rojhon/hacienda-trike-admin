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
import { getAccounts } from "../../api/AccountController";

import {
    Card,
    Col,
    Row,
    Typography,
} from "antd";

import LatestCreatedAccount from "./LatestCreatedAccount";

const Home = () => {
    const { Title, Text } = Typography;

    const profile = [
        <svg
            width="22"
            height="22"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={0}
        >
            <path
                d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
                fill="#fff"
            ></path>
            <path
                d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
                fill="#fff"
            ></path>
            <path
                d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
                fill="#fff"
            ></path>
            <path
                d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
                fill="#fff"
            ></path>
        </svg>,
    ];

    const heart = [
        <svg
            width="22"
            height="22"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={0}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
                fill="#fff"
            ></path>
        </svg>,
    ];

    const tables = [
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={0}
        >
            <path
                d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
                fill="#fff"
            ></path>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
                fill="#fff"
            ></path>
        </svg>,
    ];


    const cart = [
        <svg
            width="22"
            height="22"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={0}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z"
                fill="#fff"
            ></path>
        </svg>,
    ];

    const [totalPassengers, setTotalPassengers] = useState(null)
    const [totalDrivers, setTotalDrivers] = useState(null)
    const [totalRides, setTotalRides] = useState(null)
    const [totalActiveRides, setTotalActiveRides] = useState(null)
    const [latestAccounts, setLatestAccounts] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        handleGetAccounts()
    }, [])

    const handleGetAccounts = async () => {
        try {
            const response = await getAccounts()

            if (response?.status == 200) {
                setTotalPassengers(response?.data?.total_passengers)
                setTotalDrivers(response?.data?.total_drivers)
                setTotalRides(response?.data?.total_rides)
                setTotalActiveRides(response?.data?.total_active_rides)
                setLatestAccounts(response?.data?.latest_accounts)

                setIsLoading(false)
            }

        } catch (error) {

        }
    }

    return (
        <>
            <div className="layout-content">
                <Row className="rowgap-vbox" gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
                        <Card bordered={false} className="criclebox">
                            <div className="number">
                                <Row align="middle" gutter={[24, 0]}>
                                    <Col xs={18}>
                                        <span>Total Passenger</span>
                                        <Title level={3}>
                                            {totalPassengers}
                                            { }
                                        </Title>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="icon-box">{profile}</div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
                        <Card bordered={false} className="criclebox">
                            <div className="number">
                                <Row align="middle" gutter={[24, 0]}>
                                    <Col xs={18}>
                                        <span>Total Drivers</span>
                                        <Title level={3}>
                                            {totalDrivers}
                                            { }
                                        </Title>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="icon-box">{profile}</div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
                        <Card bordered={false} className="criclebox">
                            <div className="number">
                                <Row align="middle" gutter={[24, 0]}>
                                    <Col xs={18}>
                                        <span>Total Rides</span>
                                        <Title level={3}>
                                            {totalRides}
                                            { }
                                        </Title>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="icon-box">{tables}</div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
                        <Card bordered={false} className="criclebox redtext">
                            <div className="number">
                                <Row align="middle" gutter={[24, 0]}>
                                    <Col xs={18}>
                                        <span>Total Active Rides</span>
                                        <Title level={3}>
                                            {totalActiveRides}
                                            { }
                                        </Title>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="icon-box">{tables}</div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <LatestCreatedAccount data={latestAccounts} isLoading={isLoading}></LatestCreatedAccount>
            </div>
        </>
    );
}

export default Home;
