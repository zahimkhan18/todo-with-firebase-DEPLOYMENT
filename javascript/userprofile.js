import{db,doc,getDoc}from "./firebase.js";


window.addEventListener("load" , async()=>{
    if(!localStorage.getItem("user")) {
        window.location.replace("../pages/login.html");
        return;
    }
    console.log("response", response.data());

    const userID = localStorage.getItem("user")
    const response = await getDoc(doc(db,"user",userID))
    console.log("response", response.data());
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const gender = document.querySelector("#gender");
    name.innerHTML = `Name : ${response.data().Name}`;
    email.innerHTML = `Email : ${response.data().email}`;
    gender.innerHTML = `Gender : ${response.data().gender}`;
    console.log(response)   
})