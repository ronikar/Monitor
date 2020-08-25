import React from "react";
import { UseFiltersColumnProps } from "react-table";

export function TextFilter<D extends object>({ column: { filterValue, setFilter } }: { column: UseFiltersColumnProps<D> }) {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => 
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely

    return <input value={filterValue || ''}
        onChange={onChange}
        placeholder={`הכנס טקסט...`}
    />;
}