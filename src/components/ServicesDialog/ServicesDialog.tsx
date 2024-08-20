import { Box } from '@mui/material'
import { FC } from 'react'

import { FormGenerator } from '../FormGenerator'
import { ModalWrapper } from '../ModalWrapper'
import { GENERATOR_INPUT_TYPE, GETServiceType } from '../../types'

type ServicesDialogProps = {
  isShow: boolean
  onClose: () => void
  services: GETServiceType[]
  title: string
}

export const ServicesDialog: FC<ServicesDialogProps> = ({ isShow, onClose, services, title }) => {
  return (
    <ModalWrapper hideDivider isShow={isShow} onClose={onClose} title={title}>
      <Box maxHeight={300} my={2} px={1} sx={{ overflowY: 'auto' }}>
        <FormGenerator
          inputs={services.map(({ name, id }) => ({
            inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
            type: 'number',
            name: `service//_${id}`,
            size: 'small',
            label: name,
          }))}
        />
      </Box>
    </ModalWrapper>
  )
}
