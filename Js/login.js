//Funcion para loguear al usuario
function loguear(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username == "Joaquin" && password == "1234") {
        window.location = "/index.html";
        alert("Bienvenido " + username);
    }
    else{
        alert("Usuario o contraseña incorrectos");
    }
    return password;
}

