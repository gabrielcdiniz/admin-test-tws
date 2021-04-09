'use strict';
const BACK_DOMAIN = 'kaveira';
const BACK_PORT = '3000';
const BACK_ROUTE = 'auth/login';

const FRONT_DOMAIN = 'kaveira';
const FRONT_PATH = 'agent';

const body = JSON.stringify({
    control: {
        browserName: 'Chrome',
        deviceType: 'desktop',
        platformName: 'Linux',
        loggedAt: '2021-03-23T17:34:15.948Z',
    },
    username: 'admin',
    password: 'admin',
});

const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');

const requestInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
    headers,
    body,
};

async function requestFunction(response) {
    if (response.ok) {
        /** response envia um objeto 
         * @example 
         *  { 
         *      token: string; 
         *      systemProfile: SystemProfileEntity 
         *  } 
         * */
        const res = await response.json();
        console.log(res);

        const tokenDIV = document.createElement('div');
        tokenDIV.id = Date.now().toLocaleString();
        tokenDIV.style.height = '200px';
        tokenDIV.style.width = '100%';
        tokenDIV.style.marginTop = '20px';
        tokenDIV.style.wordBreak = 'break-word';
        tokenDIV.innerHTML = `
            <b>TOKEN:</b>
            <p>${res.token}</p>
        `;

        document.body.appendChild(tokenDIV);

        const countDIV = document.createElement('div');
        countDIV.style.height = '50px';
        countDIV.style.width = '100%';
        countDIV.innerText = 'redirecionando em 3 segundos';
        document.body.appendChild(countDIV);

        document.cookie = `token_omni=${res.token};path=/`;

        return new Promise((resolve,) => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    }
    throw new Error(`Erro na Requisicao ${url}`);
}

function changeRouteFunction() {
    const url = `https://${FRONT_DOMAIN}.omnismart.io/${FRONT_PATH}`;
    location.href = url;
}

async function fetchAPI() {
    const url = `https://${BACK_DOMAIN}.omnismart.io:${BACK_PORT}/${BACK_ROUTE}`;

    return fetch(url, requestInit)
        .then(requestFunction)
        .then(changeRouteFunction)
        .catch(err => console.error(err));
}
