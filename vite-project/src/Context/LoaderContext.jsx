// src/context/LoaderContext.js
import React, { createContext, useContext, useState } from 'react';

const LoaderContext = createContext();
console.log(LoaderContext,"Lode");


export const Loader = () => {
  const context = useContext(LoaderContext);
  console.log(context,"context");
  
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};
