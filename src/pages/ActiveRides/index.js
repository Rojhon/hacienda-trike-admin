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
import { getActiveRides } from "../../api/RidesController";
import ActiveRidesTable from "./ActiveRidesTable";

const ActiveRides = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [activeRides, setActiveRides] = useState([])

    useEffect(() => {
        handleActiveRides()
    }, [])

    const handleActiveRides = async () => {
        try {
            const response = await getActiveRides()

            if (response?.status == 200) {
                setActiveRides(response?.data)
                setIsLoading(false)
            }

        } catch (error) {

        }
    }

    return (
        <>
            <div className="layout-content">
                <ActiveRidesTable data={activeRides} isLoading={isLoading}></ActiveRidesTable>
            </div>
        </>
    );
}

export default ActiveRides;