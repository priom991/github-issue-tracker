const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "admin123";

document.getElementById("loginForm").addEventListener("submit", function(e){

e.preventDefault();

let username = document.getElementById("username").value;
let password = document.getElementById("password").value;
let errorMsg = document.getElementById("errorMsg");

if(username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD){

window.location.href = "index.html";

}else{

errorMsg.style.display = "block";

}

});