
let user = {
    name: ""
    };
let erroFlag = false;

function login(){
    if(erroFlag === true){
        user.name = prompt("Esse nome de usuario ja esta em uso. Por favor, digite outro usuario:");
    }
    else{
        user.name = prompt("Digite o nome do usuario");
    }

    const post_login = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", user);
    post_login.then(loginSuccess);
    post_login.catch(erroLogin);
}

function erroLogin(erro){
    if(erro.response.status == 400){
        erroFlag = true;
        login();
    }  
}

function loginSuccess(response){
    erroFlag = false;
    let statusCode = response.status;
    console.log(statusCode);
}

function checkLogin(){
    if(statusCode == 200)
    {
        const post_login = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", user);
        post_login.then();
        post_login.catch();
    }
}


login();
setInterval(checkLogin, 5000);