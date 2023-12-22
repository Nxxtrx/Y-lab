
export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id, changePage) => {
    return async (dispatch, getState, services) => {

      if(changePage) {
        dispatch({type: 'comments/load-start'});
      } else {
        dispatch({type: 'comments/load-change'})
      }
      try {
        const res = await services.api.request({
          url: `api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});

      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  postComments: (idArticle, idComments, text) => {
    return async (dispatch, getState, services) => {
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
        dispatch({type: 'comments/post-end'});
      }
    }
  }
}
