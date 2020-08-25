const examples = [{
    id: "1",
    name: "1דוגמה",
    port: 8000,
    numberOfConnections: 100,
    uniqueUsers: 10,
    numberOfAuthRequests: 20,
    streamStatus: "closed"
},
{
    id: "2",
    name: "2דוגמה",
    port: 8000,
    numberOfConnections: 100,
    uniqueUsers: 10,
    numberOfAuthRequests: 20,
    streamStatus: "streaming"
}];

export async function getStatus(): Promise<monitor.Item[]> {
    return new Promise((resolve) => {
        const data = [{ ...examples[0] }, { ...examples[1] }];
        setTimeout(() => resolve(data), 2000);
    })
}