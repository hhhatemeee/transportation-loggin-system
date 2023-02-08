export const localizationRu = {
  logo: 'L O G O',
  buttons: {
    addButton: 'Добавить',
  },
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
    order: {
      title: 'Заполнение заказа',
      form: {
        stateNumber: 'Гос. номер',
        carBrand: 'Марка автомобиля',
        counterpart: 'Контрагент',
        dateStart: 'Дата заезда',
        dateEnd: 'Дата выезда',
        listNumber: 'Номер путевого листа',
        fio: 'ФИО водителя',
        services: 'Услуги',
        comment: 'Комментарий',
      },
      submitButton: 'Зарегистрировать',
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
  dictionaries: {
    counterparties: {
      title: 'Справочники. Контрагенты',
      form: {
        name: {
          label: 'Название',
        },
        payment: {
          label: 'Расчетный счет',
        },
        address: {
          label: 'Адрес',
        },
        bank: {
          label: 'Банк',
        },
        inn: {
          label: 'ИНН',
        },
        bik: {
          label: 'БИК',
        },
        kpp: {
          label: 'КПП',
        },
        ks: {
          label: 'К/С',
        },
      },
    },
    contracts: {
      title: 'Справочники. Договоры',
      form: {
        dateStart: {
          label: 'Дата начала договора',
        },
        dateEnd: {
          label: 'Дата конца договора',
        },
        vehicles: {
          label: 'Транспортные средства',
        },
        counterpart: {
          label: 'Контрагент',
        },
      },
    },
    vehicles: {
      title: 'Справочники. Транспортные средства',
      form: {
        stateNumber: {
          label: 'Гос. номер',
        },
        model: {
          label: 'Модель',
        },
        STS: {
          label: 'СТС',
        },
        counterpart: {
          label: 'Контрагент',
        },
      },
    },
    services: {
      title: 'Справочники. Услуги',
      form: {
        name: {
          label: 'Наименование',
        },
        description: {
          label: 'Описание',
        },
      },
    },
  },
}
