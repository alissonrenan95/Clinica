import { URL_BASE_RELATORIO, requestGetAsAsync } from "./Api";

export function findMonitorExamecovid(){
    return requestGetAsAsync(URL_BASE_RELATORIO+"MonitorExamecovid");
}