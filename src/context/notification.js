// src/FunctionContext.js
import React, { createContext, useState, useContext } from "react";

const FunctionContext = createContext();

export const FunctionProvider = ({ children }) => {
  const [isFunctionEnabled, setIsFunctionEnabled] = useState(true);

  return (
    <FunctionContext.Provider
      value={{ isFunctionEnabled, setIsFunctionEnabled }}
    >
      {children}
    </FunctionContext.Provider>
  );
};

export const useFunctionContext = () => useContext(FunctionContext);
