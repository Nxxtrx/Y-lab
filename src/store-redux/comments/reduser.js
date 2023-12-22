// Начальное состояние
export const initialState = {
  data: {},
  waiting: false // признак ожидания загрузки
}


// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, data: {}, waiting: true};
    case "comments/load-change":
        return {...state, data: {...state.data}, waiting: true};
    case "comments/load-success":
      return {...state, data: action.payload.data, waiting: false};

    case "comments/load-error":
      return {...state, data: {}, waiting: false}; //@todo текст ошибки сохранять?

    case "comments/post-start":
      return {...state, waiting: true};

    case "comments/post-end":
      return {...state, waiting: false};

    default:
      // Нет изменений
      return state;

  }
}

export default reducer;