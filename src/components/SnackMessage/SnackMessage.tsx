import { FC } from 'react'

import { Snackbar } from '../Snackbar'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { SNACK_LIFETIME } from '../../constants'
import { hideMessage } from '../../redux/reducers/snackbar.reducer'

export const SnackMessage: FC = () => {
  const snack = useAppSelector(state => state.snackbar)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(hideMessage())
  }

  return (
    <Snackbar
      type={snack.type}
      statusCode={snack.statusCode}
      message={snack.message}
      open={snack.show}
      onClose={handleClose}
      autoHideDuration={SNACK_LIFETIME}
    />
  )
}
