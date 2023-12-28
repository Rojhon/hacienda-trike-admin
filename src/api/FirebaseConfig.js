// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
// Import necessary Firebase modules
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
// Export storage
export { app, firebase }

// https://dev.to/adii9/uploading-images-to-firebase-storage-in-react-native-with-expo-workflow-24kj
export const uploadImage = async (image, fileName, setIsLoading, setProfileURI) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', image, true);
    xhr.send(null);
  })

  const ref = firebase.storage().ref(fileName)
  const snapshot = ref.put(blob)
  snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
    () => {
      // setUploading(true)
    },
    (error) => {
      // setUploading(false)
      console.log(error)
      blob.close()
      return
    },
    () => {
      snapshot.snapshot.ref.getDownloadURL().then((url) => {
        // setUploading(false)
        console.log("Download URL: ", url)
        // setImage(url)
        blob.close()
        setProfileURI(url)
        setIsLoading(false)
        return url
      })
    }
  )
}