window,addEventListener("load" ,()=>{
  if(localStorage.getItem("user")){
    window.location.replace("../index.html")
  }
});

import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
} from "./firebase.js";


const signupHandler = document.getElementById("signupHandler")
signupHandler.addEventListener("click", async () => {
  try {
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const Name = document.querySelector("#Name");
    const gender = document.querySelector("#gender");
    if(password < 6){
      alert("Password must be at least 6 characters")
    }
    const userobj = {
      name: Name.value,
      email: email.value,
      gender: gender.value,
    };
    console.log("userobj", userobj);

    const response = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const uid = response.user.uid;
    const userResponse = await setDoc(doc(db,"user" , uid),userobj);
    alert("user sucsess fully sign up");
    window.location.href = "../pages/login.html"
    console.log("userResponse",userResponse)
    console.log("response" , response)

  } catch (error) {
    console.log("error", error.message);
    alert(error.message)
  }
});
