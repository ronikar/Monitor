import { UpdateData, SetIsWaitingForReset } from "./index";

export function setIsWaitingForResetAction(id: string, isWaitingForReset: boolean): SetIsWaitingForReset {
    return { type: "setIsWaitingForReset", id, isWaitingForReset };
};

export function updateDataAction(data: monitor.Item[]): UpdateData {
    return { type: "updateData", data }
};