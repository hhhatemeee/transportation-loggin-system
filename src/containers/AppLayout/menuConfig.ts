import { ItemType } from '../../types/common'

export const OPTIONS: ItemType[] = [
  {
    id: 0,
    value: 'Регистрация',
    icon: 'how_to_reg',
    options: [
      { id: 0, value: 'Прибытие' },
      { id: 1, value: 'Убытие' },
    ],
  },
  {
    id: 1,
    value: 'Поиск',
    icon: 'manage_search',
  },
  {
    id: 2,
    value: 'Отчеты',
    icon: 'assessment',
    options: [
      { id: 0, value: 'Контрагенты' },
      { id: 1, value: 'Статистика' },
    ],
  },
  {
    id: 3,
    value: 'Справочники',
    icon: 'library_books',
    options: [
      { id: 0, value: 'Контрагенты' },
      { id: 1, value: 'ТС' },
      { id: 2, value: 'Услуги' },
      { id: 3, value: 'Договоры' },
    ],
  },
]
