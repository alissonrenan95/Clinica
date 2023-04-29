import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr';
import { SocketConnection } from '../dto/SocketConnection';
import { findAtendimentos } from './PacienteServices';

const URL_BASE_SOCKET_CONNECTION_ATENDIMENTOS = "https://192.168.0.10:7102/ws/atendimentos";

export const joinRoom = async (user: string, room: string) => {
    let socketconn: SocketConnection = { connectedUsers: [], connection:undefined, messages: [], isUpdate: true };
    try {
        socketconn.connection = new HubConnectionBuilder()
            .withUrl(URL_BASE_SOCKET_CONNECTION_ATENDIMENTOS)
            .configureLogging(LogLevel.Information)
            .build();


        socketconn.connection.on("UsersInRoom", (users: string[]) => {
            socketconn.connectedUsers = users;
        })


        socketconn.connection.on("ReceiveMessage", (user: string, message: any) => {
            socketconn.isUpdate = false;
            socketconn.messages[socketconn.messages.length]={user,message};
            //messages[messages.length]={user,message};
            //setAtendimentos(messages=>[...messages, {user, message}])

            //console.log("message received: ", message);
        });
        

        socketconn.connection.onclose(() => {
            socketconn.connection=undefined;
            socketconn.messages = [];
            socketconn.connectedUsers = [];
        })
        await socketconn.connection.start();

        await socketconn.connection.invoke("JoinRoom", { user, room });
        //return conn;
        return socketconn;
    }
    catch (e) {
        return socketconn;
    }
}

export const closeConnection = async (socketconn: SocketConnection) => {
    try {
        if(socketconn?.connection){
            await socketconn.connection.stop();
        }
    }
    catch (e) {

    }
}

export const sendMessage = async (socketconn: SocketConnection, message: any) => {
    try {
        if(socketconn?.connection){
            await socketconn.connection.invoke("SendMessage", message);
            socketconn.isUpdate=false;
        }
    }
    catch (e) {
        console.log(e);
    }
}
