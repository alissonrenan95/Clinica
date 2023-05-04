import { Examecovid } from "../dto/Examecovid";
import { URL_BASE_EXAMECOVID, requestGetAsAsync, requestPostAsAsync } from "./Api";

export function updateExamecovid(examecovid:Examecovid){
    return requestPostAsAsync(URL_BASE_EXAMECOVID+examecovid.id,{...examecovid});
}

export function findExamecovidById(examecovidid:Number){
    return requestGetAsAsync(URL_BASE_EXAMECOVID+examecovidid);
}