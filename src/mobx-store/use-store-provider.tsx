"use client";
import React, { ReactElement, useEffect } from "react";
import gameStateStore from "./store";

export const StoreContext = React.createContext(gameStateStore);

export const StoreProvider = ({ children }: { children: ReactElement }) => {
  return <StoreContext.Provider value={gameStateStore}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const store = React.useContext(StoreContext);

  useEffect(() => {
    store.loadStore();
  }, []);

  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return store; //as typeof gameStateStore;
};
