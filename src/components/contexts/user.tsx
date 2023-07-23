import { Record } from "pocketbase";
import {
  Accessor,
  JSX,
  createContext,
  createSignal,
  useContext,
} from "solid-js";
import { pb } from "~/services/pocketbase";

const UserContext = createContext();

export interface UserProviderProps {
  children: JSX.Element;
  user: Record | undefined;
}

export function UserProvider(props: UserProviderProps) {
  const [user, setUser] = createSignal(props.user || undefined);

  const currentUser = [
    user,
    {
      setCurrentUser(user: Record) {
        setUser(user);
      },
      logout() {
        pb.authStore.clear();
        setUser(undefined);
      },
    },
  ];

  return (
    <UserContext.Provider value={currentUser}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useCurrentUser(): [Accessor<Record | undefined>, any] {
  return useContext<any>(UserContext);
}
