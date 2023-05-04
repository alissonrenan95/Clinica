import { Examegeral } from "../dto/Examegeral";
import { URL_BASE_EXAMEGERAL, requestGetAsAsync, requestPostAsAsync } from "./Api";

export function updateExamegeral(examegeral:Examegeral){
    return requestPostAsAsync(URL_BASE_EXAMEGERAL+examegeral.id,examegeral);
}

export function findExamegeralById(examegeralid:Number){
    return requestGetAsAsync(URL_BASE_EXAMEGERAL+examegeralid);
}