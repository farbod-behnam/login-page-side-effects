export interface Auth {
    isLoggedIn: boolean;
    onLogout: () => void;
}