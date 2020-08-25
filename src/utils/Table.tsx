import React, { useState, useEffect } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import styled from 'styled-components';

interface Props {
    columns: any;
    data: any;
    initialState?: any
}

const TableStyles = styled.div`
padding: 1rem;

table {
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    border-collapse: collapse;

    th {
    vertical-align: baseline;
    }
    .title{
        display: flex;
        justify-content: center;
        vertical-align: baseline;
        padding-top: 12px;
        padding-bottom: 12px;
        background-color:#4d94ff;
        color: white
    }

  tr{
    :nth-child(even){background-color: #f2f2f2;}
    :hover {background-color: #ddd;}
  }

  td {
    border: 1px solid #ddd;
    padding: 8px;

    :last-child {
      border-right: 0;
    }
  }
}
`

export function Table({ initialState, columns, data }: Props) {
    const [initTableState, setInitTableState] = useState(initialState || []);

    const defaultColumn: any = React.useMemo(() => ({
        // Let's set up our default Filter UI
        Filter: () => (<div></div>)
    }), []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state } =
        useTable({ columns, data, defaultColumn, initialState: initTableState }, useFilters, useSortBy);

    useEffect(() => setInitTableState(state), [state]); // Becuase react-table resets filters and sort when data is updated

    return <TableStyles>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column: any) => (
                            <th >
                                <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    <div className="title">
                                        {column.render('Header')}
                                        <SortArrow column={column} />
                                    </div>
                                </div>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </TableStyles>;
}

function SortArrow({ column }: { column: any }) {
    return <div className="sort-arrow" style={{ minWidth: "20px" }}>
        {column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : " "}
    </div>
}