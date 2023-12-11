import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
    this.currentItem;
  }

  initState() {
    return {
      list: [],
    }
  }

  async loadItemToId(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=title,description,price,edition,madeIn(title,code),category(title)`)
    const json = await response.json()
    this.currentItem = json.result
    return await json.result
  }

  async load (limit, skip) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip > 1 ? (skip - 1) * 10 : 0}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
