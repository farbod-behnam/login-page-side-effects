import React from "react";
import { Auth } from "../interfaces/Auth.interface";

const AuthContext = React.createContext<Auth>({
    isLoggedIn: false, 
    onLogout: () => {}, 
    onLogin: (email: string, password: string) => {}
});


export default AuthContext;