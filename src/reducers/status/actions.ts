import { UpdateData, SetIsLoading } from "./index";

export function setIsLoadingAction(id: string, isLoading: boolean): SetIsLoading {
    return { type: "setIsLoading", id, isLoading };
};

export function updateDataAction(data: monitor.Item[]): UpdateData {
    return { type: "updateData", data }
};