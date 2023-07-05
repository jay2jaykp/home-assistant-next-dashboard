import axios from "axios";
import React, { PropsWithChildren, createContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext<{
  token: IToken | null;
  generateToken: (code: string) => void;
}>({
  token: null,
  generateToken: () => null,
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<IToken | null>(null);

  const generateToken = async (code: string) => {
    if (!code) return console.error("No code provided");
    const data = await 
    // const res = await axios.post(
    //   "http://localhost:8123/auth/token",

    //   {
    //     grant_type: "authorization_code",
    //     code: code,
    //     client_id: "http://localhost:5173",
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   }
    // );
    // if (res.status === 200) {
    //   setToken(res.data);
    //   navigate("/");
    // }
  };

  useEffect(() => {
    const tokenInjector = api.interceptors.request.use(async (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token.access_token}`;
      }
      return config;
    });
    return () => {
      api.interceptors.request.eject(tokenInjector);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, generateToken }}>
      {children}
    </AuthContext.Provider>
  );
};
