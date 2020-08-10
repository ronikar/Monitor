import React, { useContext, createContext } from "react";
import { Monitor } from "../Monitor";

export interface ContextProps {
    date: Date;
    data: monitor.Item[];
    close: (id: string) => void;
}

const MONITOR = new Monitor();

const MonitorContext = createContext<Monitor>(MONITOR);

export function ProvideMonitor({ children }: any) {
    return <MonitorContext.Provider value={MONITOR}>{children}</MonitorContext.Provider>;
}

export const useMonitor = () => {
    return useContext(MonitorContext);
};