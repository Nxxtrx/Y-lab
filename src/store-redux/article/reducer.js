// Начальное состояние
export const initialState = {
  data: {},
  waiting: null, // признак ожидания загрузки,
  loading: false
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "article/load-start":
      return {...state, data: {}, waiting: true};

    case "article/load-success":
      return {...state, data: action.payload.data, waiting: false, loading: true};

    case "article/load-error":
      return {...state, data: {}, waiting: false}; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
