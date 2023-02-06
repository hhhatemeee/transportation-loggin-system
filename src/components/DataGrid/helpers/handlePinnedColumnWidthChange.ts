import { GridColumnResizeParams, GridColumns } from '../DataGridPro'
import { MutableRefObject } from 'react'
import { GridApiPro } from '../DataGridPro/models/gridApiPro'
import { checkIsPinnedColumn } from './checkIsPinnedColumn'

const calculateColumnsWidth = (
  columns: GridColumns,
  resizedColumnParams: GridColumnResizeParams
): number => {
  return columns
    .map(col =>
      col.field === resizedColumnParams.colDef.field
        ? resizedColumnParams.width
        : col.width ?? (col.minWidth || 0)
    )
    .reduce((a, b) => a + b)
}

export const handlePinnedColumnWidthChange = (
  columns: GridColumns,
  tableWidth: number,
  resizedColumnParams: GridColumnResizeParams,
  apiRef: MutableRefObject<GridApiPro>
) => {
  const pinnedColumns = columns.filter(col => col.pinnedColumn)
  const pinnedColumnsWidth = calculateColumnsWidth(
    pinnedColumns.filter(col => checkIsPinnedColumn(col)),
    resizedColumnParams
  )
  const offset = 30
  const freeSpaceWidth = tableWidth - offset - pinnedColumnsWidth
  const isOutOfBounds = pinnedColumnsWidth > tableWidth - offset
  if (isOutOfBounds) {
    apiRef.current.setColumnWidth(
      resizedColumnParams.colDef.field,
      freeSpaceWidth + resizedColumnParams.width
    )
  }
}
