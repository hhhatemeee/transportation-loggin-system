export const localizationRu = {
  logo: 'L O G O',
  registrationPage: {
    title: 'Регистрация',
    form: {
      title: 'Поиск ТС',
      stateNumber: {
        label: 'Гос. номер',
        emptyError: 'Гос. номер не указан',
      },
      STS: {
        label: 'СТС',
        emptyError: 'СТС не указан',
      },
    },
    departure: {
      submitButton: 'Убыл',
    },
    arrival: {
      submitButton: 'Прибыл',
    },
  },
  loginPage: {
    welcome: 'Добро пожаловать',
    subTitle: 'Введите свои учетные данные',
    singIn: 'Войдите в систему',
    form: {
      password: {
        label: 'Пароль',
        emptyError: 'Пароль не указан',
      },
      username: {
        label: 'Имя пользователя',
        emptyError: 'Не указано имя пользователя',
      },
    },
    singInBtn: 'Войти',
    registration: 'Регистрация',
  },
  historyPage: {
    title: 'История услуг',
    columns: {
      number: 'Номер заказа',
      stateNumber: 'Гос. номер ТС',
      date: 'Дата заезда ТС',
      time: 'Время заезда ТС',
      service: 'Услуга',
    },
  },
  reports: {
    counterparties: {
      title: 'Отчеты. Контрагенты',
      form: {
        counterparties: {
          label: 'Контрагенты',
          emptyError: 'Контрагенты не указано',
        },
        date: {
          labelStart: 'Начало',
          labelEnd: 'Конец',
        },
        registry: {
          label: 'Экспорт реестра оказанных работ',
        },
        act: {
          label: 'Экспорт акта выполненных работ',
        },
        score: {
          label: 'Экспорт счёта',
        },
      },
      submitButton: 'Сформировать',
      exportButton: 'Экспорт',
    },
    statistics: {
      title: 'Отчеты. Статистика',
      columns: {
        counterpart: 'Контрагент',
        dateStart: 'Дата начала',
        dateEnd: 'Дата конца',
        allServices: 'Всего услуг за период',
        amount: 'Сумма',
      },
      form: {
        export: {
          label: 'Экспорт статистики',
        },
      },
      exportButton: 'Экспорт',
    },
  },
}
