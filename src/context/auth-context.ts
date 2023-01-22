import React from "react";
import { Auth } from "../models/Auth.model";

const AuthContext = React.createContext<Auth>(new Auth(false));

export default AuthContext;