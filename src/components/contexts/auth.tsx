import { JSX, createContext, createSignal, useContext } from "solid-js";
import { AuthUser } from "~/models/authUser.model";

const AuthContext = createContext();

export interface AuthProviderI {
  auth?: AuthUser;
  children: JSX.Element;
}

export const AuthProvider = (props: AuthProviderI) => {
  const [auth, setAuth] = createSignal(
    JSON.parse(localStorage.getItem("pocketbase_auth")!)
  );
  const authUser = [
    auth,
    {
      setAuth(auth: AuthUser) {
        setAuth(auth);
      },
    },
  ];
  return (
    <AuthContext.Provider value={authUser}>
      {props.children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
