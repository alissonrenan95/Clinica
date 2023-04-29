import axios from 'axios';

const api = axios.create({
 baseURL: 'https://192.168.0.10:7102/api/',
 headers:{"Content-Type":"application/json"}
});


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

export function requestPost(sourceurl:string, data:any){
    return api.post(sourceurl,data);
}


//export default api;