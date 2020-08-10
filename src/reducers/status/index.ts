export interface SetIsWaitingForReset {
    type: "setIsWaitingForReset";
    id: string;
    isWaitingForReset: boolean;
}

export interface UpdateData {
    type: "updateData";
    data: monitor.Item[];
}

const ACTIONS = {
    SET_IS_LOADING: "setIsWaitingForReset",
    UPDATE_DATA: "updateData"
};

export type Action = SetIsWaitingForReset | UpdateData;

export function dataReducer(state: monitor.Status, action: Action) {
    switch (action.type) {
        case ACTIONS.SET_IS_LOADING:
            const { id, isWaitingForReset } = action as SetIsWaitingForReset
            const { data } = state;
            const item = data.find(_ => _.id === id) as monitor.Item;
            const newItem = { ...item, isWaitingForReset }

            return {
                ...state,
                data: updateItem(data, newItem),
            };
        case ACTIONS.UPDATE_DATA: {
            const { data } = action as UpdateData;

            return {
                ...state,
                data: mergeArrays(data, state.data)
            }
        }
        // ... other actions ...
        default:
            return state;
    }
}

const updateItem = (arr: monitor.Item[], newItem: monitor.Item) =>
    [...arr.filter(item => item.id !== newItem.id), newItem].sort((a, b) => a.id.localeCompare(b.id));

function mergeArrays(curr: monitor.Item[], prev: monitor.Item[]) {
    const map = new Map(prev.map(_ => [_.id, _]));

    curr.forEach(item => {
        const prevItem = map.get(item.id);
        map.set(item.id, { ...prevItem, ...item });
    })

    return Array.from(map.values()).sort((a, b) => a.id.localeCompare(b.id));
}
