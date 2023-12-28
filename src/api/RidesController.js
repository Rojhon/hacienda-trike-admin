import { set, ref, get, child, onValue, remove, push, serverTimestamp, update } from "firebase/database"
import { db } from "../components/Config";
import { printJSON } from "../utils";

export const createRide = async (values) => {
    try {
        values.created_at = serverTimestamp()
        values.updated_at = serverTimestamp()

        await set(ref(db, 'active_books/' + values?.passenger_username), values);
    } catch (error) {
        console.error("Error Booking: ", error);
    }
}

export const cancelRide = async (username) => {
    try {
        const dbRef = ref(db);

        // Get Active Books
        const activeBooksRef = child(dbRef, `active_books/${username}`);
        const activeBooksSnapshot = await get(activeBooksRef);

        var activeBooksData = activeBooksSnapshot.val();

        // Save the ID of the canceled ride
        const canceledRideId = activeBooksData.id;

        // Delete unnecessary properties from the activeBooksData
        delete activeBooksData.passenger_username;
        delete activeBooksData.passenger_fullname;
        delete activeBooksData.passenger_profile_uri;
        delete activeBooksData.driver_accepted;

        activeBooksData.passenger = username;
        activeBooksData.status = "Canceled";

        // Delete Active Book
        await remove(activeBooksRef);

        // Create new Rides based on the Active Books
        const newRideRef = push(ref(db, 'rides'), activeBooksData);
        const newRideId = newRideRef.key;

        // Fetch the current list of ride IDs for the passenger
        const passengerRidesRef = ref(db, `passengers/${username}/rides`);
        const passengerRidesSnapshot = await get(passengerRidesRef);
        const currentRideIds = passengerRidesSnapshot.val() || [];

        // Add the new ride ID to the array
        currentRideIds.push(newRideId);

        // Update the passenger's ride IDs in the database
        await set(passengerRidesRef, currentRideIds);

        if (activeBooksData?.driver_username) {
            // Fetch the current list of ride IDs for the Driver
            const driverRidesRef = ref(db, `drivers/${activeBooksData?.driver_username}/rides`);
            const driverRidesSnapshot = await get(driverRidesRef);
            const currentDriverRideIds = driverRidesSnapshot.val() || [];

            // Add the new ride ID to the array
            currentDriverRideIds.push(newRideId);

            await set(driverRidesRef, currentDriverRideIds);
        }

    } catch (error) {
        console.log(error)
    }
};

// export const getActiveBook = async (username) => {
//     try {
//         const activeBooksRefRef = ref(db, 'active_books/' + username);
//         onValue(activeBooksRefRef, async (snapshot) => {
//             const data = snapshot.val();

//             if (data?.driver_accepted == true) {
//                 const driverInfoRef = ref(db, `drivers/` + data?.driver_username);
//                 const driverInfoSnapshot = await get(driverInfoRef);

//                 console.log("Get Driver Information")
//                 return {
//                     data: driverInfoSnapshot.val(),
//                     status: 200
//                 }
//             } else {
//                 console.log("400")
//                 return {
//                     data: [],
//                     status: 400
//                 }
//             }
//         });
//     } catch (error) {
//         console.log(error)

//         return {
//             data: [],
//             status: 400
//         }
//     }
// }

export const getDriverPosition = async (driverUsername) => {
    try {
        const driverPositionsRef = ref(db, 'driver_positions/' + driverUsername);
        onValue(driverPositionsRef, (snapshot) => {
            console.log("Get Driver Current Position")
            const data = snapshot.val();

            if (data) {
                console.log(data)
            }
        });

    } catch (error) {
    }
}

export const getRides = async (username) => {
    try {
        const ridesRef = ref(db, `passengers/${username}/rides`);
        const ridesSnapshot = await get(ridesRef);

        const rideIds = ridesSnapshot.val() || [];

        const ridesDetailsPromises = rideIds.map(async (rideId) => {
            const rideDetailsRef = ref(db, `rides/${rideId}`);
            const rideDetailsSnapshot = await get(rideDetailsRef);

            if (rideDetailsSnapshot.exists()) {
                const rideDetailsData = rideDetailsSnapshot.val();

                rideDetailsData.id = rideId;

                return rideDetailsData;
            }

            return null; // or handle accordingly if there is no data for the ride
        });

        const ridesDetails = await Promise.all(ridesDetailsPromises);

        // Remove any null values (rides with no data) from the array
        const filteredRidesDetails = ridesDetails.filter(rideDetails => rideDetails !== null);

        // Reverse the order of the ridesDetails array
        const reversedRidesDetails = filteredRidesDetails.reverse();

        return {
            data: reversedRidesDetails,
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

export const getRide = async (id) => {
    try {
        const ridesRef = ref(db, `rides/${id}`);
        const ridesSnapshot = await get(ridesRef);

        const driverInfoRef = ref(db, `drivers/` + ridesSnapshot.val()?.driver_username);
        const driverInfoSnapshot = await get(driverInfoRef);

        printJSON("Driver ", driverInfoSnapshot)

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

export const setRideRating = async (id, rating) => {
    try {
        await update(ref(db, 'rides/' + id), {
            rating: rating
        });

        return {
            data: "Sucess",
            status: 200
        }

    } catch (error) {
        console.log(error)
        return {
            data: "Server Error!",
            status: 500
        }
    }

}