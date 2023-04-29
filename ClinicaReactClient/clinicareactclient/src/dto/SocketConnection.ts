import {HubConnection} from "@microsoft/signalr";
export interface SocketConnection{
    connectedUsers:string[];
    connection?:HubConnection;
    messages:any[];
    isUpdate:Boolean;
}