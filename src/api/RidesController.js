import { ref, get, remove, update } from "firebase/database"
import { db } from "./FirebaseConfig";

// export const getRides = async () => {
//     try {
//         const ridesRef = ref(db, `rides`);
//         const ridesSnapshot = await get(ridesRef);

//         const rideIds = ridesSnapshot.val() || [];

//         const ridesDetailsPromises = rideIds.map(async (rideId) => {
//             const rideDetailsRef = ref(db, `rides/${rideId}`);
//             const rideDetailsSnapshot = await get(rideDetailsRef);

//             if (rideDetailsSnapshot.exists()) {
//                 const rideDetailsData = rideDetailsSnapshot.val();

//                 rideDetailsData.id = rideId;

//                 return rideDetailsData;
//             }

//             return null; // or handle accordingly if there is no data for the ride
//         });

//         const ridesDetails = await Promise.all(ridesDetailsPromises);

//         // Remove any null values (rides with no data) from the array
//         const filteredRidesDetails = ridesDetails.filter(rideDetails => rideDetails !== null);

//         // Reverse the order of the ridesDetails array
//         const reversedRidesDetails = filteredRidesDetails.reverse();

//         return {
//             data: reversedRidesDetails,
//             status: 200
//         }

//     } catch (error) {
//         console.log(error);

//         return {
//             data: [],
//             status: 500
//         }
//     }
// };

export const getRide = async (id) => {
    try {
        const ridesRef = ref(db, `rides/${id}`);
        const ridesSnapshot = await get(ridesRef);

        const driverInfoRef = ref(db, `drivers/` + ridesSnapshot.val()?.driver_username);
        const driverInfoSnapshot = await get(driverInfoRef);

        return {
            data: {
                rides: ridesSnapshot.val(),
                driver_info: driverInfoSnapshot.val()
            },
            status: 200
        }

    } catch (error) {
        console.log(error);

        return {
            data: [],
            status: 500
        }
    }
};

export const getActiveRides = async () => {
    try {
        const activeRidesRef = ref(db, 'active_books');
        const activeRidesSnapshot = await get(activeRidesRef);

        return {
            data: activeRidesSnapshot.val() ? Object.values(activeRidesSnapshot.val()) : [],
            status: 200,
        };

    } catch (error) {
        console.log(error)
        return {
            data: [],
            status: 500,
        };

    }
}

export const getRides = async () => {
    try {
        const ridesRef = ref(db, 'rides');
        const ridesSnapshot = await get(ridesRef);

        // Convert object to array of key-value pairs
        const ridesArray = Object.entries(ridesSnapshot.val()).map(([_id, ride]) => ({
            _id,
            ...ride,
        }));

        return {
            data: ridesArray ? ridesArray.reverse() : [],
            status: 200,
        };

    } catch (error) {
        return {
            data: [],
            status: 500,
        };

    }
}

export const deleteRide = async (_id) => {
    try {
        const ridesRef = ref(db, `rides/${_id}`);
        const ridesSnapshot = await get(ridesRef);
        await remove(ridesRef);

        const passengersRef = ref(db, `passengers/${ridesSnapshot.val()?.passenger}`);
        const passengersSnapshot = await get(passengersRef);

        if (passengersSnapshot.val()) {
            const updatedPassengerRides = passengersSnapshot.val()?.rides.filter(rideId => rideId !== _id);
            await update(passengersRef, { rides: updatedPassengerRides });
        }

        const driversRef = ref(db, `drivers/${ridesSnapshot.val()?.driver_username}`);
        const driversSnapshot = await get(driversRef);

        if (driversSnapshot.val()) {
            const updatedDriverRides = driversSnapshot.val()?.rides.filter(rideId => rideId !== _id);
            await update(driversRef, { rides: updatedDriverRides });
        }
    } catch (error) {
        console.error("Error deleting ride:", error);
    }
};