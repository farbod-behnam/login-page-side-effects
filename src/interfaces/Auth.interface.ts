export interface Auth {
    isLoggedIn: boolean;
    onLogin: (email: string, password: string) => void;
    onLogout: () => void;
}