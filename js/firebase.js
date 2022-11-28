const firebaseConfig = {
  apiKey: "AIzaSyAOu-0_ZRXTyEFlh9Bwqb8VbSEpoDybkQg",
  authDomain: "kiosk-93fc4.firebaseapp.com",
  projectId: "kiosk-93fc4",
  storageBucket: "kiosk-93fc4.appspot.com",
  messagingSenderId: "116370224731",
  appId: "1:116370224731:web:43bf1fed423f9260dbf17e",
  measurementId: "G-BJDKXWVV02",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
