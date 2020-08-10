import { getStatus } from "./utils/getStatus";

type Callback = (data: monitor.Item[]) => void | Promise<void>

export class Monitor {
    private _onDateUpdatedCallbacks: Callback[] = [];
    private _data: monitor.Item[] = [];

    constructor(){
        this.updateData();
    }

    public get data() {
        return this._data;
    }

    public get lastUpdate() {
        return new Date();
    }

    public async reset(id: string): Promise<void> {
        const item = this.data.find(item => item.id === id);

        if (!item) return;

        await this.updateData();
    };

    public async updateData() {
        const data = await getStatus();
        this._data = data;
        this._onDateUpdatedCallbacks.forEach(cb => cb(data));
    };

    public onDataUpdated(cb: Callback) {
        this._onDateUpdatedCallbacks.push(cb);
        cb(this.data)
    }
}