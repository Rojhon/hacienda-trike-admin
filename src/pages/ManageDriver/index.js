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
import { getNotVerifiedDrivers } from "../../api/AccountController";
import DriverVerified from "./DriverVerified";

const ManageDriver = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [drivers, setDrivers] = useState([])

    useEffect(() => {
        handleGetAccounts()
    }, [])

    const handleGetAccounts = async () => {
        try {
            const response = await getNotVerifiedDrivers()

            if (response?.status == 200) {
                setDrivers(response?.data)
                setIsLoading(false)
            }

        } catch (error) {

        }
    }

    return (
        <>
            <div className="layout-content">
                <DriverVerified data={drivers} setData={setDrivers} isLoading={isLoading}></DriverVerified>
            </div>
        </>
    );
}

export default ManageDriver;