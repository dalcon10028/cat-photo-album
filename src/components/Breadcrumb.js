import Component from "../core/Component.js";
import { store } from "../store/index.js";

export default class Breadcrumb extends Component {
  setEvents() {
    this.target.addEventListener('click', e => {
      e.preventDefault();
      const navData = e.target.closest('div')?.dataset;
      if (!navData) return;
      const { id, depth } = navData;
      store.commit('SET_BREADCRUMB', store.state.breadcrumb.slice(0, +depth + 1));
      store.commit('SET_CONTENTS', store.state.cache[id].contents);
    })
  }

  template() {
    return store.state.breadcrumb.reduce((acc, { id, name }, idx) => acc += `<div data-id="${id}" data-depth="${idx}">${name}</div>` , '');
  }
}