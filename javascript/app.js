
window.addEventListener("load", () => {
  console.log(localStorage.getItem("user"));
  if (!localStorage.getItem("user")) {
    window.location.replace("../pages/login.html");
  }
});

import {
  addDoc,
  collection,
  db,
  deleteDoc,
  updateDoc,
  doc,
  getDocs,
} from "./firebase.js";

const todocollection = collection(db, "todos");
const todoparent = document.querySelector(".parent");
// console.log("todoparent", todoparent)

const addtodo = async () => {
  try {
    const todoinput = document.getElementById("input");
    console.log("todoinput", todoinput.value);
    if(todoinput.value< 3){
      alert("Todo must be more than 3 characters");
      return;
    }
    const todoobj = {
      value: todoinput.value,
    };
    const response = await addDoc(todocollection, todoobj);
    gettodos();
    todoinput.value = "";
    console.log("response", response.id);
  } catch (error) {
    console.log("error", error.message);
  }
};

const deleteAll = ()=>{
   const todoContainer = document.querySelector("#todoContainer")
   todoContainer.innerHTML = "";
}

const gettodos = async () => {
  try {
    const querySnapshot = await getDocs(todocollection);
    let todoArr = [];
    todoparent.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      todoArr.push(obj);
      // console.log("obj", obj)
      todoparent.innerHTML += `<div class="card  " style="width: 20rem;">
            <div class="card-body">
                <h5 class="card-title"> ${obj.value} </h5>
                <button class="btn btn-info"id=${obj.id} onclick="editTodo(this)">EDIT</button>
                <button class="btn btn-danger" id=${obj.id}  onclick="deleteTodo(this ,)" >delete</button>
            </div>
        </div>`;
    });
  } catch (error) {
    alert(error.message)
    // console.log("error", error.message);
  }
};

const deleteTodo = async (ele) => {
  console.log("deleteTodo", ele.id);
  try {
    await deleteDoc(doc(db, "todos", ele.id));
    gettodos();
  } catch (error) {
    console.log("error", error.message);
  }
};
const editTodo = async (ele) => {
  try {
    console.log("ele", ele.id);
    const editValue = prompt("Enter Edit Value");
    await updateDoc(doc(db, "todos", ele.id), {
      value: editValue,
    });
    gettodos();
    console.log("editValue", editValue);
  } catch (error) {

    console.log("error", error.message);
  }
};

const logoutBtn = ()=>{
  localStorage.removeItem("user")
  localStorage.clear()
  window.location.replace("./pages/login.html")
}

window.addEventListener("load", gettodos);
window.addtodo = addtodo;
window.deleteAll = deleteAll;
window.deleteTodo = deleteTodo;
window.editTodo = editTodo;
window.logoutBtn = logoutBtn;

