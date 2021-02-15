import config from 'config';
import { authHeader } from '../_helpers';


export const professionalService = {
            getAllMaster,
            getCity,
            getDistrict,
            getDharm,
            getKayda,
            getKalam,
            getCrimeType,
            getCrimeTitle,
            getStatus,
            createCriminal,
            getCriminalsById,
            updateCriminals
}

function getAllMaster(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/professional/getmaster`, requestOptions).then(handleResponse);
}

// GET CITY
function getCity(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${config.apiUrl}/professional/city`, requestOptions).then(handleResponse);
}

function getDistrict(cityId){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${config.apiUrl}/professional/districts/${cityId}`, requestOptions).then(handleResponse);
}

function getDharm(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${config.apiUrl}/professional/dharm`, requestOptions).then(handleResponse);
}

function getKayda(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${config.apiUrl}/professional/kayda`, requestOptions).then(handleResponse);
}

function getKalam(actId){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${config.apiUrl}/professional/kalam/${actId}`, requestOptions).then(handleResponse);
}

function getCrimeType(){
    const requestOptions = {
        method:'GET',
        headers:authHeader()
    }

    return fetch(`${config.apiUrl}/professional/crimetypes`, requestOptions).then(handleResponse);
}
function getCrimeTitle(){
    const requestOptions = {
        method:'GET',
        headers:authHeader()
    }

    return fetch(`${config.apiUrl}/professional/crimetitles`, requestOptions).then(handleResponse);
}

function getStatus(){
    const requestOptions = {
        method:'GET',
        headers:authHeader()
    }
    return fetch(`${config.apiUrl}/professional/status`, requestOptions).then(handleResponse);
}

function createCriminal(data){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    
    return fetch(`${config.apiUrl}/criminal/create`, requestOptions).then(handleResponse);
}


function getCriminalsById(id){
    const requestOptions= {
        method:'GET',
        headers:authHeader()
    }

    return fetch(`${config.apiUrl}/criminal/getcriminalbyid/${id}`, requestOptions).then(handleResponse);
}
function updateCriminals(id,data){
    const requestOptions= {
        method:'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    return fetch(`${config.apiUrl}/criminal/update/${id}`, requestOptions).then(handleResponse);
}



function handleResponse(response){
    return response.text().then(text => {
     const data = text && JSON.parse(text);
     if (!response.ok) {
         if (response.status === 401) {
             // auto logout if 401 response returned from api
         }

         const error = (data && data.message) || response.statusText;
         return Promise.reject(error);
     }
     return data;
 });

}