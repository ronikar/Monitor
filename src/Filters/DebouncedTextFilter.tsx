import React from "react";
import { UseFiltersColumnProps, useAsyncDebounce } from "react-table";

export function DebouncedTextFilter<D extends object>({ column: { filterValue, setFilter }, }: { column: UseFiltersColumnProps<D> }) {
    const [value, setValue] = React.useState(filterValue);

    const debouncedSetFilter = useAsyncDebounce(value => setFilter(value), 200);

    return <input value={value || ''}
        onChange={e => {
            setValue(e.target.value);
            debouncedSetFilter(e.target.value || undefined);
        }}
        placeholder={`הכנס טקסט...`} />;
}
