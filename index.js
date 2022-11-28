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

const cheeze = {
  food: "치즈떡볶이",
  price: "5000원",
};

const sibal = {
  food: "시발떡볶이",
  price: "3000원",
};
const sex = {
  food: "sex떡볶이",
  price: "3000원",
};

db.collection("menu").doc("떡볶이").set({ cheeze, sibal });
// db.collection("menu").doc("sex").set({ sex });



dduck.get().then((doc) => {
  console.log(doc.data());
  const didi = `<div>${doc.data().sibal.price}<div>`;
  document.querySelector("body").append(didi);
});

