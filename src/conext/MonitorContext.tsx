import React, { useContext, useState, createContext, useEffect } from "react";
import { getStatus } from "../utils/getStatus";
import { Monitor } from "../utils/Monitor";

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