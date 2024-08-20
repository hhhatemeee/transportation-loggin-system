import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { OPTIONS } from '../containers/AppLayout/menuConfig'
import { ItemType } from '../types'
import { modifyExpandedOptions, modifySelectedOptions } from '../utils'

export const useSidebar = () => {
  const [options, setOption] = useState<ItemType[]>(OPTIONS)
  const { pathname } = useLocation()

  useEffect(() => {
    const modifyOptions = modifySelectedOptions(OPTIONS, pathname)
    setOption(modifyExpandedOptions(modifyOptions))
  }, [pathname, OPTIONS])

  return options
}
