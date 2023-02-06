import * as React from 'react'
import {
  GridHydrateRowsValue,
  GridPipeProcessor,
  useGridRegisterPipeProcessor,
} from '@mui/x-data-grid/internals'
import { GridRowEntry, GridRowId, GridRowModel } from '@mui/x-data-grid'
import { GridApiPro } from '../../../models/gridApiPro'
import { GridPinnedRowsProp } from './gridRowPinningInterface'

type GridPinnedRowPosition = keyof GridPinnedRowsProp

export function addPinnedRow({
  groupingParams,
  rowModel,
  rowId,
  position,
  apiRef,
}: {
  groupingParams: GridHydrateRowsValue
  rowModel: GridRowModel
  rowId: GridRowId
  position: GridPinnedRowPosition
  apiRef: React.MutableRefObject<GridApiPro>
}) {
  const idRowsLookup = { ...groupingParams.idRowsLookup }
  const tree = { ...groupingParams.tree }

  // TODO: warn if id is already present in `props.rows`
  idRowsLookup[rowId] = rowModel
  // Do not push it to ids list so that pagination is not affected by pinned rows
  // ids.push(rowId);
  tree[rowId] = {
    id: rowId,
    isAutoGenerated: false,
    parent: null,
    depth: 0,
    groupingKey: null,
    groupingField: null,
    isPinned: true,
  }

  apiRef.current.unstable_caches.rows.idRowsLookup[rowId] = { ...rowModel }
  apiRef.current.unstable_caches.rows.idToIdLookup[rowId] = rowId

  const previousPinnedRows = groupingParams.additionalRowGroups?.pinnedRows || {}

  const newPinnedRow: GridRowEntry = { id: rowId, model: rowModel }

  return {
    ...groupingParams,
    idRowsLookup,
    tree,
    additionalRowGroups: {
      ...groupingParams.additionalRowGroups,
      pinnedRows: {
        ...previousPinnedRows,
        [position]: [...(previousPinnedRows[position] || []), newPinnedRow],
      },
    },
  }
}

export const useGridRowPinningPreProcessors = (apiRef: React.MutableRefObject<GridApiPro>) => {
  const addPinnedRows = React.useCallback<GridPipeProcessor<'hydrateRows'>>(
    groupingParams => {
      const pinnedRowsCache = apiRef.current.unstable_caches.pinnedRows || {}

      let newGroupingParams = {
        ...groupingParams,
        additionalRowGroups: {
          ...groupingParams.additionalRowGroups,
          // reset pinned rows state
          pinnedRows: {},
        },
      }

      pinnedRowsCache.topIds?.forEach(rowId => {
        newGroupingParams = addPinnedRow({
          groupingParams: newGroupingParams,
          rowModel: pinnedRowsCache.idLookup[rowId],
          rowId,
          position: 'top',
          apiRef,
        })
      })
      pinnedRowsCache.bottomIds?.forEach(rowId => {
        newGroupingParams = addPinnedRow({
          groupingParams: newGroupingParams,
          rowModel: pinnedRowsCache.idLookup[rowId],
          rowId,
          position: 'bottom',
          apiRef,
        })
      })

      // If row with the same `id` is present both in `rows` and `pinnedRows` - remove it from `ids`
      newGroupingParams.ids = newGroupingParams.ids.filter(rowId => {
        if (newGroupingParams.tree[rowId] && newGroupingParams.tree[rowId].isPinned) {
          return false
        }
        return true
      })

      return newGroupingParams
    },
    [apiRef]
  )

  useGridRegisterPipeProcessor(apiRef, 'hydrateRows', addPinnedRows)
}
