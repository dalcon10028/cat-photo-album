import Component from "../core/Component.js";
import { store } from "../store/index.js";
import { FILE, DIRECTORY, PREV } from "../constants/type.js";

export default class Nodes extends Component {
  setEvents() {
    this.target.addEventListener('click', async ({ target }) => {
      const node = target.closest('.node');
      if (!node) return;
      const { id, type, name, filePath } = node.dataset;
      if (type === PREV)
        store.commit('GO_PREV');
      if (type === FILE)
        store.commit('SET_IMAGE', filePath);
      if (type === DIRECTORY) {
        const cachedData = store.state.cache[id];
        if (cachedData) {
          store.commit('ADD_BREADCRUMB', { id, name: cachedData.name });
          store.commit('SET_CONTENTS', cachedData.contents);
        }
        else
          await store.dispatch('fetchDirectory', { id, name });
      }
    });
  }

  template() {
    return `${store.state.breadcrumb[store.state.breadcrumb.length - 1].name !== 'root' ? `
      <div class="Node" data-type="${PREV}">
        <img src="./assets/prev.png">
      </div>
    ` : ''}` +
    store.state.contents.reduce((acc, { id, filePath, name, type }) =>
      acc += `
        <div class="Node" data-id="${id}" data-type="${type}" data-name="${name}" data-file-path="${filePath}">
          <img src="./assets/${type.toLowerCase()}.png">
          <div>${name}</div>
        </div>
      `
    , '');
  }
}