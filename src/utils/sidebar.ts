import { ItemType } from '../types'

export const modifySelectedOptions = (options: ItemType[], pathname: string): ItemType[] => {
  return options.map(item => {
    if (!item.options && item.path === pathname) {
      return { ...item, isSelected: true }
    }
    if (item.options && item.options.length > 0) {
      return { ...item, options: modifySelectedOptions(item.options, pathname) }
    }
    return item
  })
}

export const checkSelectedChild = (options: ItemType[]): boolean => {
  return options.some(item => {
    if (item.options && item.options.length > 0) {
      return checkSelectedChild(item.options)
    }
    if (item.isSelected) {
      return true
    }
  })
}

export const modifyExpandedOptions = (options: ItemType[]): ItemType[] => {
  return options.map(item => {
    return {
      ...item,
      ...(item.options &&
        item.options.length > 0 && { isExpanded: checkSelectedChild(item.options) }),
    }
  })
}
