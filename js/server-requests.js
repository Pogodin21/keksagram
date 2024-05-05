import { getData } from "./api.js";
import {showAlert} from "./util.js"
const createLoader = (render) => {
  getData()
  .then((data) => {
    render(data);
  })
  .catch(() => {
    showAlert("Ошибка загрузки данных с сервера")
  });
}

export {createLoader};