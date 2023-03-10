import { ReactNode, useEffect, useState } from "react";
import AuthContext from "../../context/auth-context";

interface Props {
    children: ReactNode;
}

export default function AuthContextProvider(props: Props) {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

        if (storedUserLoggedInInformation === "1")
            setIsLoggedIn(true);

    }, [])

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}>{props.children}</AuthContext.Provider>
    );
}