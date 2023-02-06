import { GridEnrichedColDef } from '../DataGridPro'
import { PINNED_COLUMN } from '../DataGrid'

export const checkIsPinnedColumn = (column: GridEnrichedColDef) => {
  return Object.values(PINNED_COLUMN).includes(column.pinnedColumn as PINNED_COLUMN)
}
