/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect } from "react";

import useFetch from "./hooks/use-fetch";
import { getCurrentuser } from "./db/apiAuth";
const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentuser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
