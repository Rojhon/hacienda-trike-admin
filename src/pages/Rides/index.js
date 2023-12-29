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
import { getRides } from "../../api/RidesController";
import RidesTable from "./RidesTable";

const Rides = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [rides, setRides] = useState([])

    useEffect(() => {
        handleRides()
    }, [])

    const handleRides = async () => {
        try {
            const response = await getRides()

            if (response?.status == 200) {
                setRides(response?.data)
                setIsLoading(false)
                console.log(response?.data)
            }

        } catch (error) {

        }
    }

    return (
        <>
            <div className="layout-content">
                <RidesTable data={rides} isLoading={isLoading}></RidesTable>
            </div>
        </>
    );
}

export default Rides;