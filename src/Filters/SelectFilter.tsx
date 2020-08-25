import React from "react";
import { UseFiltersColumnProps } from "react-table";

export function SelectColumnFilter<D extends object>({ column: { filterValue, setFilter, preFilteredRows, id }} : { column:  UseFiltersColumnProps<D> & {id:any} }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options: any[] = React.useMemo(() => {
      const optionSet = new Set()
      preFilteredRows.forEach(row => {
        optionSet.add(row.values[id])
      });

      return Array.from(optionSet.values());
    }, [id, preFilteredRows])
  
    return <select value={filterValue}
        onChange={e => setFilter(e.target.value || undefined)}>
        <option value="">All</option>
        {options.map((option, i) => <option key={i} value={option}>
            {option}
          </option>)}
      </select>
  }