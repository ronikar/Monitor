/// <reference types="react-scripts" />

declare namespace monitor{
    interface Item {
        id: string;
        name: string;
        port: number;
        numberOfConnections: number;
        uniqueUsers: number;
        numberOfAuthRequests: number;
    }

    interface Status{
        data: monitor.Item[],
        lastUpdate?: Date;
    }
}