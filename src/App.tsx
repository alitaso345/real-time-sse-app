import * as React from 'react'
import { useMemo } from 'react'
import { useTable, Column } from 'react-table'

import { getInitialFlightData, Data } from './DataProvider'

type TableProps = {
  columns: Column<Data>[]
  data: Data[]
}

const Table: React.FC<TableProps> = ({columns, data}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
  )
}


const App: React.FC = () => {
  const columns: Column<Data>[] = useMemo(
    () => [
      {
        Header: "Origin",
        accessor: "origin"
      },
      {
        Header: "Flight",
        accessor: "flight"
      },
      {
        Header: "Arrival",
        accessor: "arrival"
      },
      {
        Header: "State",
        accessor: "state"
      }
    ],
    []
  )
  const data = useMemo(() => getInitialFlightData(), [])

  return (
    <Table 
      columns={columns}
      data={data}
    />
  )
}

export default App