export { ScrapItem };
import { useDBStore } from "@/stores/dbStore";


class ScrapItem {
  id = null;
  dateCreated = new Date();
  title = null;
  description = null;
  status = null;
  animal = null;
  image_url = null;
  post_url = null; // Добавляем новое свойство для ссылки на объявление

  static parse(obj) {
    let item = new ScrapItem();
    item.id = obj.id;
    item.title = obj.title;
    item.description = obj.description;
    item.status = obj.status;
    item.animal = obj.animal;
    item.image_url = obj.image_url;
    item.post_url = obj.post_url; // Присваиваем значение ссылки на объявление

    return item;
  }

  static async getById(id) {
    const dbResult = await useDBStore().readById("scrapads", id);

    if (!dbResult) {
      return null;
    }

    return this.parse(dbResult);
  }

  static async getCollection(order = null, filter = null) {
    const collection = await useDBStore().read("scrapads", order, filter);

    let result = {};
    for (let [key, value] of Object.entries(collection)) {
      result[key] = this.parse(value);
    }

    return result;
  }
}