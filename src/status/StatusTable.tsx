import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import { CellProps } from "react-table";
import { Clear } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Table } from "../utils/Table";
import { useMonitor } from "../conext/MonitorContext";

const Styles = styled.div`
padding: 1rem;

table {
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    border-collapse: collapse;

    th {
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: #4d94ff;
    color: white;
  }

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
  const [status, setStatus] = useState({ data: monitor.data});

  useEffect(() => monitor.onDataUpdated(data => setStatus({data})), [monitor]);

  const columns = React.useMemo(() => [
    {
      Header: 'מזהה',
      accessor: 'id',
    },
    {
      Header: 'שם',
      accessor: 'name',
    },
    {
      Header: 'פורט',
      accessor: 'port',
    },
    {
      Header: "איפוס",
      Cell: CloseButton,
      getProps: () => ({ onResetClick:  monitor.reset }) //Add custom properties to cell
    }
  ], []);

  return monitor && <Styles>
    <Table columns={columns} data={status.data}></Table>
  </Styles>;
}

function CloseButton({ column, row: { original: { id } } }: CellProps<monitor.Item>) {
  const [isClosing, setIsClosing] = useState<boolean>();
  const { onResetClick } = (column as any).getProps(); // TODO: Create interface for that

  const onClick = (id: string) => {
    setIsClosing(true);
    onResetClick(id).then(() => setIsClosing(false));
  };

  return isClosing ? <CircularProgress size="24px" /> : <Clear className="close-btn" onClick={() => onClick(id)} />
}