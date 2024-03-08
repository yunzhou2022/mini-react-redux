import { React } from "./react";
import { Store } from "redux";

export const Context = React.createContext<Store>(null);

export const Provider: React.FC<React.PropsWithChildren<{ store: Store }>> = ({
  store,
  children,
}) => <Context.Provider value={store}>{children}</Context.Provider>;
