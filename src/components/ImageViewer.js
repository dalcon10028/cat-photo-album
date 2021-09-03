import Component from "../core/Component.js";
import { store } from "../store/index.js";
import { NONE, BLOCK } from "../constants/display.js";

export default class ImageViewer extends Component {
  IMG_URL = 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

  setEvents() {
    this.target.addEventListener('click', ({ target }) => {
      if (target.tagName === 'IMG') return;
      store.commit('HIDE_IMAGE_VIEWER');
    });

    document.addEventListener('keydown', ({ key }) => {
      if (key !== 'Escape') return;
      store.commit('HIDE_IMAGE_VIEWER');  
    })
  }

  template() {
    this.target.style.display = store.state.imageViewer.on ? BLOCK : NONE;
    return `
      <div class="content">
      <img src="${store.state.imageViewer.filePath && `${this.IMG_URL}${store.state.imageViewer.filePath}`}">
    `
  }
}