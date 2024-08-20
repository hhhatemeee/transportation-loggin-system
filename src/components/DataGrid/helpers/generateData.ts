import { GridColumns } from '@mui/x-data-grid'

const uuid = () => Math.random().toString(16).slice(2)

export const generateColumns = (count: number): GridColumns =>
  Array.from(Array(count).keys()).map(pos => ({
    field: `Columns_${pos}`,
    headerName: `Columns ${pos}`,
    sortKey: `Columns_${pos}`,
    sortable: true,
    flex: 1,
    minWidth: 100,
    hideable: true,
    pinnedColumn: null,
  }))

export const generateRows = (count: number, columns: GridColumns) =>
  Array.from(Array(count).keys()).map(rowIndex =>
    columns.reduce(
      (obj, item, colIndex) => ((obj[item.field] = `Cell [${rowIndex}:${colIndex}]`), obj),
      { id: uuid() } as Record<string, string>
    )
  )
