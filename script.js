
let user = {
    name: ""
    };
let erroFlag = false;
let statusCode;
let chat_log = [];

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

function checkLogin(){
    if(statusCode == 200)
    {
        const post_login = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", user);
        post_login.then();
        post_login.catch();
        console.log("Checou");
    }
}

function erroLogin(erro){
    if(erro.response.status == 400){
        erroFlag = true;
        login();
    }  
}

function loginSuccess(response){
    erroFlag = false;
    statusCode = response.status;

    const msg_reloading = setInterval(reloadMsg, 3000);
}

function reloadMsg(){
    console.log('reload');
    let messages = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    messages.then(getResponse);
}


function getResponse(response)
{
    chat_log = response.data;
    console.log(chat_log);
    let chat = document.querySelector(".chat ul");
    chat.innerHTML = "";


    for(let i = 0; i<chat_log.length; i++){
        if(chat_log[i].type == "message"){
            chat.innerHTML +=
            `<li data-test="message" class="normal-msg"">
                <p><span class="horario">(${chat_log[i].time})</span> 
                <b>${chat_log[i].from}</b> para <b>${chat_log[i].to}</b>: ${chat_log[i].text} </p>
            </li>`
        }

        else if(chat_log[i].type == "status"){
            chat.innerHTML +=
            `<li data-test="message" class="status-msg">
                <p><span class="horario">(${chat_log[i].time})</span> 
                <b>${chat_log[i].from}</b> ${chat_log[i].text}</p>
            </li>`
        }

        else if(chat_log[i].type == "private_message"){
            chat.innerHTML +=
            `<li data-test="message" class="reserv-msg">
                <p><span class="horario">(${chat_log[i].time})</span> 
                <b>${chat_log[i].from}</b> reservadamente para <b>${chat_log[i].to}</b>: ${chat_log[i].text} </p>
            </li>`
        }

    }
}


login();
setInterval(checkLogin, 5000);