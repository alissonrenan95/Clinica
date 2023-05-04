import React, { createContext, useState, ReactNode } from 'react'
import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr';
import { SocketConnection } from '../dto/SocketConnection';

const URL_BASE_SOCKET_CONNECTION_ATENDIMENTOS = "https://192.168.0.10:7102/ws/atendimentos";


const SocketContext:React.Context<{}>=createContext({});
export const SocketProvider=({children}:any)=>{
    const [socketconnection, setSocketconnection]=useState<SocketConnection>();
    const [isupdate, setIsupdate]=useState<boolean>();

    



    //Implementação abaixo de socket usando signalr

    const joinRoom = async (user: string, room: string) => {
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
                //socketconn.isUpdate = false;
                socketconn.messages[socketconn.messages.length]={user,message};
                setIsupdate(!isupdate);
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
            setSocketconnection(socketconn);
        }
        catch (e) {
            setSocketconnection(socketconn);
        }
    }
    
    const closeConnection = async (socketconn: SocketConnection) => {
        try {
            if(socketconn?.connection){
                await socketconn.connection.stop();
                setSocketconnection(undefined);
            }
        }
        catch (e) {
    
        }
    }
    
    const sendMessage = async (socketconn: SocketConnection, message: any) => {
        try {
            if(socketconn?.connection){
                await socketconn.connection.invoke("SendMessage", message);
                
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    return(
        <SocketContext.Provider value={{socketconnection, joinRoom, closeConnection, sendMessage, isupdate}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;






