export function getStatus(): monitor.Item[] {
    return [{
        id: "1",
        name: "דוגמה",
        port: 8000,
        numberOfConnections: 100,
        uniqueUsers:10,
        numberOfAuthRequests:20
    },
    {
        id: "2",
        name: "דוגמה",
        port: 8000,
        numberOfConnections: 100,
        uniqueUsers:10,
        numberOfAuthRequests:20
    }];
}