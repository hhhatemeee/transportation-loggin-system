import { Close } from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  Modal,
  Skeleton,
  SxProps,
  Typography,
} from '@mui/material'
import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../Button'

const containerStyle: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  minWidth: 540,
  boxShadow: 24,
  p: 4,
  pt: 2,
  pb: 2,
  borderRadius: 1,
}

const closeIconStyle: SxProps = {
  cursor: 'pointer',
}

type ModalWrapperProps = {
  children?: ReactNode
  title?: ReactNode | string
  isShow: boolean
  onClose: (value: boolean) => void
  onSave?: () => void
  btnText?: string
  cancelBtnText?: string
  disabledSave?: boolean
  hideDivider?: boolean
  loading?: boolean
  maxWidth?: number
  width?: number
}

export const ModalWrapper: FC<ModalWrapperProps> = ({
  children,
  title,
  isShow,
  onClose,
  onSave,
  btnText,
  cancelBtnText,
  disabledSave,
  hideDivider,
  loading,
  maxWidth,
  width,
}) => {
  const { t } = useTranslation()

  const handleSave = () => {
    if (onSave) {
      onSave()
    }
  }

  const handleClose = (value: boolean) => {
    if (onClose) {
      onClose(value)
    }
  }

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={isShow}
    >
      <Fade in={isShow}>
        <Box sx={{ ...containerStyle, maxWidth, width }}>
          <Grid container alignItems='center' justifyContent='space-between' sx={{ mb: 1 }}>
            <Typography flexGrow={1} variant='body1'>
              {loading ? <Skeleton /> : title}
            </Typography>
            <Close sx={closeIconStyle} onClick={() => handleClose(false)} />
          </Grid>
          {!hideDivider && <Divider />}
          {loading ? (
            <Box
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}
            >
              <CircularProgress />
            </Box>
          ) : (
            children
          )}
          {!hideDivider && <Divider />}
          <Grid container alignItems='center' justifyContent='flex-end' sx={{ mt: 1 }} gap={1}>
            <Button onClick={() => onClose(false)}>
              {cancelBtnText ?? t('modal.closeBtnText')}
            </Button>
            {onSave && (
              <Button variant='contained' onClick={handleSave} disabled={disabledSave}>
                {btnText ?? t('modal.saveBtnText')}
              </Button>
            )}
          </Grid>
        </Box>
      </Fade>
    </Modal>
  )
}
