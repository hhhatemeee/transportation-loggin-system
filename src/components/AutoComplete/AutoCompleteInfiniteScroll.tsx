import { FC, UIEvent, useEffect, useState } from 'react'
import { AutoComplete, AutocompleteOption, AutoCompleteProps } from './AutoComplete'

export type AutoCompleteInfiniteScrollProps = AutoCompleteProps<AutocompleteOption> & {
  onLoadNextPage: () => void
  totalPages: number
  page: number
}

export const AutoCompleteInfiniteScroll: FC<AutoCompleteInfiniteScrollProps> = ({
  options,
  onLoadNextPage,
  totalPages,
  page,
  ...props
}) => {
  const [position, setPosition] = useState(0)
  const [listBoxNode, setListBoxNode] = useState<UIEvent<HTMLElement>['currentTarget'] | null>(null)

  useEffect(() => {
    if (listBoxNode) {
      listBoxNode.scrollTop = position - listBoxNode.clientHeight
    }
  }, [position, listBoxNode, options])

  const handleFocus = () => setPosition(0)

  const listBoxProps = {
    onScroll: (event: UIEvent<HTMLElement>) => {
      const listBoxNode = event.currentTarget
      setListBoxNode(listBoxNode)
      const position = listBoxNode.scrollTop + listBoxNode.clientHeight
      if (position === listBoxNode.scrollHeight) {
        if (totalPages && page < totalPages - 1) {
          onLoadNextPage()
          setPosition(position)
        }
      }
    },
  }
  return (
    <AutoComplete {...props} ListboxProps={listBoxProps} options={options} onFocus={handleFocus} />
  )
}
