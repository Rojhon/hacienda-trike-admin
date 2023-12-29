import { set, ref, get, child, serverTimestamp } from "firebase/database"
import { db } from "../components/Config";

export const signIn = async (values) => {
    try {
        const dbRef = ref(db);

        // Check if username exists
        const passengersRef = child(dbRef, `passengers/${values.username}`);
        const passengersSnapshot = await get(passengersRef);
        if (passengersSnapshot.exists()) {
            if (passengersSnapshot.val().password == values.password) {
                printJSON(passengersSnapshot.val())

                // Get Active Books
                const activeBooksRef = child(dbRef, `active_books/${passengersSnapshot.val()?.username}`);
                const activeBooksSnapshot = await get(activeBooksRef);

                return {
                    data: {
                        account: passengersSnapshot.val(),
                        active_books: activeBooksSnapshot.val()
                    },
                    status: 200
                }

            } else {
                return {
                    data: "Incorrect username or password!",
                    status: 400
                }
            }

        } else {
            return {
                data: "Incorrect username or password!",
                status: 400
            }
        }

    } catch (error) {
        console.log(error);

        return {
            data: "Server Error!",
            status: 500
        }
    }
}

export const signUp = async (values) => {
    try {
        const dbRef = ref(db);

        // Check if username exists
        const usernameRef = child(dbRef, `passengers/${values.username}`);
        const usernameSnapshot = await get(usernameRef);

        if (usernameSnapshot.exists()) {
            return {
                data: "Username already exists!",
                status: 400
            }
        }

        // Check if email exists - Recode this
        const passengersRef = ref(db, 'passengers');
        const passengersSnapshot = await get(passengersRef);
        const data = Object.values(passengersSnapshot.val() || {})

        var emailFound = false;

        for (var i = 0; i < data.length; i++) {
            if (data[i].email === values.email) {
                emailFound = true;
                break;
            }
        }

        if (emailFound) {
            return {
                data: "Email already exists!",
                status: 400
            }
        }

        // Create New Passenger
        await set(ref(db, 'passengers/' + values.username), {
            username: values.username,
            email: values.email,
            full_name: values.full_name,
            password: values.password,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
        });

        return {
            data: values,
            status: 200
        }

    } catch (error) {
        console.log(error);

        return {
            data: "Server Error!",
            status: 500
        }
    }
};