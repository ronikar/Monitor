const examples = [{
    id: "1",
    name: "דוגמה",
    port: 8000,
    numberOfConnections: 100,
    uniqueUsers: 10,
    numberOfAuthRequests: 20
},
{
    id: "2",
    name: "דוגמה",
    port: 8000,
    numberOfConnections: 100,
    uniqueUsers: 10,
    numberOfAuthRequests: 20
}];

export async function getStatus(): Promise<monitor.Item[]> {

    return new Promise((resolve) => {
        const data = [{ ...examples[0] }, { ...examples[1] }];
        setTimeout(() => resolve(data), 2000);
    })
}