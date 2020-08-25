import React, { useEffect, useState, useMemo } from "react";
import styled from 'styled-components';

import { CellProps } from "react-table";
import { Clear } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Table } from "./utils/Table";
import { useMonitor } from "./conext/MonitorContext";
import { TextFilter } from "./Filters/TextFilter";
import { DebouncedTextFilter } from "./Filters/DebouncedTextFilter";
import { SelectColumnFilter } from "./Filters/SelectFilter";

const StatusTableStyles = styled.div`
padding: 1rem;

table {
  .close-btn{
    cursor: pointer;
    color: red;

    :hover{
        font-size: 1.5rem;
    }
  }
}
`

export function StatusTable() {
  const monitor = useMonitor();
  const [status, setStatus] = useState({ data: monitor.data });

  useEffect(() => monitor.onDataUpdated(data => setStatus({ data })), [monitor]);

  const columns = React.useMemo(() => [
    {
      Header: 'מזהה',
      accessor: 'id',
      filter: 'text',
      Filter: TextFilter
    },
    {
      Header: 'שם',
      accessor: 'name',
      filter: 'text',
      Filter: DebouncedTextFilter,
      disableSortBy: true
    },
    {
      Header: 'פורט',
      accessor: 'port',
    },
    {
      Header: 'סטטוס הזרמה',
      accessor: 'streamStatus',
      Filter: SelectColumnFilter,
      filter: 'equals'
    },
    {
      Header: "איפוס",
      Cell: CloseButton,
      getProps: () => ({ onResetClick: monitor.reset }) //Add custom properties to cell
    }
  ], []);

  const initialState: any = useMemo(() => ({
    sortBy: [{ id: 'id', desc: false }]
  }), []);

  return !monitor || status.data.length == 0 ? <CircularProgress size="60px" style={{ marginTop: "30px" }} /> :
    <StatusTableStyles>
      <Table columns={columns} data={status.data} initialState={initialState}></Table>
    </StatusTableStyles>;
}

function CloseButton({ column, row: { original: { id } } }: CellProps<monitor.Item>) {
  const [isClosing, setIsClosing] = useState<boolean>();
  const { onResetClick } = (column as any).getProps(); // TODO: Create interface for that

  const onClick = async (id: string) => {
    setIsClosing(true);
    await onResetClick(id)
    setIsClosing(false);
  };

  return isClosing ? <CircularProgress size="24px" /> : <Clear className="close-btn" onClick={() => onClick(id)} />
}