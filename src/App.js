// Components
import Nodes from "./components/Nodes.js";
import Loading from "./components/Loading.js";
import Breadcrumb from "./components/Breadcrumb.js";
import ImageViewer from "./components/ImageViewer.js";

// Others
import { $ } from "./utils/dom.js";
import Component from "./core/Component.js";
import { store } from "./store/index.js";

export default class App extends Component {
  static create({ el }) {
    const $app = $(el);
    return new App($app);
  }

  async created() {
    await store.dispatch('fetchHomeDirectory');
  }

  mounted() {
    new Breadcrumb($('.breadcrumb'));
    new Nodes($('.nodes'));
    new Loading($('.Loading'));
    new ImageViewer($('.ImageViewer'));
  }

  template() {
    return `
      <nav class="Breadcrumb"></nav>
      <div class="Nodes"></div>
      <div class="Modal Loading"></div>
      <div class="Modal ImageViewer"></div>
    `;
  }
}