import { ChangeEvent, CSSProperties, FC, useEffect, useMemo, useState } from 'react'

import { ContentCopy, Delete, Edit } from '@mui/icons-material'
import {
  DataGridPro as MUIDataGrid,
  DataGridProProps as MUIDataGridProps,
  GridActionsCellItem,
  GridArrowDownwardIcon,
  GridCallbackDetails,
  GridCellParams,
  GridColumns,
  GridEnrichedColDef,
  gridPageCountSelector,
  gridPageSelector,
  GridSortModel,
  useGridApiContext,
  useGridApiRef,
  useGridSelector,
} from './DataGridPro'
import { Box, Checkbox, LinearProgress, Pagination } from '@mui/material'
import { ElementSize, GridEventListener } from '@mui/x-data-grid'

import { checkIsPinnedColumn, handlePinnedColumnWidthChange } from './helpers'

declare module '@mui/x-data-grid' {
  interface GridColDef {
    sortKey?: string
    pinnedColumn?: PINNED_COLUMN | null
  }
}

export enum PINNED_COLUMN {
  LEFT = 'left',
  RIGHT = 'right',
}

export type ColumnOrder = {
  field: string
  order: number
}

export type DataGridProps = {
  onChangePage?: (event: ChangeEvent<unknown>, value: number) => void
  showActionsColumn?: boolean
  onEdit?: (params: GridCellParams) => void
  onDelete?: (params: GridCellParams) => void
  rowHoverCursor?: CSSProperties['cursor']
  onSortModelChange?: (model: GridSortModel | null, details?: GridCallbackDetails) => void
  fetchNextPage?: MUIDataGridProps['onRowsScrollEnd']
  pageCount?: number
  enableMultiSort?: boolean
  onCopy?: (props: GridCellParams) => void
  visibilityBadgeSort?: boolean
  visibility?: boolean
  onVisibility?: (params: GridCellParams, checked: boolean) => void
  onCustomColumnOrderChange?: (columns: ColumnOrder[]) => void
} & MUIDataGridProps

const CustomPagination: FC = () => {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <Pagination
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  )
}

export const DataGrid: FC<DataGridProps> = ({
  onEdit,
  onDelete,
  showActionsColumn,
  columns,
  rowHoverCursor = 'default',
  sortModel,
  onSortModelChange,
  fetchNextPage,
  headerHeight = 56,
  rowHeight = 52,
  enableMultiSort = false,
  visibilityBadgeSort = false,
  onCopy,
  visibility = false,
  onVisibility,
  sx,
  onCustomColumnOrderChange,
  apiRef: outerApiRef,
  ...props
}) => {
  const innerApiRef = useGridApiRef()
  const apiRef = outerApiRef || innerApiRef
  const colVisible = {
    field: 'visibility',
    headerName: 'Visibility',
    type: 'visibily',
    alight: 'left',
    minWidth: 60,
    width: 100,
    renderCell: (params: GridCellParams) => (
      <Checkbox
        checked={params.row.visibility}
        onChange={(_e, checked) => onVisibility?.(params, checked)}
      />
    ),
  } as GridEnrichedColDef

  const colWithActions = {
    field: 'actions',
    type: 'actions',
    align: 'right',
    minWidth: onCopy ? 150 : 100,
    resizable: false,
    pinnedColumn: PINNED_COLUMN.RIGHT, // Для промежуточных расчётов. Не влияет на реальное закрепление.
    getActions: (params: GridCellParams) => [
      ...(onCopy
        ? [
            <GridActionsCellItem
              key={params.id}
              icon={<ContentCopy />}
              label={'Copy'}
              onClick={() => onCopy?.(params)}
              showInMenu={false}
            />,
          ]
        : []),
      <GridActionsCellItem
        key={params.id}
        icon={<Edit />}
        label={'Edit'}
        onClick={() => onEdit?.(params)}
        showInMenu={false}
      />,
      <GridActionsCellItem
        key={params.id}
        icon={<Delete />}
        label={'Delete'}
        onClick={() => onDelete?.(params)}
        showInMenu={false}
      />,
    ],
  } as GridEnrichedColDef

  const columnsWithTitle = useMemo(
    () =>
      columns.map(col => ({
        ...col,
        // TODO разобраться с тайтлами. Перебивает renderCell для jsx и js
        // ...(col.headerClassName !== TABLE_DESCRIPTION.MODIFY && {
        //   renderCell: (params: GridCellParams) => (
        //     <span title={params.row[params.field]}>{params.row[params.field]}</span>
        //   ),
        // }),
      })),
    [columns]
  )
  const [stateColumns, setStateColumns] = useState<GridColumns>([])
  const [tableWidth, setTableWidth] = useState(0)

  const gridColumns: GridColumns = useMemo(
    () => [
      ...(visibility ? [colVisible] : []),
      ...columnsWithTitle,
      ...(showActionsColumn ? [colWithActions] : []),
    ],
    [columnsWithTitle, showActionsColumn]
  )

  useEffect(() => {
    setStateColumns(gridColumns)
  }, [gridColumns])

  const defaultProps: Omit<MUIDataGridProps, 'columns' | 'rows'> = {
    // autoHeight: true,
    rowsPerPageOptions: [5],
    disableColumnMenu: true,
    disableSelectionOnClick: true,
    disableColumnResize: true,
    disableColumnReorder: true,
    // rowThreshold: 50,
    components: {
      Pagination: CustomPagination,
      LoadingOverlay: LinearProgress,
      ColumnSortedDescendingIcon: () => (
        <GridArrowDownwardIcon
          sx={{ fontSize: 'inherit' }}
          onClick={() => {
            if (sortModel && sortModel[0]) {
              onSortModelChange?.(null)
            }
          }}
        />
      ),
    },
    sx: {
      '.MuiDataGrid-virtualScroller': {
        // overflowX: 'auto !important',
      },
      '.MuiDataGrid-cell:focus': {
        outline: 'none',
      },
      '.MuiDataGrid-cell:hover': {
        cursor: rowHoverCursor,
      },
      '.MuiDataGrid-cell': {
        outline: 'none',
      },
      '.MuiDataGrid-cell--withRenderer': {
        '&.MuiDataGrid-cell--textRight': {
          outline: 'none',
        },
      },
      '.MuiDataGrid-virtualScrollerContent': {
        // height: `${(pageSize ?? 10) * 52}px !important`,
        // opacity: props.loading ? 0 : 1,
      },
      '.MuiDataGrid-columnHeader': {
        '&:focus-within,': {
          outline: 'none',
          '.MuiDataGrid-cell': {
            '&:focus-within': {
              outline: 'none',
            },
          },
        },
      },
      '.MuiDataGrid-cell:focus-within': {
        outline: 'none',
      },
      '.MuiDataGrid-pinnedColumns, .MuiDataGrid-pinnedColumnHeaders	': {
        backgroundColor: theme => theme.palette.background.paper,
      },
      '.MuiBadge-badge': {
        right: 10,
      },
      '.MuiBadge-root': {
        visibility: visibilityBadgeSort ? 'hidden' : 'initial',
      },
      '.MuiButtonBase-root': {
        visibility: visibilityBadgeSort ? 'hidden' : 'initial',
      },
      ...sx,
    },
  }

  const handleOnRowsScrollEnd: MUIDataGridProps['onRowsScrollEnd'] = (...params) => {
    if ((props.page || 0) + 1 < (props.pageCount || 0)) {
      fetchNextPage?.(...params)
    }
  }

  const handleColumnOrderChange = () => {
    onCustomColumnOrderChange?.(
      apiRef.current.state.columns.all.map((field, index) => ({
        field,
        order: index,
      }))
    )
  }

  const handleColumnWidthChange: GridEventListener<'columnWidthChange'> = params => {
    const allColumns = apiRef.current.getAllColumns()
    const isPinnedColumn = checkIsPinnedColumn(params.colDef)
    if (isPinnedColumn) {
      handlePinnedColumnWidthChange(allColumns, tableWidth, params, apiRef)
    }
  }

  const handleResize = ({ width }: ElementSize) => {
    setTableWidth(width)
  }

  const tableHeight =
    headerHeight + rowHeight * (props.pageSize || 10) + (props.hideFooter ? 0 : rowHeight)

  return (
    <Box sx={{ width: '100%', height: tableHeight }} data-testid='datagrid'>
      <MUIDataGrid
        {...defaultProps}
        {...props}
        columns={stateColumns}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        onRowsScrollEnd={(...params) => {
          handleOnRowsScrollEnd(...params)
        }}
        headerHeight={headerHeight}
        rowHeight={rowHeight}
        disableMultipleColumnsSorting={!enableMultiSort}
        onColumnOrderChange={handleColumnOrderChange}
        apiRef={apiRef}
        onColumnWidthChange={handleColumnWidthChange}
        onResize={handleResize}
      />
    </Box>
  )
}
