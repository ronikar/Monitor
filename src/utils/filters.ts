import { FilterType } from "react-table"

export const text: FilterType<String> = (rows, ids, filterValue) => {
    rows = rows.filter(row => {
      return ids.some(id => {
        const rowValue = row.values[id]
        return String(rowValue)
          .toLowerCase()
          .includes(String(filterValue).toLowerCase())
      })
    })
    return rows
  }