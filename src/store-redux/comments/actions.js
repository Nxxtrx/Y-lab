
export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});
      try {
        const res = await services.api.request({
          url: `api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Товар загружен успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  postComments: (idArticle, idComments, text) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({type: 'comments/post-start'});
      try {
        const res = await services.api.request({
          url: 'api/v1/comments',
          method: 'POST',
          body: JSON.stringify({
            text: text,
            parent: {_id: idArticle || idComments, _type: idArticle ? 'article' : 'comment'}
          })
        })
        dispatch({type: 'comments/post-end', payload: {data: res.data.result}});
      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/post-end'});
      }
    }
  }
}
