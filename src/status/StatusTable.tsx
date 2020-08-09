import React, { useEffect, useCallback } from "react";
import styled from 'styled-components';
import { CellProps } from "react-table";
import { Clear } from '@material-ui/icons';

import { Table } from "../utils/Table";
import { useMonitor } from "../conext/MonitorContext";
import { updateDataAction, setIsLoadingAction } from "../reducers/status/actions";
import { useStatusReducer } from "../reducers/status";

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
  const [status, dispatch] = useStatusReducer();

  useEffect(() => monitor.onDataUpdated(data => dispatch(updateDataAction(data))), []);

  const onResetClick = async (id: string) => {
    dispatch(setIsLoadingAction(id, true));
    await monitor.reset(id);
    dispatch(setIsLoadingAction(id, false));
  };

  const createCloseButton = ({ row: { original } }: CellProps<monitor.Item>) => {
    return <Clear className="close-btn" onClick={() => onResetClick(original.id)} />
  };

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
      Cell: createCloseButton
    }
  ], []);

  return monitor && <Styles>
    <Table columns={columns} data={status.data}></Table>
  </Styles>;
}