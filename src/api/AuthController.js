import { set, ref, get, child, serverTimestamp } from "firebase/database"
import { db } from "./FirebaseConfig";

export const signIn = async (values) => {
    try {
        const dbRef = ref(db);

        // Check if username exists
        const adminsRef = child(dbRef, `admins/${values.username}`);
        const adminsSnapshot = await get(adminsRef);
        if (adminsSnapshot.exists()) {
            if (adminsSnapshot.val().password == values.password) {
                return {
                    data: adminsSnapshot.val(),
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
        const usernameRef = child(dbRef, `admins/${values.username}`);
        const usernameSnapshot = await get(usernameRef);

        if (usernameSnapshot.exists()) {
            return {
                data: "Username already exists!",
                status: 400
            }
        }

        // Check if email exists - Recode this
        const adminsRef = ref(db, 'admins');
        const adminsSnapshot = await get(adminsRef);
        const data = Object.values(adminsSnapshot.val() || {})

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

        // Create New Admin
        await set(ref(db, 'admins/' + values.username), {
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