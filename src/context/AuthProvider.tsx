import { ReactNode, createContext, useState } from "react";

interface IAuth {
  username: string;
  accessToken: string;
  roles: string[];
}

interface IAuthContext {
  auth: IAuth;
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<IAuth>({
    username: "",
    accessToken: "",
    roles: [""],
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
