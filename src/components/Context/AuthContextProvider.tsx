import { Children, ReactNode } from "react";
import AuthContext from "../../context/auth-context";
import { Auth } from "../../interfaces/Auth.interface";

interface Props {
    children: ReactNode;
    value: Auth;
}

export default function AuthContextProvider(props: Props) {

    return (
        <AuthContext.Provider value={props.value}>{props.children}</AuthContext.Provider>
    );
}