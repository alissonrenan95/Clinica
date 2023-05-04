import axios from 'axios';

export const URL_API="http://127.0.0.1:8000/api/";
const api = axios.create({
 //baseURL: 'https://192.168.0.10:7102/api/', aspnet
 baseURL:URL_API,
 headers:{"Content-Type":"application/json"}
});

const apiformdata = axios.create({
    //baseURL: 'https://192.168.0.10:7102/api/', aspnet
    baseURL:URL_API,
    headers:{"Content-Type": "multipart/form-data"}
    //headers:{"Content-Type":"multiparti"}
   });

export const URL_BASE_RELATORIO="Relatorio/";
export const URL_BASE_PACIENTE="Paciente/";
export const URL_BASE_ATENDIMENTO="Atendimento/";
export const URL_BASE_EXAMEGERAL="Examegeral/";
export const URL_BASE_EXAMECOVID="Examecovid/";


export async function requestGetAsAsync(sourceurl:string){
    return await api.get(sourceurl);
}

export function requestGet(sourceurl:string){
    return api.get(sourceurl);
}

export async function requestPostAsAsync(sourceurl:string, data:any){
    return await api.post(sourceurl,JSON.stringify(data));
}

export async function requestPostFormDataAsAsync(sourceurl:string, data:FormData){
    return await apiformdata.post(sourceurl,data);
}

export function requestPost(sourceurl:string, data:any){
    return api.post(sourceurl,JSON.stringify(data));
}


//export default api;