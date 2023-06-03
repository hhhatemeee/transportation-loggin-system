import { Box } from '@mui/material'
import { FC } from 'react'

import { FormGenerator } from '../../../../components/FormGenerator'
import { ModalWrapper } from '../../../../components/ModalWrapper'
import { GENERATOR_INPUT_TYPE, GETServiceType } from '../../../../types'

type ServicesDialogProps = {
  isShow: boolean
  onClose: () => void
  services: GETServiceType[]
}

export const ServicesDialog: FC<ServicesDialogProps> = ({ isShow, onClose, services }) => {
  return (
    <ModalWrapper hideDivider isShow={isShow} onClose={onClose} title={'Товары и услуги'}>
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
