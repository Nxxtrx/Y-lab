import {memo, useCallback, useEffect, useMemo, useState} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import useInit from "../../hooks/use-init";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  const store = useStore();

  const [sortCategories, setSortCategories] = useState([])

  useInit(() => {
    store.actions.catalog.getCategory();
  }, []);

  const select = useSelector(state => ({
    category: state.catalog.params.category,
    categories: state.catalog.categories,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
  }));

  useEffect(() => {
    const sort = sortByParent(select.categories)
    setSortCategories(sort)
  }, [select.categories])

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Выбор категории
    onSetCategories: useCallback(category => {store.actions.catalog.setParams({category})}, [store]),
  };

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), []),
    categories: useMemo(() => [{_id: null, title: 'Все', value: ''}, ...sortCategories], [sortCategories]),
  };

  const {t} = useTranslate();

  function sortByParent(arr, parent = null, result = [], level = 0) {
    const children = arr.filter(item => (item.parent && item.parent._id === parent) || (item.parent === null && parent === null));
    for (const child of children) {
      child.title = '-'.repeat(level) + ' ' + child.title;
      result.push(child);
      sortByParent(arr, child._id, result, level + 1);
    }
    return result;
  }

  return (
    <SideLayout padding='medium'>
      <Select options={options.categories} value={select.category} onChange={callbacks.onSetCategories}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
