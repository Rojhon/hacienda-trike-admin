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
import { getPassengersDrivers } from "../../api/AccountController";
import Passenger from "./Passenger";
import Driver from "./Driver";

const Account = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [passengers, setPassengers] = useState([])
    const [drivers, setDrivers] = useState([])

    useEffect(() => {
        console.log("Home")
        handleGetAccounts()

    }, [])

    const handleGetAccounts = async () => {
        try {
            const response = await getPassengersDrivers()

            if (response?.status == 200) {
                setPassengers(response?.data?.passengers)
                setDrivers(response?.data?.drivers)
                setIsLoading(false)

                console.log(response?.data)
            }

        } catch (error) {

        }
    }

    return (
        <>
            <div className="layout-content">
                <Passenger data={passengers} setData={setPassengers} isLoading={isLoading}></Passenger>
                <Driver data={drivers} isLoading={isLoading}></Driver>
            </div>
        </>
    );
}

export default Account;
