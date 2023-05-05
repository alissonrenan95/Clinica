import { URL_BASE_RELATORIO, requestGetAsAsync } from "./Api";

export function findMonitorExamecovid(){
    return requestGetAsAsync(URL_BASE_RELATORIO+"MonitorExamecovid");
}
export function findMonitorFaixaEtariacovid(){
    return requestGetAsAsync(URL_BASE_RELATORIO+"MonitorFaixaEtariaCovid");
}
