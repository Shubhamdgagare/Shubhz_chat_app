React Messaging App
This is a messaging app built with React at the frontend and Firebase as the backend.

Features
Authentication with Firebase.
Real-time messaging.
Ability to send images.
View message history.
Update user profile information.
Technologies Used
React
Firebase
HTML
CSS
Installation
Clone the repository.

cd into the project directory.

Run npm install to install dependencies.

Create a .env file at the root of the project and add your Firebase config credentials:


installing sass =  in simple language its css on steroids.

npm i sass

======================================================================================================
Installing uuid package for inserting data into databse with send button => A UUID (Universal Unique Identifier) is a 128-bit number used to uniquely identify some object or entity on the Internet.

npm i uuid

=======================================================================================================
installing firebase package =>

npm i firebase

create "firebase.js" file in src folder for configuration =>

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "chatapp.firebaseapp.com",
  projectId: "chatapp",
  storageBucket: "chatapp.appspot.com",
  messagingSenderId: "9876543210",
  appId: "yourAPI key"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();


======
after this with the help of google docs we are configuring and storing user info with images of user in google cloud and retrieving it in users search
======================================================================================================

installing react-router-dom

npm i react-router-dom
======================================================================================================

Facing error when staring server like below =>
error:0308010C:digital envelope routines::unsupported

**** Solution ****
1) first uninstall "react-scripts" package.json 
2) Delete node_modules folder and package-lock.json
3) type "npm i" in terminal to upgrade all to latest version

most of your problem will be solved 

Contributing
Contributions are welcome! Please follow these steps:

Fork the project.
Create a new branch.
Make changes and test locally.
Push your changes to your forked repository.
Open a pull request.
Acknowledgements
This project was inspired by tutorials from The Net Ninja on YouTube.

License
This is open source project no licence needed.