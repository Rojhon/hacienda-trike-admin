import { set, ref, get, update, child, serverTimestamp, remove } from "firebase/database"
import { db } from "./FirebaseConfig";

export const updateAccount = async (values) => {
    try {
        if (values.old_password != "" && values.new_password != "") {
            const passengersRef = ref(db, 'passengers/' + values.username);
            const passengersSnapshot = await get(passengersRef);
            const data = passengersSnapshot.val()

            if (data.password === values.old_password) {
                if (data.password === values.new_password) {
                    return {
                        data: "New password cannot be the same as the current password!",
                        status: 400
                    }
                } else {
                    // Update Passenger with New Password
                    await update(ref(db, 'passengers/' + values.username), {
                        full_name: values.full_name,
                        contact: values.contact,
                        gender: values.gender,
                        birthday: values.birthday,
                        password: values.new_password,
                        profile_uri: values.profile_uri,
                        updated_at: serverTimestamp(),
                    });

                    return {
                        data: values,
                        status: 200
                    }
                }
            } else {
                return {
                    data: "Old password does not match your current password!",
                    status: 400
                }
            }
        } else {
            // Update Passenger
            await update(ref(db, 'passengers/' + values.username), {
                full_name: values.full_name,
                contact: values.contact,
                gender: values.gender,
                birthday: values.birthday,
                profile_uri: values.profile_uri,
                updated_at: serverTimestamp(),
            });

            return {
                data: values,
                status: 200
            }
        }

    } catch (error) {
        console.log(error);

        return {
            data: "Server Error!",
            status: 500
        }
    }
};

// For Pick up and Drop off
export const updateLocation = async (values) => {
    try {
        await update(ref(db, 'passengers/' + values.username), values);
        return {
            data: "Sucess",
            status: 200
        }

    } catch (error) {
        return {
            data: "Server Error!",
            status: 500
        }
    }

}

export const getAccounts = async () => {
    try {
        const passengersRef = ref(db, 'passengers');
        const passengersSnapshot = await get(passengersRef);

        const driversRef = ref(db, 'drivers');
        const driversSnapshot = await get(driversRef);

        // Combine passengers and drivers, then sort based on created_at
        const combinedAccounts = [
            ...Object.values(passengersSnapshot.val() || []).map(passenger => ({
                ...passenger,
                type: 'passenger',
            })),
            ...Object.values(driversSnapshot.val() || []).map(driver => ({
                ...driver,
                type: 'driver',
            })),
        ].sort((a, b) => (a.created_at > b.created_at ? -1 : 1));

        const ridesRef = ref(db, 'rides');
        const ridesSnapshot = await get(ridesRef);

        const activeRidesRef = ref(db, 'active_books');
        const activeRidesSnapshot = await get(activeRidesRef);

        return {
            data: {
                total_passengers: passengersSnapshot.val() ? Object.values(passengersSnapshot.val())?.length : 0,
                total_drivers: driversSnapshot.val() ? Object.values(driversSnapshot.val())?.length : 0,
                total_rides: ridesSnapshot.val() ? Object.values(ridesSnapshot.val())?.length : 0,
                total_active_rides: activeRidesSnapshot.val() ? Object.values(activeRidesSnapshot.val())?.length : 0,
                latest_accounts: combinedAccounts?.slice(0, 5),
            },
            status: 200,
        };
    } catch (error) {
        return {
            data: {
                total_passengers: 0,
                total_drivers: 0,
                total_rides: 0,
                total_active_rides: 0,
                latest_accounts: [],
            },
            status: 500,
        };
    }
};

export const getPassengersDrivers = async () => {
    try {
        const passengersRef = ref(db, 'passengers');
        const passengersSnapshot = await get(passengersRef);

        const driversRef = ref(db, 'drivers');
        const driversSnapshot = await get(driversRef);

        return {
            data: {
                passengers: passengersSnapshot.val() ? Object.values(passengersSnapshot.val()) : [],
                drivers: driversSnapshot.val() ? Object.values(driversSnapshot.val()) : [],
            },
            status: 200,
        };
    } catch (error) {
        return {
            data: {
                total_passengers: [],
                total_drivers: [],
            },
            status: 500,
        };
    }
}

export const deleteAccount = async (type, username) => {
    try {
        const accountsRef = ref(db, `${type}/${username}`);
        await remove(accountsRef);

    } catch (error) {
        console.log(error)
    }
}