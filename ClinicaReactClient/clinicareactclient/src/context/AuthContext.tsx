import React, { createContext, useState, ReactNode } from 'react'
const AuthContext:React.Context<{}>=createContext({});
export const AuthProvider=({children}:any)=>{
    const [user, setUser]=useState<string>("");

    return(
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;