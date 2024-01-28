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
import { getAccountDrivers } from "../../api/AccountController";
import PendingDriver from "./PendingDriver";
import RejectedDriver from "./RejectedDriver";
import AcceptedDriver from "./AcceptedDriver";

const ManageDriver = () => {

    const [isLoading, setIsLoading] = useState(true)

    const [pendingDrivers, setPendingDrivers] = useState([])
    const [rejectedDrivers, setRejectedDrivers] = useState([])
    const [acceptedDrivers, setAcceptedDrivers] = useState([])

    useEffect(() => {
        handleGetPendingDriver()
        handleGetRejectedDriver()
        handleGetAcceptedDriver()
    }, [])

    const handleGetPendingDriver = async () => {
        try {
            const response = await getAccountDrivers("Pending")

            if (response?.status == 200) {
                setPendingDrivers(response?.data)
                setIsLoading(false)
            }

        } catch (error) {

        }
    }

    const handleGetRejectedDriver = async () => {
        try {
            const response = await getAccountDrivers("Rejected")

            if (response?.status == 200) {
                setRejectedDrivers(response?.data)
            }

        } catch (error) {

        }
    }

    const handleGetAcceptedDriver = async () => {
        try {
            const response = await getAccountDrivers("Accepted")

            if (response?.status == 200) {
                setAcceptedDrivers(response?.data)
                setIsLoading(false)
            }

        } catch (error) {

        }
    }

    return (
        <>
            <div className="layout-content">
                <PendingDriver data={pendingDrivers} setData={setPendingDrivers} isLoading={isLoading}></PendingDriver>
                <RejectedDriver data={rejectedDrivers} setData={setRejectedDrivers} isLoading={isLoading}></RejectedDriver>
                <AcceptedDriver data={acceptedDrivers} setData={setAcceptedDrivers} isLoading={isLoading}></AcceptedDriver>
            </div>
        </>
    );
}

export default ManageDriver;