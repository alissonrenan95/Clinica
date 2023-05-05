import { URL_BASE_RELATORIO, requestGetAsAsync } from "./Api";

export function findMonitorExamecovid(){
    return requestGetAsAsync(URL_BASE_RELATORIO+"MonitorExamecovid");
}
export function findMonitorFaixaEtariaExamecovid(){
    return requestGetAsAsync(URL_BASE_RELATORIO+"MonitorFaixaEtariaCovid");
}
export function findMonitorFaixaEtariaAtendimentos(){
    return requestGetAsAsync(URL_BASE_RELATORIO+"MonitorFaixaEtariaAtendimentos");
}