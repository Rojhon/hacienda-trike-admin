import { set, ref, get, child, onValue, remove, push, serverTimestamp, update } from "firebase/database"
import { db } from "./FirebaseConfig";

// export const getRides = async (username) => {
//     try {
//         const ridesRef = ref(db, `passengers/${username}/rides`);
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

        return {
            data: ridesSnapshot.val() ? Object.values(ridesSnapshot.val()).reverse() : [],
            status: 200,
        };

    } catch (error) {
        return {
            data: [],
            status: 500,
        };

    }
}

