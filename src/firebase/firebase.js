// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBu7y5uxPUVSUBQk098-mz0xct7B_06NfE",
  authDomain: "feventopia-app.firebaseapp.com",
  projectId: "feventopia-app",
  storageBucket: "feventopia-app.appspot.com",
  messagingSenderId: "392267853648",
  appId: "1:392267853648:web:5f91d0dd567962e4204655",
  measurementId: "G-BNVGMQ2DJB"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
