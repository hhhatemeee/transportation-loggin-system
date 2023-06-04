import { JOURNAL_STATUS, JOURNAL_STATUS_NAME } from '../constants'

export const getConvertStatus = (status: JOURNAL_STATUS) => {
  switch (status) {
    case JOURNAL_STATUS.CANCEL:
      return JOURNAL_STATUS_NAME.CANCEL
    case JOURNAL_STATUS.COMPLETE:
      return JOURNAL_STATUS_NAME.COMPLETE
    case JOURNAL_STATUS.OPEN:
      return JOURNAL_STATUS_NAME.OPEN
  }
}
